import { NextResponse } from "next/server";
import { readServerContent } from "@/lib/serverStorage";
import { ensureBranchDirectory, branchDirectory, hasCoordinates } from "@/lib/branchDirectory";
import type { BranchOffice } from "@/context/ContentContext";
import { googleLocation } from "@/lib/googleLocation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
const headers = { "Cache-Control": "no-store" };
// Maps JavaScript keys are browser-visible by design. Use a separate,
// HTTP-referrer-restricted browser key in production.
export async function GET() { return NextResponse.json({ key:process.env.GOOGLE_MAPS_BROWSER_KEY || process.env.GOOGLE_MAPS_API_KEY || "" },{headers}); }
const cache = new Map<string, { expires: number; data: unknown }>();
let queue: Promise<unknown> = Promise.resolve();
let lastRequest = 0;
const limits = new Map<string, { start: number; count: number }>();
const validPoint = (value: any): value is { lat: number; lng: number } => value && typeof value.lat === "number" && typeof value.lng === "number" && Number.isFinite(value.lat) && Number.isFinite(value.lng) && Math.abs(value.lat) <= 90 && Math.abs(value.lng) <= 180;

async function provider(path: string, params: Record<string, string>, body?: unknown) {
  const apiKey = process.env.GEOAPIFY_API_KEY;
  if (!apiKey) throw new Error("Configuration unavailable");
  const task = queue.catch(() => {}).then(async () => {
    await new Promise(resolve => setTimeout(resolve, Math.max(0, 1100 - (Date.now() - lastRequest))));
    lastRequest = Date.now();
    const url = new URL(`https://api.geoapify.com/v1/${path}`);
    for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
    url.searchParams.set("apiKey", apiKey);
    const response = await fetch(url, { method: body ? "POST" : "GET", headers: body ? { "Content-Type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(15000), cache: "no-store" });
    if (!response.ok) throw new Error(response.status === 429 ? "Provider quota reached" : "Provider unavailable");
    return response.json();
  });
  queue = task;
  return task;
}

export async function POST(request: Request) {
  try {
    const originHeader = request.headers.get("origin");
    if (originHeader && new URL(originHeader).host !== new URL(request.url).host) return NextResponse.json({ error: "Unsupported request origin" }, { status: 403, headers });
    const text = await request.text();
    if (text.length > 5000) return NextResponse.json({ error: "Request too large" }, { status: 413, headers });
    let input: any;
    try { input = JSON.parse(text); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400, headers }); }
    if (!validPoint(input.origin) || !["route", "matrix", "reverse"].includes(input.action)) return NextResponse.json({ error: "Choose a valid starting point" }, { status: 400, headers });
    const ip = (request.headers.get("x-forwarded-for") || "local").split(",")[0];
    const now = Date.now(), entry = limits.get(ip);
    if (entry && now - entry.start < 60000 && entry.count >= 40) return NextResponse.json({ error: "Please wait a moment before calculating another route" }, { status: 429, headers });
    if (limits.size > 500) limits.forEach((value,key)=>{if(now-value.start>60000) limits.delete(key);});
    limits.set(ip, entry && now - entry.start < 60000 ? { ...entry, count: entry.count + 1 } : { start: now, count: 1 });
    const content = readServerContent()?.data;
    const offices: BranchOffice[] = content ? ensureBranchDirectory(content).branches : branchDirectory;
    const findOffice = (id: unknown) => offices.find(branch => branch.id === id && hasCoordinates(branch));
    const selected = findOffice(input.branchId);
    const candidates = input.action === "matrix" && Array.isArray(input.branchIds) && input.branchIds.length <= 8 ? input.branchIds.map(findOffice) as (BranchOffice | undefined)[] : [];
    if (input.action === "route" && !selected || input.action === "matrix" && (!candidates.length || candidates.some(branch => !branch))) return NextResponse.json({ error: "Select a mapped VERC office" }, { status: 400, headers });
    const point = { lat: Number(input.origin.lat.toFixed(6)), lng: Number(input.origin.lng.toFixed(6)) };
    const cacheKey = JSON.stringify(["google",input.action, point, selected && [selected.id, selected.lat, selected.lng,selected.googlePlaceId], candidates.map(branch => [branch!.id, branch!.lat, branch!.lng,branch!.googlePlaceId])]);
    const hit = cache.get(cacheKey);
    if (hit && hit.expires > now && input.refresh !== true) return NextResponse.json(hit.data, { headers });
    let result: any;
    if(process.env.GOOGLE_MAPS_API_KEY){
      result=await googleLocation(input.action,point,selected,candidates as BranchOffice[]);
      if(cache.size>=100)cache.delete(cache.keys().next().value!);
      cache.set(cacheKey,{expires:now+60000,data:result});
      return NextResponse.json(result,{headers});
    }
    if (input.action === "reverse") {
      const response = await provider("geocode/reverse", { lat: String(point.lat), lon: String(point.lng), type: "street", format: "json", limit: "1" });
      result = { code: "Ok", provider: "geoapify", address: response.results?.[0]?.formatted || "" };
    } else if (input.action === "matrix") {
      const response = await provider("routematrix", {}, { mode: "drive", units: "metric", sources: [{ location: [point.lng, point.lat] }], targets: candidates.map(branch => ({ location: [branch!.lng, branch!.lat] })) });
      const values = response.sources_to_targets?.[0] || [];
      // Return only calculated values, never provider request metadata or keys.
      result = { code: "Ok", provider: "geoapify", distances: [candidates.map((_, index) => values.find((value: any) => value.target_index === index)?.distance ?? null)], durations: [candidates.map((_, index) => values.find((value: any) => value.target_index === index)?.time ?? null)] };
    } else {
      const response = await provider("routing", { waypoints: `${point.lat},${point.lng}|${selected!.lat},${selected!.lng}`, mode: "drive", units: "metric", traffic: "free_flow" });
      const feature = response.features?.[0];
      const coordinates = feature?.geometry?.type === "MultiLineString" ? feature.geometry.coordinates.flat() : feature?.geometry?.coordinates;
      if (!feature || !Array.isArray(coordinates) || !Number.isFinite(feature.properties?.distance)) throw new Error("Route unavailable");
      result = { code: "Ok", provider: "geoapify", branchId: selected!.id, routes: [{ distance: feature.properties.distance, duration: feature.properties.time, geometry: { coordinates } }] };
    }
    if (cache.size >= 100) cache.delete(cache.keys().next().value!);
    cache.set(cacheKey, { expires: now + 300000, data: result });
    return NextResponse.json(result, { headers });
  } catch {
    // Provider URLs contain credentials. Do not log or return upstream errors.
    return NextResponse.json({ error: "Location service is temporarily unavailable. Please try again." }, { status: 502, headers });
  }
}

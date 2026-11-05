import { useEffect, useMemo, useState } from "react";
import type { BranchOffice } from "@/context/ContentContext";
import type { VisitorPosition } from "@/components/BranchMap";
import { distanceKm, hasCoordinates } from "@/lib/branchDirectory";

export interface RoadDistance { meters: number; seconds: number }
export interface OfficeRoute extends RoadDistance { coordinates: [number, number][]; startOffset: number; endOffset: number; branchId: string }
let queue: Promise<unknown> = Promise.resolve();
let lastRequest = 0;
const cache = new Map<string, { expires: number; data: any }>();

// Share a throttled queue across locators. Provider requests run on the server.
// No background polling or repeated address lookups.
function request(action: string, payload: Record<string, unknown>, signal: AbortSignal): Promise<any> {
  const url = JSON.stringify({ action, ...payload });
  const existing = cache.get(url);
  if (existing && existing.expires > Date.now()) return Promise.resolve(existing.data);
  const task = queue.catch(() => {}).then(async () => {
    if (signal.aborted) throw new DOMException("Cancelled", "AbortError");
    await new Promise(resolve => setTimeout(resolve, Math.max(0, 1100 - (Date.now() - lastRequest))));
    if (signal.aborted) throw new DOMException("Cancelled", "AbortError");
    lastRequest = Date.now();
    const controller = new AbortController();
    const cancel = () => controller.abort();
    signal.addEventListener("abort", cancel, { once: true });
    const timeout = setTimeout(cancel, 25000);
    try {
      const response = await fetch("/api/location", { method: "POST", headers: { "Content-Type": "application/json" }, body: url, signal: controller.signal, cache: "no-store" });
      const data = await response.json();
      if (!response.ok || data.code !== "Ok") throw new Error("No road route available");
      if (cache.size >= 40) cache.delete(cache.keys().next().value!);
      cache.set(url, { expires: Date.now() + 300000, data });
      return data;
    } finally { clearTimeout(timeout); signal.removeEventListener("abort", cancel); }
  });
  queue = task;
  return task;
}
const point = (position: { lat: number; lng: number }) => `${position.lng.toFixed(6)},${position.lat.toFixed(6)}`;

function checkedRoute(data: any, origin: VisitorPosition, destination: BranchOffice): OfficeRoute {
  if (data.branchId !== destination.id) throw new Error("Route belongs to another office");
  const route = data.routes?.[0];
  if (!route || !Number.isFinite(route.distance) || route.distance < 0 || !Number.isFinite(route.duration) || route.duration < 0 || !Array.isArray(route.geometry?.coordinates) || route.geometry.coordinates.length < 2 || !route.geometry.coordinates.every((point: unknown) => Array.isArray(point) && point.length >= 2 && Number.isFinite(point[0]) && Number.isFinite(point[1]) && Math.abs(point[0]) <= 180 && Math.abs(point[1]) <= 90)) throw new Error("Route unavailable");
  const coordinates = route.geometry.coordinates as [number, number][];
  const first = coordinates[0], last = coordinates[coordinates.length - 1];
  const startOffset = distanceKm(origin, { lng: first[0], lat: first[1] }) * 1000;
  const endOffset = distanceKm({ lat: destination.lat!, lng: destination.lng! }, { lng: last[0], lat: last[1] }) * 1000;
  const directMeters = distanceKm(origin, { lat: destination.lat!, lng: destination.lng! }) * 1000;
  // Do not display a route to distant snapped roads or an impossible shortcut.
  if (startOffset > 500 || endOffset > 500 || route.distance + startOffset + endOffset + Math.max(50, directMeters * 0.02) < directMeters) throw new Error("Route does not match the selected pins");
  return { branchId: destination.id, meters: route.distance, seconds: route.duration, coordinates, startOffset, endOffset };
}

export function useOfficeRouting(position: VisitorPosition | undefined, candidates: BranchOffice[], selected: BranchOffice | undefined) {
  const source = position ? point(position) : "";
  const destinationKey = candidates.map(branch => `${branch.id}:${branch.lng},${branch.lat}:${branch.googlePlaceId || ""}`).join(";");
  const key = source && candidates.length ? `${source}|${destinationKey}` : "";
  const [matrix, setMatrix] = useState<{ key: string; values: Record<string, RoadDistance>; error?: boolean }>({ key: "", values: {} });
  const [routeState, setRoute] = useState<{ key: string; route?: OfficeRoute; error?: boolean }>({ key: "" });
  const [revision, setRevision] = useState(0);
  const [address, setAddress] = useState({ source: "", text: "" });
  const selectedPoint = selected && hasCoordinates(selected) ? point({ lat: selected.lat, lng: selected.lng }) : "";
  const routeKey = source && selectedPoint ? `${source}|${selected?.id}|${selectedPoint}|${selected?.googlePlaceId || ""}` : "";

  useEffect(() => {
    if (!key || !candidates.length) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      request("matrix", { origin: position, branchIds: candidates.map(branch => branch.id), branchPins: destinationKey, refresh: revision > 0 }, controller.signal)
        .then(data => {
          if (controller.signal.aborted) return;
          const values: Record<string, RoadDistance> = {};
          candidates.forEach((branch, index) => {
            const meters = data.distances?.[0]?.[index], seconds = data.durations?.[0]?.[index];
            const directMeters = distanceKm(position!, { lat: branch.lat!, lng: branch.lng! }) * 1000;
            if (Number.isFinite(meters) && Number.isFinite(seconds) && meters >= 0 && seconds >= 0 && meters + Math.max(100, directMeters * 0.05) >= directMeters) values[branch.id] = { meters, seconds };
          });
          setMatrix({ key, values, error: !Object.keys(values).length });
        }).catch(() => { if (!controller.signal.aborted) setMatrix({ key, values: {}, error: true }); });
    }, 500);
    return () => { clearTimeout(timer); controller.abort(); };
    // The key includes every coordinate and office ID; CMS rerenders do not poll.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, revision]);

  useEffect(() => {
    if (!routeKey || !position || !selected) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      request("route", { origin: position, branchId: selected.id, branchPin: `${selectedPoint}|${selected.googlePlaceId || ""}`, refresh: revision > 0 }, controller.signal)
        .then(data => {
          if (controller.signal.aborted) return;
          setRoute({ key: routeKey, route: checkedRoute(data, position, selected) });
        }).catch(() => { if (!controller.signal.aborted) setRoute({ key: routeKey, error: true }); });
    }, 300);
    return () => { clearTimeout(timer); controller.abort(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeKey, revision]);

  useEffect(() => {
    if (!position || !source) return;
    const controller = new AbortController();
    const timer = setTimeout(() => { request("reverse", { origin: position }, controller.signal).then(data => { if (!controller.signal.aborted) setAddress({ source, text: typeof data.address === "string" ? data.address : "" }); }).catch(() => {}); }, 600);
    return () => { clearTimeout(timer); controller.abort(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  const metrics = useMemo(() => matrix.key === key ? matrix.values : {}, [matrix, key]);
  return { metrics, startingAddress: address.source === source ? address.text : "", compared: Object.keys(metrics).length, comparing: Boolean(key && matrix.key !== key), route: routeState.key === routeKey ? routeState.route : undefined,
    routing: Boolean(routeKey && routeState.key !== routeKey), routeError: Boolean(routeKey && routeState.key === routeKey && routeState.error), matrixError: Boolean(key && matrix.key === key && matrix.error), retry: () => { cache.clear(); setMatrix({ key: "", values: {} }); setRoute({ key: "" }); setRevision(value => value + 1); } };
}

import source from "./data/branch-directory.json";
import type { BranchOffice } from "@/context/ContentContext";

export const BRANCH_DIRECTORY_VERSION = "provided-directory-2026-11-05-maps";
export const branchDirectory: BranchOffice[] = source;

const legacyNames: Record<string, string> = {
  "br-1": "Savar Head Office & Training Institute", "br-2": "Rajshahi Regional Operations Hub",
  "br-3": "Chattogram & Mirsarai Center", "br-4": "Rangpur Field Operations Office",
  "br-5": "Cox's Bazar Humanitarian Response Hub",
};

export function normalizePlace(value: string) {
  return (value || "").toLowerCase().replace(/[০-৯]/g, digit => String(digit.charCodeAt(0) - 0x09e6)).replace(/chattogram/g, "chittagong").replace(/cumilla/g, "comilla").replace(/chapainawabganj/g, "chapai nababganj").replace(/barishal/g, "barisal").replace(/[^a-z0-9\u0980-\u09ff]+/g, " ").trim();
}

function editDistance(a: string, b: string) {
  let row = Array.from({ length: b.length + 1 }, (_, i) => i);
  let earlier: number[] = [];
  for (let i = 1; i <= a.length; i++) {
    const next = [i];
    for (let j = 1; j <= b.length; j++) {
      next[j] = Math.min(next[j - 1] + 1, row[j] + 1, row[j - 1] + Number(a[i - 1] !== b[j - 1]));
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) next[j] = Math.min(next[j], earlier[j - 2] + 1);
    }
    earlier = row;
    row = next;
  }
  return row[b.length];
}

// Match words in any order, familiar district spellings, unpadded codes and
// small typing errors. Exact matches always outrank approximate matches.
export function branchSearchScore(branch: BranchOffice, query: string) {
  const terms = normalizePlace(query).split(" ").filter(term => term && !["verc", "branch", "office", "code", "bangladesh", "village", "education", "resource", "center", "centre"].includes(term));
  if (!terms.length) return 0;
  const words = normalizePlace([branch.name, branch.branchType, branch.code, branch.district, branch.upazila, branch.postOffice, branch.address, branch.village].filter(Boolean).join(" ")).split(" ");
  let score = 0;
  for (const term of terms) {
    const codeMatch = /^\d+$/.test(term) && branch.code && Number(term) === Number(branch.code);
    const best = codeMatch ? 120 : Math.max(0, ...words.map(word => {
      if (word === term) return 100;
      if (/^\d+$/.test(term)) return 0;
      if (word.startsWith(term)) return 85;
      if (word.includes(term)) return 70;
      if (term.length < 4 || Math.abs(word.length - term.length) > 2) return 0;
      const distance = editDistance(term, word);
      return distance <= (term.length >= 7 ? 2 : 1) ? 50 - distance * 5 : 0;
    }));
    if (!best) return -1;
    score += best;
  }
  return score;
}

// Import the supplied directory once, replacing the five old sample offices.
// Preserve additional custom offices and any manager/email metadata already saved.
export function importBranchDirectory(saved: BranchOffice[] = []): BranchOffice[] {
  const custom = saved.filter(b => b && b.name !== legacyNames[b.id]);
  const used = new Set<string>();
  const imported = branchDirectory.map(branch => {
    const match = custom.find(b => b.id === branch.id || b.code && b.code === branch.code && b.branchType === branch.branchType || normalizePlace(b.name) === normalizePlace(branch.name) && normalizePlace(b.district) === normalizePlace(branch.district));
    if (match) used.add(match.id);
    return { ...match, ...branch, email: match?.email || "", manager: match?.manager || "" };
  });
  return [...imported, ...custom.filter(b => !used.has(b.id))];
}

export function ensureBranchDirectory<T extends Record<string, any>>(content: T): T {
  if (content.branchDirectoryVersion === BRANCH_DIRECTORY_VERSION) return content;
  if (content.branchDirectoryVersion === "provided-directory-2026-11-05" && Array.isArray(content.branches)) {
    const verifiedHeadOffice = branchDirectory.find(branch => branch.id === "verc-head-office")!;
    return { ...content, branches: content.branches.map((branch: BranchOffice) => {
      if (branch.id !== verifiedHeadOffice.id || branch.mapsQuery || branch.googlePlaceId) return branch;
      return { ...branch, mapsQuery: verifiedHeadOffice.mapsQuery, googlePlaceId: verifiedHeadOffice.googlePlaceId,
        ...(branch.lat === 23.83725 && branch.lng === 90.260623 ? { lat: verifiedHeadOffice.lat, lng: verifiedHeadOffice.lng } : {}) };
    }), branchDirectoryVersion: BRANCH_DIRECTORY_VERSION };
  }
  return { ...content, branches: importBranchDirectory(Array.isArray(content.branches) ? content.branches : []), branchDirectoryVersion: BRANCH_DIRECTORY_VERSION };
}

export function hasCoordinates(branch: { lat?: number; lng?: number }): branch is { lat: number; lng: number } {
  return Number.isFinite(branch.lat) && Number.isFinite(branch.lng) && Math.abs(branch.lat!) <= 90 && Math.abs(branch.lng!) <= 180 && !(branch.lat === 0 && branch.lng === 0);
}

export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const radians = (value: number) => value * Math.PI / 180;
  const dLat = radians(b.lat - a.lat), dLng = radians(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(radians(a.lat)) * Math.cos(radians(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h)));
}

export function phoneHref(phone: string) {
  const digits = (phone || "").replace(/\D/g, "");
  if (/^01[3-9]\d{8}$/.test(digits)) return `tel:+88${digits}`;
  if (/^8801[3-9]\d{8}$/.test(digits)) return `tel:+${digits}`;
  if (phone?.trim().startsWith("+") && digits.length >= 8 && digits.length <= 15) return `tel:+${digits}`;
  return "";
}

export function officeMapQuery(branch: BranchOffice) {
  return branch.mapsQuery?.trim() || ["Village Education Resource Center (VERC)", branch.branchType === "Head Office" ? "Head Office" : `${branch.name} Branch`, branch.address, branch.district, "Bangladesh"].filter(Boolean).join(", ");
}

export function mapsSearchUrl(branch: BranchOffice) {
  const params = new URLSearchParams({ api: "1", query: !branch.googlePlaceId && hasCoordinates(branch) ? `${branch.lat},${branch.lng}` : officeMapQuery(branch) });
  if (branch.googlePlaceId?.trim()) params.set("query_place_id", branch.googlePlaceId.trim());
  return `https://www.google.com/maps/search/?${params}`;
}

export function directionsUrl(branch: BranchOffice, origin?: { lat: number; lng: number }) {
  // Keep the same destination as the on-site map and routing API. A name-only
  // search can silently resolve another branch or an unrelated business.
  const params = new URLSearchParams({ api: "1", destination: !branch.googlePlaceId && hasCoordinates(branch) ? `${branch.lat},${branch.lng}` : officeMapQuery(branch), travelmode: "driving" });
  if (branch.googlePlaceId?.trim()) params.set("destination_place_id", branch.googlePlaceId.trim());
  if (origin) params.set("origin", `${origin.lat},${origin.lng}`);
  return `https://www.google.com/maps/dir/?${params}`;
}

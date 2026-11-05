"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Minus, RotateCcw, MousePointerClick } from "lucide-react";

import type { BranchOffice } from "@/context/ContentContext";
import { hasCoordinates } from "@/lib/branchDirectory";
import type { OfficeRoute } from "@/lib/roadRouting";

export interface VisitorPosition {
  lat: number;
  lng: number;
  accuracy: number;
  manual?: boolean;
  timestamp?: number;
}

interface Props {
  branches: BranchOffice[];
  selectedId: string;
  position?: VisitorPosition;
  focus: "all" | "selected" | "nearby";
  resetKey: number;
  onSelect: (id: string) => void;
  onHover?: (id: string | null) => void;
  route?: OfficeRoute;
  pickingStart?: boolean;
  onPickStart?: (point: { lat: number; lng: number }) => void;
  heightClassName?: string;
}

declare global {
  interface Window {
    google: any;
  }
}

let loader: Promise<void> | undefined;
function loadGoogle() {
  if (!loader)
    loader = fetch("/api/location")
      .then((response) => {
        if (!response.ok) throw Error("Maps configuration unavailable");
        return response.json();
      })
      .then(
        (config) =>
          new Promise<void>((resolve, reject) => {
            if (window.google?.maps?.Map) {
              resolve();
              return;
            }
            if (!config.key) {
              reject(Error("Browser Maps key unavailable"));
              return;
            }
            const host = window as any,
              callback = "__vercGoogleReady",
              script = document.createElement("script");
            const timeout = window.setTimeout(() => finish(Error("Map loading timed out")), 15000);
            const finish = (error?: Error) => {
              window.clearTimeout(timeout);
              delete host[callback];
              if (error) {
                script.remove();
                reject(error);
              } else resolve();
            };
            host[callback] = () => finish();
            script.src =
              "https://maps.googleapis.com/maps/api/js?key=" +
              encodeURIComponent(config.key) +
              "&loading=async&callback=" +
              callback;
            script.async = true;
            script.onerror = () => finish(Error("Map unavailable"));
            document.head.appendChild(script);
          })
      )
      .catch((error) => {
        loader = undefined;
        throw error;
      });
  return loader;
}

function escapeHtml(value?: string) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildOfficePopupHtml(branch: BranchOffice) {
  const isHQ = branch.branchType === "Head Office";
  const badgeBg = isHQ ? "#b45309" : "#004B8D";
  const locationParts = [branch.upazila, branch.district].filter(Boolean).join(", ");
  const poVillage = [
    branch.postOffice ? `PO: ${branch.postOffice}` : "",
    branch.village ? `Road/Vill: ${branch.village}` : "",
  ]
    .filter(Boolean)
    .join(" · ");

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif; min-width: 235px; max-width: 280px; padding: 2px; color: #0f172a; line-height: 1.42;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 7px;">
        <span style="display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 8px; background: ${badgeBg}; color: #fff; font-size: 13px; flex-shrink: 0;">🏢</span>
        <div>
          <div style="font-weight: 700; font-size: 13px; color: #0f172a; letter-spacing: -0.015em;">${escapeHtml(branch.name)}${!isHQ && !branch.name.toLowerCase().includes("branch") ? " Office" : ""}</div>
          <div style="font-size: 10px; font-weight: 600; color: ${badgeBg}; text-transform: uppercase; letter-spacing: 0.04em;">
            ${escapeHtml(branch.branchType || "Branch Office")}${branch.code ? ` · Code #${escapeHtml(branch.code)}` : ""}
          </div>
        </div>
      </div>
      <div style="font-size: 11px; color: #334155; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 7px 9px; margin-bottom: 6px;">
        <div style="font-weight: 600; color: #0f172a; margin-bottom: 2px;">📍 ${escapeHtml(locationParts || branch.district)}</div>
        <div style="color: #475569;">${escapeHtml(branch.address)}</div>
        ${poVillage ? `<div style="margin-top: 3px; font-size: 10px; color: #64748b;">${escapeHtml(poVillage)}</div>` : ""}
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 11px; font-weight: 600; color: #004B8D;">
        <span>📞 ${escapeHtml(branch.phone || "N/A")}</span>
        <span style="font-size: 10px; color: #64748b; font-weight: 500;">${branch.lat?.toFixed(4)}, ${branch.lng?.toFixed(4)}</span>
      </div>
    </div>
  `;
}

function buildOfficeIconSvgDataUrl(isHQ: boolean, isSelected: boolean) {
  const fill = isHQ ? "#d97706" : isSelected ? "#004B8D" : "#0284c7";
  const roof = isHQ ? "#92400e" : isSelected ? "#002b52" : "#0369a1";
  const size = isSelected ? 40 : isHQ ? 36 : 30;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 36 36">
    <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#0f172a" flood-opacity="0.35"/>
    </filter>
    <g filter="url(#s)">
      <path d="M18 34 C18 34 29 24.5 29 15.5 C29 9.15 24.07 4 18 4 C11.93 4 7 9.15 7 15.5 C7 24.5 18 34 18 34 Z" fill="${fill}" stroke="#ffffff" stroke-width="2"/>
      <polygon points="18,8 11,12.5 25,12.5" fill="${roof}"/>
      <rect x="12.5" y="12.5" width="11" height="10.5" rx="1" fill="#ffffff"/>
      <rect x="14" y="14" width="2.2" height="2.2" fill="${fill}"/>
      <rect x="19.8" y="14" width="2.2" height="2.2" fill="${fill}"/>
      <rect x="14" y="17.2" width="2.2" height="2.2" fill="${fill}"/>
      <rect x="19.8" y="17.2" width="2.2" height="2.2" fill="${fill}"/>
      <rect x="16.8" y="19.5" width="2.4" height="3.5" fill="${roof}"/>
    </g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function buildLeafletPinHtml(branch: BranchOffice, isSelected: boolean) {
  const isHQ = branch.branchType === "Head Office";
  const pinBg = isHQ ? "#d97706" : isSelected ? "#004B8D" : "#0284c7";
  const borderCol = isSelected ? "#38bdf8" : "#ffffff";
  const scale = isSelected ? "scale(1.14)" : "scale(1)";
  const showLabel = isHQ || isSelected;
  const boxSize = isHQ || isSelected ? 32 : 26;
  const iconSize = isHQ || isSelected ? 16 : 13;

  return `
    <div class="verc-pin-inner" style="position: relative; display: flex; flex-direction: column; align-items: center; transform: ${scale};">
      ${
        showLabel
          ? `<div style="margin-bottom: 3px; padding: 2px 8px; border-radius: 999px; background: ${
              isHQ ? "#92400e" : "#0f172a"
            }; color: #fff; font-size: 10px; font-weight: 600; white-space: nowrap; box-shadow: 0 4px 10px rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.75); pointer-events: none;">
              ${escapeHtml(branch.name)} · ${escapeHtml(branch.district)}
            </div>`
          : ""
      }
      <div style="width: ${boxSize}px; height: ${boxSize}px; border-radius: 10px 10px 10px 2px; transform: rotate(-45deg); background: ${pinBg}; border: 2px solid ${borderCol}; box-shadow: 0 6px 14px rgba(15,23,42,0.32); display: flex; align-items: center; justify-content: center;">
        <svg style="transform: rotate(45deg);" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
          <path d="M9 22v-4h6v4"></path>
          <path d="M8 6h.01"></path>
          <path d="M16 6h.01"></path>
          <path d="M12 6h.01"></path>
          <path d="M12 10h.01"></path>
          <path d="M12 14h.01"></path>
          <path d="M16 10h.01"></path>
          <path d="M16 14h.01"></path>
          <path d="M8 10h.01"></path>
          <path d="M8 14h.01"></path>
        </svg>
      </div>
    </div>
  `;
}

export default function BranchMap({
  branches,
  selectedId,
  position,
  focus,
  resetKey,
  onSelect,
  onHover,
  route,
  pickingStart,
  onPickStart,
  heightClassName = "h-[350px] sm:h-[460px]",
}: Props) {
  const container = useRef<HTMLDivElement>(null),
    map = useRef<any>(),
    markerMap = useRef<Map<string, { marker: any; branch: BranchOffice }>>(new Map()),
    extraLayers = useRef<any[]>([]),
    leaflet = useRef<any>(),
    googleInfoWindow = useRef<any>(),
    resizeObserver = useRef<ResizeObserver>(),
    hoverTimer = useRef<number | null>(null),
    prevSelectedId = useRef<string>(""),
    initialFitDone = useRef(false),
    prevBranchKey = useRef<string>(""),
    prevResetKey = useRef<number>(resetKey),
    callbacks = useRef({ onSelect, onHover, onPickStart, pickingStart });
  callbacks.current = { onSelect, onHover, onPickStart, pickingStart };

  const [ready, setReady] = useState(false),
    [error, setError] = useState(false),
    [provider, setProvider] = useState<"google" | "leaflet" | null>(null),
    [scrollZoomEnabled, setScrollZoomEnabled] = useState(false),
    [scrollHint, setScrollHint] = useState(false);

  const validBranches = useMemo(() => branches.filter(hasCoordinates), [branches]);
  const branchKey = useMemo(() => validBranches.map((b) => `${b.id}:${b.lat}:${b.lng}`).join("|"), [validBranches]);

  // 1. Initialize Map Instance Once
  useEffect(() => {
    let disposed = false;
    const initializeLeaflet = async () => {
      const L = await import("leaflet");
      if (disposed || !container.current) return;
      leaflet.current = L;
      const instance = L.map(container.current, {
        scrollWheelZoom: false,
        zoomControl: false,
        zoomSnap: 0.5,
        zoomDelta: 0.5,
        wheelPxPerZoomLevel: 180,
        wheelDebounceTime: 80,
      }).setView([23.8, 90.2], 7);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        minZoom: 6,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(instance);

      instance.on("click", (event: any) => {
        if (callbacks.current.pickingStart)
          callbacks.current.onPickStart?.({ lat: event.latlng.lat, lng: event.latlng.lng });
      });

      map.current = instance;
      // IMPORTANT: ResizeObserver ONLY invalidates size without resetting zoom or pan!
      resizeObserver.current = new ResizeObserver(() => {
        if (!container.current?.clientWidth) return;
        instance.invalidateSize({ pan: false });
      });
      resizeObserver.current.observe(container.current);
      setProvider("leaflet");
      setReady(true);
    };

    loadGoogle()
      .then(() => {
        if (disposed || !container.current) return;
        const instance = new window.google.maps.Map(container.current, {
          center: { lat: 23.8, lng: 90.2 },
          zoom: 7,
          minZoom: 6,
          maxZoom: 18,
          gestureHandling: "cooperative",
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: false,
        });
        map.current = instance;
        googleInfoWindow.current = new window.google.maps.InfoWindow({
          disableAutoPan: true,
        });
        setProvider("google");
        instance.addListener("click", (event: any) => {
          if (callbacks.current.pickingStart)
            callbacks.current.onPickStart?.({ lat: event.latLng.lat(), lng: event.latLng.lng() });
        });
        instance.addListener("idle", () => {
          if (!disposed) setReady(true);
        });
        setReady(true);
      })
      .catch(async (error) => {
        console.warn(
          "Google map unavailable; using OpenStreetMap:",
          String(error?.message).replace(/AIza[\w-]+/g, "[redacted]")
        );
        try {
          await initializeLeaflet();
        } catch (fallbackError) {
          console.error("Office map initialization failed:", fallbackError);
          if (!disposed) setError(true);
        }
      });

    return () => {
      disposed = true;
      if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
      resizeObserver.current?.disconnect();
      if (leaflet.current && map.current) map.current.remove();
      else {
        markerMap.current.forEach(({ marker }) => marker.setMap?.(null));
        extraLayers.current.forEach((layer) => layer.setMap?.(null));
      }
      markerMap.current.clear();
    };
  }, []);

  // Toggle Leaflet scrollWheelZoom smoothly when user toggles Scroll Zoom button or holds Ctrl/Cmd
  useEffect(() => {
    if (provider !== "leaflet" || !map.current) return;
    if (scrollZoomEnabled) {
      map.current.scrollWheelZoom.enable();
    } else {
      map.current.scrollWheelZoom.disable();
    }
  }, [provider, scrollZoomEnabled]);

  useEffect(() => {
    const el = container.current;
    if (!el || provider !== "leaflet") return;
    let hintTimeout: number | undefined;

    const handleWheel = (e: WheelEvent) => {
      if (!map.current) return;
      if (e.ctrlKey || e.metaKey || scrollZoomEnabled) {
        if (!map.current.scrollWheelZoom.enabled()) {
          map.current.scrollWheelZoom.enable();
        }
      } else {
        if (map.current.scrollWheelZoom.enabled()) {
          map.current.scrollWheelZoom.disable();
        }
        setScrollHint(true);
        window.clearTimeout(hintTimeout);
        hintTimeout = window.setTimeout(() => setScrollHint(false), 1600);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      window.clearTimeout(hintTimeout);
    };
  }, [provider, scrollZoomEnabled]);

  // 2. Build Markers ONLY when branch list changes (never on hover or selectedId change!)
  useEffect(() => {
    if (!ready || !map.current || !provider) return;

    if (provider === "google") {
      const g = window.google.maps;
      markerMap.current.forEach(({ marker }) => marker.setMap(null));
      markerMap.current.clear();

      validBranches.forEach((branch) => {
        const point = { lat: branch.lat, lng: branch.lng };
        const isHQ = branch.branchType === "Head Office";
        const isSelected = branch.id === selectedId;
        const size = isSelected ? 40 : isHQ ? 36 : 30;
        const marker = new g.Marker({
          map: map.current,
          position: point,
          title: `${branch.name} (${branch.district})`,
          zIndex: isSelected ? 1000 : isHQ ? 900 : 100,
          icon: {
            url: buildOfficeIconSvgDataUrl(isHQ, isSelected),
            scaledSize: new g.Size(size, size),
            anchor: new g.Point(size / 2, size - 2),
          },
        });

        marker.addListener("mouseover", () => {
          if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
          hoverTimer.current = window.setTimeout(() => {
            callbacks.current.onHover?.(branch.id);
          }, 70);
          if (googleInfoWindow.current) {
            googleInfoWindow.current.setOptions({ disableAutoPan: true });
            googleInfoWindow.current.setContent(buildOfficePopupHtml(branch));
            googleInfoWindow.current.open(map.current, marker);
          }
        });

        marker.addListener("mouseout", () => {
          if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
        });

        marker.addListener("click", () => {
          if (callbacks.current.pickingStart) {
            callbacks.current.onPickStart?.(point);
          } else {
            callbacks.current.onSelect(branch.id);
            if (googleInfoWindow.current) {
              googleInfoWindow.current.setOptions({ disableAutoPan: false });
              googleInfoWindow.current.setContent(buildOfficePopupHtml(branch));
              googleInfoWindow.current.open(map.current, marker);
            }
          }
        });

        markerMap.current.set(branch.id, { marker, branch });
      });

      prevSelectedId.current = selectedId;
      return;
    }

    // Leaflet Markers
    const L = leaflet.current;
    markerMap.current.forEach(({ marker }) => map.current.removeLayer(marker));
    markerMap.current.clear();

    validBranches.forEach((branch) => {
      const point: [number, number] = [branch.lat!, branch.lng!];
      const isHQ = branch.branchType === "Head Office";
      const isSelected = branch.id === selectedId;
      const zIdx = isSelected ? 900 : isHQ ? 800 : 100;

      const icon = L.divIcon({
        className: "verc-office-building-pin",
        html: buildLeafletPinHtml(branch, isSelected),
        iconSize: [isHQ || isSelected ? 36 : 28, isHQ || isSelected ? 46 : 32],
        iconAnchor: [isHQ || isSelected ? 18 : 14, isHQ || isSelected ? 40 : 28],
        tooltipAnchor: [0, -26],
      });

      const marker = L.marker(point, { icon, zIndexOffset: zIdx }).bindTooltip(
        buildOfficePopupHtml(branch),
        {
          direction: "top",
          sticky: false,
          interactive: false,
          opacity: 1,
          offset: [0, -6],
          className: "verc-office-tooltip",
        }
      );

      marker.on("mouseover", () => {
        if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
        hoverTimer.current = window.setTimeout(() => {
          callbacks.current.onHover?.(branch.id);
        }, 70);
      });

      marker.on("mouseout", () => {
        if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
      });

      marker.on("click", () => {
        if (callbacks.current.pickingStart) {
          callbacks.current.onPickStart?.({ lat: point[0], lng: point[1] });
        } else {
          callbacks.current.onSelect(branch.id);
        }
      });

      marker.addTo(map.current);
      markerMap.current.set(branch.id, { marker, branch });
    });

    prevSelectedId.current = selectedId;
  }, [ready, provider, branchKey]);

  // 3. Update ONLY the changed markers in-place when selectedId changes (No flickering or destroying 137 pins!)
  useEffect(() => {
    if (!ready || !map.current || !provider) return;
    const prevId = prevSelectedId.current;
    if (prevId === selectedId) return;

    const updateOne = (id: string, isSelected: boolean) => {
      const entry = markerMap.current.get(id);
      if (!entry) return;
      const { marker, branch } = entry;
      const isHQ = branch.branchType === "Head Office";

      if (provider === "google") {
        const g = window.google.maps;
        const size = isSelected ? 40 : isHQ ? 36 : 30;
        marker.setIcon({
          url: buildOfficeIconSvgDataUrl(isHQ, isSelected),
          scaledSize: new g.Size(size, size),
          anchor: new g.Point(size / 2, size - 2),
        });
        marker.setZIndex(isSelected ? 1000 : isHQ ? 900 : 100);
      } else if (leaflet.current) {
        const L = leaflet.current;
        const icon = L.divIcon({
          className: "verc-office-building-pin",
          html: buildLeafletPinHtml(branch, isSelected),
          iconSize: [isHQ || isSelected ? 36 : 28, isHQ || isSelected ? 46 : 32],
          iconAnchor: [isHQ || isSelected ? 18 : 14, isHQ || isSelected ? 40 : 28],
          tooltipAnchor: [0, -26],
        });
        marker.setIcon(icon);
        marker.setZIndexOffset(isSelected ? 900 : isHQ ? 800 : 100);
      }
    };

    if (prevId) updateOne(prevId, false);
    if (selectedId) updateOne(selectedId, true);
    prevSelectedId.current = selectedId;
  }, [ready, provider, selectedId]);

  // 4. Update Visitor Position & Route Overlays
  useEffect(() => {
    if (!ready || !map.current || !provider) return;

    if (provider === "google") {
      const g = window.google.maps;
      extraLayers.current.forEach((layer) => layer.setMap?.(null));
      extraLayers.current = [];

      if (position) {
        const point = { lat: position.lat, lng: position.lng };
        extraLayers.current.push(
          new g.Marker({ map: map.current, position: point, title: "Your starting point", label: "You" })
        );
        if (position.accuracy) {
          extraLayers.current.push(
            new g.Circle({
              map: map.current,
              center: point,
              radius: position.accuracy,
              fillColor: "#2563eb",
              fillOpacity: 0.08,
              strokeWeight: 1,
            })
          );
        }
      }

      if (route?.coordinates.length) {
        const points = route.coordinates.map(([lng, lat]) => ({ lat, lng }));
        extraLayers.current.push(
          new g.Polyline({ map: map.current, path: points, strokeColor: "#004B8D", strokeWeight: 5 })
        );
      }
      return;
    }

    const L = leaflet.current;
    extraLayers.current.forEach((layer) => map.current.removeLayer(layer));
    extraLayers.current = [];

    if (position) {
      const point: [number, number] = [position.lat, position.lng];
      const marker = L.circleMarker(point, {
        radius: 8,
        color: "#fff",
        weight: 2,
        fillColor: "#2563eb",
        fillOpacity: 1,
      })
        .bindTooltip("Your starting point")
        .addTo(map.current);
      extraLayers.current.push(marker);
      if (position.accuracy) {
        const circle = L.circle(point, {
          radius: position.accuracy,
          color: "#2563eb",
          weight: 1,
          fillOpacity: 0.08,
        }).addTo(map.current);
        extraLayers.current.push(circle);
      }
    }

    if (route?.coordinates.length) {
      const points = route.coordinates.map(([lng, lat]) => [lat, lng] as [number, number]);
      const line = L.polyline(points, { color: "#004B8D", weight: 5 }).addTo(map.current);
      extraLayers.current.push(line);
    }
  }, [ready, provider, position, route]);

  // 5. Controlled Camera Viewport: ONLY pan/fit when explicitly needed (never on hover!)
  const fitAllBranches = () => {
    if (!ready || !map.current || !provider || !validBranches.length) return;
    if (provider === "google") {
      const g = window.google.maps;
      const bounds = new g.LatLngBounds();
      validBranches.forEach((b) => bounds.extend({ lat: b.lat, lng: b.lng }));
      if (!bounds.isEmpty()) map.current.fitBounds(bounds, 36);
    } else if (leaflet.current) {
      const L = leaflet.current;
      const bounds = L.latLngBounds(validBranches.map((b) => [b.lat!, b.lng!] as [number, number]));
      if (bounds.isValid()) map.current.fitBounds(bounds, { padding: [36, 36], maxZoom: 12 });
    }
  };

  useEffect(() => {
    if (!ready || !map.current || !provider) return;

    const branchListChanged = prevBranchKey.current !== branchKey;
    const resetTriggered = prevResetKey.current !== resetKey;
    prevBranchKey.current = branchKey;
    prevResetKey.current = resetKey;

    if (route?.coordinates.length && focus !== "all") {
      if (provider === "google") {
        const g = window.google.maps;
        const routeBounds = new g.LatLngBounds();
        route.coordinates.forEach(([lng, lat]) => routeBounds.extend({ lat, lng }));
        map.current.fitBounds(routeBounds, 40);
      } else if (leaflet.current) {
        const L = leaflet.current;
        const points = route.coordinates.map(([lng, lat]) => [lat, lng] as [number, number]);
        const routeBounds = L.latLngBounds(points);
        if (routeBounds.isValid()) map.current.fitBounds(routeBounds, { padding: [40, 40] });
      }
      return;
    }

    if (focus === "selected" && !resetTriggered) {
      const selected = validBranches.find((b) => b.id === selectedId);
      if (selected) {
        if (provider === "google") {
          map.current.panTo({ lat: selected.lat, lng: selected.lng });
          const currentZ = map.current.getZoom() || 7;
          if (currentZ < 11) map.current.setZoom(12);
        } else {
          const currentZ = map.current.getZoom() || 7;
          const targetZ = Math.min(Math.max(currentZ, 11.5), 13.5);
          map.current.setView([selected.lat!, selected.lng!], targetZ, { animate: true });
        }
        return;
      }
    }

    if (!initialFitDone.current || branchListChanged || resetTriggered) {
      initialFitDone.current = true;
      fitAllBranches();
    }
  }, [ready, provider, branchKey, selectedId, focus, resetKey, route]);

  const handleZoom = (delta: number) => {
    if (!map.current) return;
    if (provider === "google") {
      const z = map.current.getZoom() || 7;
      map.current.setZoom(Math.min(18, Math.max(6, z + delta)));
    } else {
      if (delta > 0) map.current.zoomIn(0.75);
      else map.current.zoomOut(0.75);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-sky-50 select-none ${heightClassName}`}>
      <div
        ref={container}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" && pickingStart && map.current) {
            event.preventDefault();
            const point = map.current.getCenter();
            onPickStart?.({
              lat: typeof point.lat === "function" ? point.lat() : point.lat,
              lng: typeof point.lng === "function" ? point.lng() : point.lng,
            });
          }
        }}
        role="region"
        aria-label="Interactive map of VERC offices across Bangladesh"
        className="h-full w-full z-0"
      />

      {/* Apple-Grade Floating Map Controls (Smooth Zoom + Scroll Lock Toggle + Fit Bangladesh) */}
      {ready && (
        <div className="absolute top-3 left-3 z-[400] flex flex-wrap items-center gap-1.5">
          <div className="inline-flex items-center rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md overflow-hidden">
            <button
              type="button"
              onClick={() => handleZoom(1)}
              title="Zoom in"
              aria-label="Zoom in"
              className="p-2 text-slate-700 hover:bg-sky-50 hover:text-brand-primary transition-colors cursor-pointer border-r border-slate-200/80"
            >
              <Plus size={15} />
            </button>
            <button
              type="button"
              onClick={() => handleZoom(-1)}
              title="Zoom out"
              aria-label="Zoom out"
              className="p-2 text-slate-700 hover:bg-sky-50 hover:text-brand-primary transition-colors cursor-pointer border-r border-slate-200/80"
            >
              <Minus size={15} />
            </button>
            <button
              type="button"
              onClick={fitAllBranches}
              title="Reset to full Bangladesh view"
              className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-sky-50 hover:text-brand-primary transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <RotateCcw size={12} />
              <span>Fit Map</span>
            </button>
          </div>

          {provider === "leaflet" && (
            <button
              type="button"
              onClick={() => setScrollZoomEnabled((v) => !v)}
              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold border shadow-md backdrop-blur-md transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                scrollZoomEnabled
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-white/95 text-slate-700 border-slate-200/90 hover:text-brand-primary"
              }`}
              title="Toggle mouse wheel zoom"
            >
              <MousePointerClick size={12} />
              <span>{scrollZoomEnabled ? "Scroll Zoom: On" : "Scroll Zoom: Locked"}</span>
            </button>
          )}
        </div>
      )}

      {/* Subtle Scroll Hint Toast when scrolling over map while Scroll Zoom is locked */}
      {scrollHint && !scrollZoomEnabled && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-[400] rounded-full bg-slate-900/85 backdrop-blur-md text-white px-4 py-1.5 text-xs font-medium shadow-lg">
          Hold <kbd className="font-semibold">Ctrl</kbd> + Scroll to zoom, or click{" "}
          <span className="text-sky-300 font-semibold">Scroll Zoom: Locked</span> above
        </div>
      )}

      {!ready && (
        <p role="status" className="absolute inset-0 grid place-items-center bg-sky-50 text-sm text-slate-600">
          {error
            ? "Office map could not load. Office details and directions remain available."
            : "Loading Bangladesh office map…"}
        </p>
      )}
      {pickingStart && (
        <p className="absolute bottom-8 left-3 z-[400] rounded-lg bg-white px-3 py-2 text-xs shadow">
          Click your starting point on the map.
        </p>
      )}
    </div>
  );
}

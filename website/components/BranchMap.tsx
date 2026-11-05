"use client";

import { useEffect, useRef, useState } from "react";

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
    <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 235px; max-width: 280px; padding: 4px 2px; color: #0f172a; line-height: 1.4;">
      <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
        <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 7px; background: ${badgeBg}; color: #fff; font-size: 13px; flex-shrink: 0;">🏢</span>
        <div>
          <div style="font-weight: 800; font-size: 13px; color: #0f172a;">${escapeHtml(branch.name)}${!isHQ && !branch.name.toLowerCase().includes("branch") ? " Office" : ""}</div>
          <div style="font-size: 10px; font-weight: 700; color: ${badgeBg}; text-transform: uppercase; letter-spacing: 0.04em;">
            ${escapeHtml(branch.branchType || "Branch Office")}${branch.code ? ` · Code #${escapeHtml(branch.code)}` : ""}
          </div>
        </div>
      </div>
      <div style="font-size: 11px; color: #334155; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 8px; margin-bottom: 6px;">
        <div style="font-weight: 700; color: #0f172a; margin-bottom: 2px;">📍 ${escapeHtml(locationParts || branch.district)}</div>
        <div style="color: #475569;">${escapeHtml(branch.address)}</div>
        ${poVillage ? `<div style="margin-top: 3px; font-size: 10px; color: #64748b;">${escapeHtml(poVillage)}</div>` : ""}
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 11px; font-weight: 700; color: #004B8D;">
        <span>📞 ${escapeHtml(branch.phone || "N/A")}</span>
        <span style="font-size: 10px; color: #64748b; font-weight: 600;">${branch.lat?.toFixed(4)}, ${branch.lng?.toFixed(4)}</span>
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
    layers = useRef<any[]>([]),
    leaflet = useRef<any>(),
    resizeObserver = useRef<ResizeObserver>(),
    leafletViewport = useRef<() => void>(() => {}),
    callbacks = useRef({ onSelect, onHover, onPickStart, pickingStart });
  callbacks.current = { onSelect, onHover, onPickStart, pickingStart };

  const [ready, setReady] = useState(false),
    [error, setError] = useState(false),
    [provider, setProvider] = useState<"google" | "leaflet" | null>(null);

  useEffect(() => {
    let disposed = false;
    const initializeLeaflet = async () => {
      const L = await import("leaflet");
      if (disposed || !container.current) return;
      leaflet.current = L;
      const instance = L.map(container.current, { scrollWheelZoom: false }).setView([23.8, 90.2], 7);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(instance);
      instance.on("click", (event: any) => {
        if (callbacks.current.pickingStart)
          callbacks.current.onPickStart?.({ lat: event.latlng.lat, lng: event.latlng.lng });
      });
      map.current = instance;
      resizeObserver.current = new ResizeObserver(() => {
        if (!container.current?.clientWidth) return;
        instance.invalidateSize({ pan: false });
        leafletViewport.current();
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
          gestureHandling: "cooperative",
          mapTypeControl: false,
          streetViewControl: false,
        });
        map.current = instance;
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
      resizeObserver.current?.disconnect();
      if (leaflet.current && map.current) map.current.remove();
      else layers.current.forEach((layer) => layer.setMap?.(null));
    };
  }, []);

  useEffect(() => {
    if (!ready || !map.current || !provider) return;

    if (provider === "google") {
      const g = window.google.maps;
      layers.current.forEach((layer) => layer.setMap?.(null));
      layers.current = [];
      const bounds = new g.LatLngBounds();
      const infoWindow = new g.InfoWindow();

      branches.filter(hasCoordinates).forEach((branch) => {
        const point = { lat: branch.lat, lng: branch.lng };
        bounds.extend(point);
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
          callbacks.current.onHover?.(branch.id);
          infoWindow.setContent(buildOfficePopupHtml(branch));
          infoWindow.open(map.current, marker);
        });

        marker.addListener("click", () => {
          if (callbacks.current.pickingStart) {
            callbacks.current.onPickStart?.(point);
          } else {
            callbacks.current.onSelect(branch.id);
            infoWindow.setContent(buildOfficePopupHtml(branch));
            infoWindow.open(map.current, marker);
          }
        });

        if (isSelected && focus === "selected") {
          infoWindow.setContent(buildOfficePopupHtml(branch));
          infoWindow.open(map.current, marker);
        }

        layers.current.push(marker);
      });

      if (position) {
        const point = { lat: position.lat, lng: position.lng };
        layers.current.push(
          new g.Marker({ map: map.current, position: point, title: "Your starting point", label: "You" })
        );
        if (position.accuracy)
          layers.current.push(
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

      if (route?.coordinates.length) {
        const points = route.coordinates.map(([lng, lat]) => ({ lat, lng }));
        layers.current.push(
          new g.Polyline({ map: map.current, path: points, strokeColor: "#004B8D", strokeWeight: 5 })
        );
        if (focus !== "all") {
          const routeBounds = new g.LatLngBounds();
          points.forEach((point) => routeBounds.extend(point));
          map.current.fitBounds(routeBounds, 40);
          return;
        }
      }

      if (focus === "selected") {
        const selected = branches.find((branch) => branch.id === selectedId);
        if (selected && hasCoordinates(selected)) {
          map.current.setCenter({ lat: selected.lat, lng: selected.lng });
          map.current.setZoom(14);
          return;
        }
      }

      if (!bounds.isEmpty()) map.current.fitBounds(bounds, 35);
      return;
    }

    // Leaflet Provider with Custom Office Building Markers + Rich Hover/Click Tooltip
    const L = leaflet.current;
    layers.current.forEach((layer) => map.current.removeLayer(layer));
    layers.current = [];
    const bounds = L.latLngBounds([]);

    branches.filter(hasCoordinates).forEach((branch) => {
      const point: [number, number] = [branch.lat!, branch.lng!];
      bounds.extend(point);
      const isHQ = branch.branchType === "Head Office";
      const isSelected = branch.id === selectedId;
      const pinBg = isHQ ? "#d97706" : isSelected ? "#004B8D" : "#0284c7";
      const borderCol = isSelected ? "#38bdf8" : "#ffffff";
      const scale = isSelected ? "scale(1.18)" : "scale(1)";
      const zIdx = isSelected ? 900 : isHQ ? 800 : 100;
      const showLabel = isHQ || isSelected;

      const html = `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: ${scale}; transition: transform 0.2s ease;">
          ${
            showLabel
              ? `<div style="margin-bottom: 3px; padding: 2px 7px; border-radius: 999px; background: ${
                  isHQ ? "#92400e" : "#0f172a"
                }; color: #fff; font-size: 10px; font-weight: 800; white-space: nowrap; box-shadow: 0 4px 10px rgba(0,0,0,0.28); border: 1px solid rgba(255,255,255,0.7);">
                  ${escapeHtml(branch.name)} · ${escapeHtml(branch.district)}
                </div>`
              : ""
          }
          <div style="width: ${isHQ || isSelected ? 32 : 26}px; height: ${
        isHQ || isSelected ? 32 : 26
      }px; border-radius: 10px 10px 10px 2px; transform: rotate(-45deg); background: ${pinBg}; border: 2px solid ${borderCol}; box-shadow: 0 6px 14px rgba(15,23,42,0.35); display: flex; align-items: center; justify-content: center;">
            <svg style="transform: rotate(45deg);" width="${isHQ || isSelected ? 16 : 13}" height="${
        isHQ || isSelected ? 16 : 13
      }" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
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

      const icon = L.divIcon({
        className: "verc-office-building-pin",
        html,
        iconSize: [isHQ || isSelected ? 36 : 28, isHQ || isSelected ? 46 : 32],
        iconAnchor: [isHQ || isSelected ? 18 : 14, isHQ || isSelected ? 40 : 28],
        tooltipAnchor: [0, -28],
      });

      const marker = L.marker(point, { icon, zIndexOffset: zIdx }).bindTooltip(buildOfficePopupHtml(branch), {
        direction: "top",
        opacity: 0.98,
        className: "verc-office-tooltip",
      });

      marker.on("mouseover", () => {
        callbacks.current.onHover?.(branch.id);
      });

      marker.on("click", () => {
        if (callbacks.current.pickingStart)
          callbacks.current.onPickStart?.({ lat: point[0], lng: point[1] });
        else callbacks.current.onSelect(branch.id);
      });

      marker.addTo(map.current);
      layers.current.push(marker);
    });

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
      layers.current.push(marker);
      if (position.accuracy) {
        const circle = L.circle(point, {
          radius: position.accuracy,
          color: "#2563eb",
          weight: 1,
          fillOpacity: 0.08,
        }).addTo(map.current);
        layers.current.push(circle);
      }
    }

    const routeBounds = L.latLngBounds([]);
    if (route?.coordinates.length) {
      const points = route.coordinates.map(([lng, lat]) => [lat, lng] as [number, number]);
      const line = L.polyline(points, { color: "#004B8D", weight: 5 }).addTo(map.current);
      layers.current.push(line);
      routeBounds.extend(line.getBounds());
    }

    const selected = branches.find((branch) => branch.id === selectedId);
    leafletViewport.current = () => {
      if (routeBounds.isValid() && focus !== "all") {
        map.current.fitBounds(routeBounds, { padding: [40, 40] });
        return;
      }
      if (focus === "selected" && selected && hasCoordinates(selected)) {
        map.current.setView([selected.lat!, selected.lng!], 13);
        return;
      }
      if (bounds.isValid()) map.current.fitBounds(bounds, { padding: [35, 35] });
    };
    leafletViewport.current();
  }, [ready, provider, branches, selectedId, position, route, focus, resetKey]);

  return (
    <div className={`relative overflow-hidden bg-sky-50 ${heightClassName}`}>
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
        className="h-full w-full"
      />
      {!ready && (
        <p role="status" className="absolute inset-0 grid place-items-center bg-sky-50 text-sm text-slate-600">
          {error
            ? "Office map could not load. Office details and directions remain available."
            : "Loading Bangladesh office map…"}
        </p>
      )}
      {pickingStart && (
        <p className="absolute bottom-8 left-3 rounded-lg bg-white px-3 py-2 text-xs shadow">
          Click your starting point on the map.
        </p>
      )}
    </div>
  );
}

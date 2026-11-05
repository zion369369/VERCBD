"use client";

import { useEffect, useRef, useState } from "react";

import type { BranchOffice } from "@/context/ContentContext";
import { hasCoordinates } from "@/lib/branchDirectory";

import type { OfficeRoute } from "@/lib/roadRouting";

export interface VisitorPosition { lat: number; lng: number; accuracy: number; manual?: boolean; timestamp?: number }
interface Props {
  branches: BranchOffice[];
  selectedId: string;
  position?: VisitorPosition;
  focus: "all" | "selected" | "nearby";
  resetKey: number;
  onSelect: (id: string) => void;
  route?: OfficeRoute;
  pickingStart?: boolean;
  onPickStart?: (point: { lat: number; lng: number }) => void;
}

declare global { interface Window { google: any } }
let loader: Promise<void> | undefined;
function loadGoogle() {
 if(!loader) loader=fetch('/api/location').then(response=>{
  if(!response.ok) throw Error('Maps configuration unavailable');
  return response.json();
 }).then(config=>new Promise<void>((resolve,reject)=>{
  if(window.google?.maps?.Map){resolve();return;}
  if(!config.key){reject(Error('Browser Maps key unavailable'));return;}
  const host=window as any, callback='__vercGoogleReady', script=document.createElement('script');
  let timeout=window.setTimeout(()=>finish(Error('Map loading timed out')),15000);
  const finish=(error?:Error)=>{window.clearTimeout(timeout);delete host[callback];if(error){script.remove();reject(error);}else resolve();};
  host[callback]=()=>finish();
  script.src='https://maps.googleapis.com/maps/api/js?key='+encodeURIComponent(config.key)+'&loading=async&callback='+callback;
  script.async=true;
  script.onerror=()=>finish(Error('Map unavailable'));
  document.head.appendChild(script);
 })).catch(error=>{loader=undefined;throw error;});
 return loader;
}
export default function BranchMap({branches,selectedId,position,focus,resetKey,onSelect,route,pickingStart,onPickStart}:Props){
 const container=useRef<HTMLDivElement>(null),map=useRef<any>(),layers=useRef<any[]>([]),leaflet=useRef<any>(),resizeObserver=useRef<ResizeObserver>(),leafletViewport=useRef<()=>void>(()=>{}),callbacks=useRef({onSelect,onPickStart,pickingStart});callbacks.current={onSelect,onPickStart,pickingStart};
 const [ready,setReady]=useState(false),[error,setError]=useState(false),[provider,setProvider]=useState<"google"|"leaflet"|null>(null);
 useEffect(()=>{
  let disposed=false;
  const initializeLeaflet=async()=>{
   const L=await import("leaflet");
   if(disposed||!container.current)return;
   leaflet.current=L;
   const instance=L.map(container.current,{scrollWheelZoom:false}).setView([23.8,90.2],7);
   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(instance);
   instance.on("click",(event:any)=>{if(callbacks.current.pickingStart)callbacks.current.onPickStart?.({lat:event.latlng.lat,lng:event.latlng.lng});});
   map.current=instance;
   resizeObserver.current=new ResizeObserver(()=>{if(!container.current?.clientWidth)return;instance.invalidateSize({pan:false});leafletViewport.current();});
   resizeObserver.current.observe(container.current);
   setProvider("leaflet");setReady(true);
  };
  loadGoogle().then(()=>{
   if(disposed||!container.current)return;
   const instance=new window.google.maps.Map(container.current,{center:{lat:23.8,lng:90.2},zoom:7,gestureHandling:"cooperative",mapTypeControl:false,streetViewControl:false});
   map.current=instance;setProvider("google");
   instance.addListener("click",(event:any)=>{if(callbacks.current.pickingStart)callbacks.current.onPickStart?.({lat:event.latLng.lat(),lng:event.latLng.lng()});});
   instance.addListener("idle",()=>{if(!disposed)setReady(true);});setReady(true);
  }).catch(async error=>{
   console.warn("Google map unavailable; using OpenStreetMap:",String(error?.message).replace(/AIza[\w-]+/g,"[redacted]"));
   try{await initializeLeaflet();}catch(fallbackError){console.error("Office map initialization failed:",fallbackError);if(!disposed)setError(true);}
  });
  return()=>{disposed=true;resizeObserver.current?.disconnect();if(leaflet.current&&map.current)map.current.remove();else layers.current.forEach(layer=>layer.setMap(null));};
 },[]);
 useEffect(()=>{
  if(!ready||!map.current||!provider)return;
  if(provider==="google"){
   const g=window.google.maps;layers.current.forEach(layer=>layer.setMap(null));layers.current=[];const bounds=new g.LatLngBounds();
   branches.filter(hasCoordinates).forEach(branch=>{const point={lat:branch.lat,lng:branch.lng};bounds.extend(point);const marker=new g.Marker({map:map.current,position:point,title:branch.name+" · "+branch.district,icon:{path:g.SymbolPath.CIRCLE,scale:branch.id===selectedId?10:6,fillColor:branch.id===selectedId?"#004B8D":"#00AEEF",fillOpacity:1,strokeColor:"white",strokeWeight:2}});marker.addListener("click",()=>{if(callbacks.current.pickingStart)callbacks.current.onPickStart?.(point);else callbacks.current.onSelect(branch.id);});layers.current.push(marker);});
   if(position){const point={lat:position.lat,lng:position.lng};layers.current.push(new g.Marker({map:map.current,position:point,title:"Your starting point",label:"S"}));if(position.accuracy)layers.current.push(new g.Circle({map:map.current,center:point,radius:position.accuracy,fillColor:"#2563eb",fillOpacity:.08,strokeWeight:1}));}
   if(route?.coordinates.length){const points=route.coordinates.map(([lng,lat])=>({lat,lng}));layers.current.push(new g.Polyline({map:map.current,path:points,strokeColor:"#004B8D",strokeWeight:5}));if(focus!=="all"){const routeBounds=new g.LatLngBounds();points.forEach(point=>routeBounds.extend(point));map.current.fitBounds(routeBounds,40);return;}}
   if(focus==="selected"){const selected=branches.find(branch=>branch.id===selectedId);if(selected&&hasCoordinates(selected)){map.current.setCenter({lat:selected.lat,lng:selected.lng});map.current.setZoom(14);return;}}
   if(!bounds.isEmpty())map.current.fitBounds(bounds,35);
   return;
  }
  const L=leaflet.current;layers.current.forEach(layer=>map.current.removeLayer(layer));layers.current=[];const bounds=L.latLngBounds([]);
  branches.filter(hasCoordinates).forEach(branch=>{const point:[number,number]=[branch.lat!,branch.lng!];bounds.extend(point);const marker=L.circleMarker(point,{radius:branch.id===selectedId?9:6,color:"#fff",weight:2,fillColor:branch.id===selectedId?"#004B8D":"#00AEEF",fillOpacity:1}).bindTooltip(`${branch.name} · ${branch.district}`);marker.on("click",()=>{if(callbacks.current.pickingStart)callbacks.current.onPickStart?.({lat:point[0],lng:point[1]});else callbacks.current.onSelect(branch.id);});marker.addTo(map.current);layers.current.push(marker);});
  if(position){const point:[number,number]=[position.lat,position.lng];const marker=L.circleMarker(point,{radius:8,color:"#fff",weight:2,fillColor:"#2563eb",fillOpacity:1}).bindTooltip("Your starting point").addTo(map.current);layers.current.push(marker);if(position.accuracy){const circle=L.circle(point,{radius:position.accuracy,color:"#2563eb",weight:1,fillOpacity:.08}).addTo(map.current);layers.current.push(circle);}}
  const routeBounds=L.latLngBounds([]);
  if(route?.coordinates.length){const points=route.coordinates.map(([lng,lat])=>[lat,lng] as [number,number]);const line=L.polyline(points,{color:"#004B8D",weight:5}).addTo(map.current);layers.current.push(line);routeBounds.extend(line.getBounds());}
  const selected=branches.find(branch=>branch.id===selectedId);
  leafletViewport.current=()=>{
   if(routeBounds.isValid()&&focus!=="all"){map.current.fitBounds(routeBounds,{padding:[40,40]});return;}
   if(focus==="selected"&&selected&&hasCoordinates(selected)){map.current.setView([selected.lat!,selected.lng!],14);return;}
   if(bounds.isValid())map.current.fitBounds(bounds,{padding:[35,35]});
  };
  leafletViewport.current();
 },[ready,provider,branches,selectedId,position,route,focus,resetKey]);
 return <div className="relative h-[330px] overflow-hidden bg-sky-50 sm:h-[430px]"><div ref={container} tabIndex={0} onKeyDown={event=>{if(event.key==="Enter"&&pickingStart&&map.current){event.preventDefault();const point=map.current.getCenter();onPickStart?.({lat:typeof point.lat==="function"?point.lat():point.lat,lng:typeof point.lng==="function"?point.lng():point.lng});}}} role="region" aria-label="Interactive map of VERC offices" className="h-full w-full"/>{!ready&&<p role="status" className="absolute inset-0 grid place-items-center bg-sky-50 text-sm text-slate-600">{error?"Office map could not load. Office details and directions remain available.":"Loading office map…"}</p>}{pickingStart&&<p className="absolute bottom-8 left-3 rounded-lg bg-white px-3 py-2 text-xs shadow">Click your starting point on the map.</p>}</div>;
}

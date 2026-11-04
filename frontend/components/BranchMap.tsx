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
 if(!loader) loader=fetch('/api/location').then(r=>r.json()).then(config=>new Promise<void>((resolve,reject)=>{
  if(window.google?.maps?.Map){resolve();return;}if(!config.key){reject(Error('Maps key unavailable'));return;}
  (window as any).__vercGoogleReady=()=>resolve();const script=document.createElement('script');script.src='https://maps.googleapis.com/maps/api/js?key='+encodeURIComponent(config.key)+'&loading=async&callback=__vercGoogleReady';script.async=true;script.onerror=()=>reject(Error('Map unavailable'));document.head.appendChild(script);
 }));return loader;
}
export default function BranchMap({branches,selectedId,position,focus,resetKey,onSelect,route,pickingStart,onPickStart}:Props){
 const container=useRef<HTMLDivElement>(null),map=useRef<any>(),layers=useRef<any[]>([]),callbacks=useRef({onSelect,onPickStart,pickingStart});callbacks.current={onSelect,onPickStart,pickingStart};
 const [ready,setReady]=useState(false),[error,setError]=useState(false);
 useEffect(()=>{let disposed=false;loadGoogle().then(()=>{if(disposed||!container.current)return;const instance=new window.google.maps.Map(container.current,{center:{lat:23.8,lng:90.2},zoom:7,gestureHandling:'cooperative',mapTypeControl:false,streetViewControl:false});map.current=instance;instance.addListener('click',(event:any)=>{if(callbacks.current.pickingStart)callbacks.current.onPickStart?.({lat:event.latLng.lat(),lng:event.latLng.lng()});});instance.addListener('idle',()=>{if(!disposed)setReady(true);});setReady(true);}).catch((error)=>{console.warn("Google map initialization:",String(error?.message).replace(/AIza[\w-]+/g,"[redacted]"));if(!disposed)setError(true)});return()=>{disposed=true;layers.current.forEach(layer=>layer.setMap(null));};},[]);
 useEffect(()=>{if(!ready||!map.current)return;const g=window.google.maps;layers.current.forEach(layer=>layer.setMap(null));layers.current=[];const bounds=new g.LatLngBounds();
  branches.filter(hasCoordinates).forEach(branch=>{const point={lat:branch.lat,lng:branch.lng};bounds.extend(point);const marker=new g.Marker({map:map.current,position:point,title:branch.name+' · '+branch.district,icon:{path:g.SymbolPath.CIRCLE,scale:branch.id===selectedId?10:6,fillColor:branch.id===selectedId?'#004B8D':'#00AEEF',fillOpacity:1,strokeColor:'white',strokeWeight:2}});marker.addListener('click',()=>{if(callbacks.current.pickingStart)callbacks.current.onPickStart?.(point);else callbacks.current.onSelect(branch.id);});layers.current.push(marker);});
  if(position){const point={lat:position.lat,lng:position.lng};layers.current.push(new g.Marker({map:map.current,position:point,title:'Your starting point',label:'S'}));if(position.accuracy)layers.current.push(new g.Circle({map:map.current,center:point,radius:position.accuracy,fillColor:'#2563eb',fillOpacity:.08,strokeWeight:1}));}
  if(route?.coordinates.length){const points=route.coordinates.map(([lng,lat])=>({lat,lng}));layers.current.push(new g.Polyline({map:map.current,path:points,strokeColor:'#004B8D',strokeWeight:5}));if(focus!=='all'){const routeBounds=new g.LatLngBounds();points.forEach(point=>routeBounds.extend(point));map.current.fitBounds(routeBounds,40);return;}}
  if(focus==='selected'){const selected=branches.find(branch=>branch.id===selectedId);if(selected&&hasCoordinates(selected)){map.current.setCenter({lat:selected.lat,lng:selected.lng});map.current.setZoom(14);return;}}
  if(!bounds.isEmpty())map.current.fitBounds(bounds,35);
 },[ready,branches,selectedId,position,route,focus,resetKey]);
 return <div className="relative h-[330px] overflow-hidden bg-sky-50 sm:h-[430px]"><div ref={container} tabIndex={0} onKeyDown={event=>{if(event.key==="Enter"&&pickingStart&&map.current){event.preventDefault();const point=map.current.getCenter();onPickStart?.({lat:point.lat(),lng:point.lng()});}}} role="region" aria-label="Interactive map of VERC offices" className="h-full w-full"/>{!ready&&<p role="status" className="absolute inset-0 grid place-items-center bg-sky-50 text-sm text-slate-600">{error?'Google Maps could not load. Office details and directions remain available.':'Loading Google Maps…'}</p>}{pickingStart&&<p className="absolute bottom-8 left-3 rounded-lg bg-white px-3 py-2 text-xs shadow">Click your starting point on the map.</p>}</div>;
}

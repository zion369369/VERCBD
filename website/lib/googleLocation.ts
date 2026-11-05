import type { BranchOffice } from "@/context/ContentContext";
const waypoint = (branch: BranchOffice) => branch.googlePlaceId ? { placeId: branch.googlePlaceId } : { location: { latLng: { latitude: branch.lat, longitude: branch.lng } } };
export async function googleLocation(action: string, origin: {lat:number;lng:number}, selected?: BranchOffice, candidates: BranchOffice[] = []) {
  const key=process.env.GOOGLE_MAPS_API_KEY;
  if(!key)throw Error("Google Maps configuration missing");
  const start={location:{latLng:{latitude:origin.lat,longitude:origin.lng}}};
  const call=async(endpoint:string,body:unknown,mask:string)=>{const response=await fetch(`https://routes.googleapis.com/${endpoint==="computeRouteMatrix"?"distanceMatrix":"directions"}/v2:${endpoint}`,{method:"POST",headers:{"Content-Type":"application/json","X-Goog-Api-Key":key,"X-Goog-FieldMask":mask},body:JSON.stringify(body),signal:AbortSignal.timeout(15000),cache:"no-store"});if(!response.ok)throw Error("Google routing unavailable");return response.json();};
  if(action==="reverse"){
    const url=new URL("https://maps.googleapis.com/maps/api/geocode/json");url.searchParams.set("latlng",`${origin.lat},${origin.lng}`);url.searchParams.set("key",key);
    const response=await fetch(url,{signal:AbortSignal.timeout(10000),cache:"no-store"});const data=await response.json();if(data.status!=="OK")throw Error("Address lookup unavailable");return {code:"Ok",provider:"google",address:data.results?.[0]?.formatted_address||""};
  }
  if(action==="matrix"){
    const data=await call("computeRouteMatrix",{origins:[{waypoint:start}],destinations:candidates.map(branch=>({waypoint:waypoint(branch)})),travelMode:"DRIVE",routingPreference:"TRAFFIC_AWARE"},"originIndex,destinationIndex,distanceMeters,duration,status,condition");
    return {code:"Ok",provider:"google",distances:[candidates.map((_,index)=>data.find((item:any)=>item.destinationIndex===index&&item.condition==="ROUTE_EXISTS")?.distanceMeters??null)],durations:[candidates.map((_,index)=>{const item=data.find((item:any)=>item.destinationIndex===index&&item.condition==="ROUTE_EXISTS");return item?parseFloat(item.duration):null;})]};
  }
  const data=await call("computeRoutes",{origin:start,destination:waypoint(selected!),travelMode:"DRIVE",routingPreference:"TRAFFIC_AWARE",polylineEncoding:"GEO_JSON_LINESTRING"},"routes.distanceMeters,routes.duration,routes.polyline.geoJsonLinestring");
  const route=data.routes?.[0];if(!route)throw Error("No road route found");return {code:"Ok",provider:"google",branchId:selected!.id,routes:[{distance:route.distanceMeters,duration:parseFloat(route.duration),geometry:{coordinates:route.polyline.geoJsonLinestring.coordinates}}]};
}

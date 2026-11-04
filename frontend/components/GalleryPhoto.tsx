"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useState } from "react";
import type { GalleryItem } from "@/context/ContentContext";

// A missing upload is identified honestly, rather than replaced by another scene.
export default function GalleryPhoto({ photo, sizes, priority = false, className = "" }: { photo: GalleryItem; sizes: string; priority?: boolean; className?: string }) {
  const [failed, setFailed] = useState("");
  if (!photo.imageUrl || failed === photo.imageUrl) return <div role="img" aria-label={`${photo.title}: image unavailable`} className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-100 p-4 text-center text-xs text-slate-500"><ImageOff size={24} />Photo temporarily unavailable</div>;
  const optimized = photo.imageUrl.startsWith("/") && !photo.imageUrl.startsWith("//") || /^https:\/\/(www\.)?vercbd\.org\//.test(photo.imageUrl);
  const contain = photo.width && (photo.width < 400 || photo.height && photo.width / photo.height > 2);
  return <Image src={photo.imageUrl} alt={photo.title} fill sizes={sizes} priority={priority} unoptimized={!optimized || /\.svg(?:\?|$)/i.test(photo.imageUrl)} onError={() => setFailed(photo.imageUrl)} className={`${contain ? "object-contain" : "object-cover"} ${className}`} />;
}

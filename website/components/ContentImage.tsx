"use client";

import Image from "next/image";
import { useState } from "react";

// Local uploads and approved hosts use Next's responsive image pipeline. CMS URLs
// from other hosts and older data URLs remain compatible without a host allowlist.
export default function ContentImage({ src, alt, sizes, className = "object-cover", priority = false, fallback = "/assets/about_official.jpg" }: {
  src: string; alt: string; sizes: string; className?: string; priority?: boolean; fallback?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const source = !src || failedSrc === src ? fallback : src;
  const optimized = source.startsWith("/") && !source.startsWith("//") || /^https:\/\/(www\.)?vercbd\.org\//.test(source) || source.startsWith("https://images.unsplash.com/");
  return <Image src={source} alt={alt} fill sizes={sizes} priority={priority}
    unoptimized={!optimized || /\.svg(?:\?|$)/i.test(source)} className={className}
    onError={() => setFailedSrc(src)} />;
}

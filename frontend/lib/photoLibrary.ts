import source from "./data/photo-library.json";
import type { GalleryItem } from "@/context/ContentContext";

export const PHOTO_LIBRARY_VERSION = "project-photos-2026-11-05-bank";
export const photoLibrary = source as (GalleryItem & { aliases: string[] })[];
export const galleryCategories = ["Education", "WASH", "Livelihood", "Capacity Building", "Health", "Events"] as const;
export const galleryCategoryLabel = (category: string) => category === "WASH" ? "Water & sanitation" : category === "Events" ? "Community & events" : category;

const legacySamples = [
  ["gal-1", "Joyful Early Childhood Learning Session", "/assets/edu_1.png"],
  ["gal-2", "Community Total Sanitation Declaration", "/assets/wash_hero.png"],
  ["gal-3", "Women Entrepreneurship Handicrafts Display", "/assets/microfinance_woman_hero.png"],
  ["gal-4", "Orlando Bloom Inspects Piped Water Network", "/assets/home_official_1.jpg"],
  ["gal-5", "Mother & Child Specialized Medical Checkup", "/assets/health_hero.png"],
  ["gal-6", "Arsenic-Free Deep Tubewell Commissioning", "/assets/impact_hero.png"],
];

// Import all unique project photos once. Keep genuine CMS uploads and edited
// captions; replace only the unchanged demo entries (including the missing file).
export function importPhotoLibrary(saved: GalleryItem[] = []): GalleryItem[] {
  const bankPhoto = photoLibrary.find(photo => photo.imageUrl === "/assets/southeast-bank-verc-agreement.jpg")!;
  const custom = saved.filter(item => item && !legacySamples.some(([id, title, url]) => item.id === id && item.title === title && item.imageUrl === url)).map(item =>
    item.imageUrl === "/assets/partners_hero.png" && item.title === "A collaborative planning meeting" ? { ...item, ...bankPhoto } : item
  );
  const missing = photoLibrary.filter(photo => !custom.some(item => photo.aliases.includes(item.imageUrl)));
  return [...custom, ...missing];
}

export function ensurePhotoLibrary<T extends Record<string, any>>(content: T): T {
  if (content.photoLibraryVersion === PHOTO_LIBRARY_VERSION) return content;
  return { ...content, gallery: importPhotoLibrary(Array.isArray(content.gallery) ? content.gallery : []), photoLibraryVersion: PHOTO_LIBRARY_VERSION };
}

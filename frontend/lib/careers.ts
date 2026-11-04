import type { JobOpening } from "@/context/ContentContext";

export const VERC_BDJOBS_URL = "https://bdjobs.com/h/company-insight/28456";
export const CAREERS_CONTENT_VERSION = "verified-recruitment-2026-11-05";
export function isBdjobsUrl(value?: string) {
  try { const url = new URL(value || ""); return url.protocol === "https:" && (url.hostname === "bdjobs.com" || url.hostname.endsWith(".bdjobs.com")); }
  catch { return false; }
}
export function isPublishedVacancy(job: JobOpening, today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" })) {
  return job.status === "Active" && isBdjobsUrl(job.applicationUrl) && /^\d{4}-\d{2}-\d{2}$/.test(job.deadline) && job.deadline >= today;
}
const samples: Record<string, string> = {
  "job-1": "Senior WASH Project Manager", "job-2": "Microfinance Branch Manager",
  "job-3": "Community Health & Nutrition Coordinator", "job-4": "Monitoring, Evaluation & Learning (MEL) Officer",
};
export function ensureCareers<T extends Record<string, any>>(content: T): T {
  if (content.careersContentVersion === CAREERS_CONTENT_VERSION) return content;
  return { ...content,
    jobOpenings: (Array.isArray(content.jobOpenings) ? content.jobOpenings : []).filter((job: JobOpening) => job.title !== samples[job.id]),
    jobApplications: (Array.isArray(content.jobApplications) ? content.jobApplications : []).filter((app: { id: string; email: string }) => !(app.id === "app-1" && app.email === "rafiq.wash.eng@example.com" || app.id === "app-2" && app.email === "nusrat.jahan.fin@example.com")),
    careersContentVersion: CAREERS_CONTENT_VERSION };
}

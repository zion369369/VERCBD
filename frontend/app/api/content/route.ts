import { NextResponse } from "next/server";
import { readServerContent, writeServerContent } from "@/lib/serverStorage";

import { ensureBranchDirectory, BRANCH_DIRECTORY_VERSION } from "@/lib/branchDirectory";
import { ensurePhotoLibrary, PHOTO_LIBRARY_VERSION } from "@/lib/photoLibrary";
import { ensureCareers, CAREERS_CONTENT_VERSION } from "@/lib/careers";

const migrateContent = (data: Record<string, any>) => ensureCareers(ensurePhotoLibrary(ensureBranchDirectory(data)));

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Standard headers to prevent any caching of live CMS data
const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
  "Pragma": "no-cache",
  "Expires": "0"
};

/**
 * GET /api/content
 * Returns the authoritative website content stored on the server.
 */
export async function GET() {
  try {
    let result = readServerContent();
    if (result && (result.data.branchDirectoryVersion !== BRANCH_DIRECTORY_VERSION || result.data.photoLibraryVersion !== PHOTO_LIBRARY_VERSION || result.data.careersContentVersion !== CAREERS_CONTENT_VERSION)) {
      const migrated = migrateContent(result.data);
      const saved = writeServerContent(migrated);
      result = { data: migrated, lastUpdated: saved.lastUpdated };
    }
    return NextResponse.json(
      {
        success: true,
        data: result ? result.data : null,
        lastUpdated: result ? result.lastUpdated : null
      },
      {
        status: 200,
        headers: noCacheHeaders
      }
    );
  } catch (error: any) {
    console.error("[api/content] GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to read content" },
      { status: 500, headers: noCacheHeaders }
    );
  }
}

/**
 * POST /api/content
 * Updates the global server content with new admin modifications.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid payload format" },
        { status: 400, headers: noCacheHeaders }
      );
    }

    // Merge incoming changes with existing server content to protect against accidental partial data loss
    const existing = readServerContent();
    const existingData = migrateContent(existing?.data || {});

    const mergedData = migrateContent({
      ...existingData,
      ...body,
      branchDirectoryVersion: body.branches ? body.branchDirectoryVersion : BRANCH_DIRECTORY_VERSION,
      photoLibraryVersion: body.gallery ? body.photoLibraryVersion : PHOTO_LIBRARY_VERSION,
      careersContentVersion: body.jobOpenings || body.jobApplications ? body.careersContentVersion : CAREERS_CONTENT_VERSION
    });

    // A visitor may send a new inquiry while another tab holds an older CMS
    // snapshot. Preserve messages absent from that snapshot; only explicit
    // admin deletions remove them.
    const deletedIds = new Set<string>([...(existingData.deletedMessageIds || []), ...(Array.isArray(body.deletedMessageIds) ? body.deletedMessageIds : [])].filter((id: unknown) => typeof id === "string"));
    if (Array.isArray(body.messages)) {
      const messagesById = new Map<string, any>();
      for (const message of [...(existingData.messages || []), ...body.messages]) {
        if (message && typeof message.id === "string" && !deletedIds.has(message.id)) messagesById.set(message.id, message);
      }
      mergedData.messages = Array.from(messagesById.values()).sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0));
    }
    mergedData.deletedMessageIds = Array.from(deletedIds);

    const writeResult = writeServerContent(mergedData);

    return NextResponse.json(
      {
        success: true,
        message: "Content successfully updated globally on the live server.",
        lastUpdated: writeResult.lastUpdated
      },
      {
        status: 200,
        headers: noCacheHeaders
      }
    );
  } catch (error: any) {
    console.error("[api/content] POST error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save content to server" },
      { status: 500, headers: noCacheHeaders }
    );
  }
}


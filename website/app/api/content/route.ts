import { NextResponse } from "next/server";
import { readServerContent, writeServerContent } from "@/lib/serverStorage";

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
    const result = readServerContent();
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
    const existingData = existing?.data || {};

    const mergedData = {
      ...existingData,
      ...body
    };

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

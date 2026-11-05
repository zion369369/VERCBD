import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    // Sanitize filename to prevent directory traversal
    const safeName = path.basename(filename);

    const candidates = [
      path.join(process.cwd(), "public", "uploads", safeName),
      path.join(process.cwd(), "data", "uploads", safeName)
    ];

    for (const filePath of candidates) {
      if (fs.existsSync(filePath)) {
        const buffer = fs.readFileSync(filePath);
        const ext = path.extname(safeName).toLowerCase();
        const mimeTypes: Record<string, string> = {
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".jpeg": "image/jpeg",
          ".webp": "image/webp",
          ".svg": "image/svg+xml",
          ".pdf": "application/pdf"
        };

        return new NextResponse(buffer, {
          headers: {
            "Content-Type": mimeTypes[ext] || "application/octet-stream",
            "Cache-Control": "public, max-age=31536000, immutable"
          }
        });
      }
    }

    return new NextResponse("Not Found", { status: 404 });
  } catch (err: any) {
    console.error("[api/uploads] Error serving file:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


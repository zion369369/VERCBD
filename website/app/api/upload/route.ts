import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getUploadsDir } from "@/lib/serverStorage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const uploadsDir = getUploadsDir();

    // Clean and sanitize file name
    const originalName = file.name || "upload.bin";
    const extension = path.extname(originalName) || ".bin";
    const baseName = path.basename(originalName, extension)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 40);

    const uniqueFileName = `${Date.now()}_${baseName}${extension}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let destinationPath = path.join(uploadsDir, uniqueFileName);
    let publicUrl = `/uploads/${uniqueFileName}`;

    try {
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true, mode: 0o777 });
      }
      try { fs.chmodSync(uploadsDir, 0o777); } catch (_) {}
      fs.writeFileSync(destinationPath, buffer);
    } catch (writeErr: any) {
      console.warn("[api/upload] public/uploads write failed, trying data/uploads fallback:", writeErr.message);
      // Fallback: write to data/uploads which is guaranteed writable on cPanel
      const fallbackDir = path.join(process.cwd(), "data", "uploads");
      if (!fs.existsSync(fallbackDir)) {
        fs.mkdirSync(fallbackDir, { recursive: true, mode: 0o777 });
      }
      try { fs.chmodSync(fallbackDir, 0o777); } catch (_) {}
      destinationPath = path.join(fallbackDir, uniqueFileName);
      fs.writeFileSync(destinationPath, buffer);
      publicUrl = `/api/uploads/${uniqueFileName}`;
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      size: file.size
    });
  } catch (error: any) {
    console.error("[api/upload] Error uploading file:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}

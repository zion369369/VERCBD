import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { readServerContent, writeServerContent } from "@/lib/serverStorage";
import { ensureBranchDirectory } from "@/lib/branchDirectory";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (Number(request.headers.get("content-length")) > 20000) return NextResponse.json({ success: false, error: "Your message is too long." }, { status: 413 });
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ success: false, error: "Please provide your contact details." }, { status: 400 });
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "General inquiry";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200 || !message || message.length > 5000 || subject.length > 100 || phone.length > 40) {
      return NextResponse.json({ success: false, error: "Please provide your name, a valid email address, and a message of up to 5,000 characters." }, { status: 400 });
    }
    const data = ensureBranchDirectory(readServerContent()?.data || {});
    const branch = body.branchId ? data.branches.find((office: { id: string }) => office.id === body.branchId) : null;
    if (body.branchId && !branch) return NextResponse.json({ success: false, error: "Please select an office from the current directory." }, { status: 400 });
    const id = typeof body.submissionId === "string" && /^[a-zA-Z0-9-]{8,80}$/.test(body.submissionId) ? `msg-${body.submissionId}` : `msg-${randomUUID()}`;
    const existingMessages = Array.isArray(data.messages) ? data.messages : [];
    if (!existingMessages.some((entry: { id: string }) => entry.id === id)) {
      writeServerContent({ ...data, messages: [{ id, name, email, phone, subject: branch ? `${subject} · ${branch.name} (#${branch.code || branch.id})` : subject, message, branchId: branch?.id, date: new Date().toISOString(), status: "Unread" }, ...existingMessages] });
    }
    return NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof SyntaxError) return NextResponse.json({ success: false, error: "Invalid message format." }, { status: 400 });
    return NextResponse.json({ success: false, error: "We could not save your message. Please try again or contact the head office directly." }, { status: 500 });
  }
}

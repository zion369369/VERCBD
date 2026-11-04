import { NextResponse } from "next/server";
import { readServerAuth, writeServerAuth } from "@/lib/serverStorage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  "Pragma": "no-cache",
  "Expires": "0"
};

export async function GET() {
  try {
    const authData = readServerAuth();
    return NextResponse.json(
      {
        success: true,
        users: authData.users,
        roles: authData.roles
      },
      {
        status: 200,
        headers: noCacheHeaders
      }
    );
  } catch (error: any) {
    console.error("[api/auth/users] GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: noCacheHeaders }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { users, roles } = body || {};

    writeServerAuth(users, roles);

    return NextResponse.json(
      {
        success: true,
        message: "Auth data successfully persisted on server"
      },
      {
        status: 200,
        headers: noCacheHeaders
      }
    );
  } catch (error: any) {
    console.error("[api/auth/users] POST error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: noCacheHeaders }
    );
  }
}


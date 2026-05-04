import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const delay = 700 + Math.floor(Math.random() * 500);
  await new Promise((r) => setTimeout(r, delay));

  return NextResponse.json(
    { error: "invalid_credentials" },
    { status: 401, headers: { "cache-control": "no-store" } }
  );
}

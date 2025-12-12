import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const runtime = "nodejs";

export async function GET() {
  const start = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, ms: Date.now() - start });
  } catch (err) {
    console.error("[db-health]", err);
    return NextResponse.json(
      { 
        ok: false, 
        ms: Date.now() - start,
        error: err instanceof Error ? err.message : String(err) 
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '@lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const settings = await prisma.setting.findMany();
  return NextResponse.json({ settings });
}

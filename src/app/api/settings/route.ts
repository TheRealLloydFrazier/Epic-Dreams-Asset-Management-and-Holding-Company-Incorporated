import { NextResponse } from 'next/server';
import { prisma } from '@lib/db/prisma';

export async function GET() {
  const settings = await prisma.setting.findMany();
  return NextResponse.json({ settings });
}

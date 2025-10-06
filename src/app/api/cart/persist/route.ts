import { NextResponse } from 'next/server';
import { prisma } from '@lib/db/prisma';

export async function POST(request: Request) {
  const payload = await request.json();
  await prisma.setting.upsert({
    where: { key: 'cart:last' },
    create: { key: 'cart:last', value: payload },
    update: { value: payload }
  });
  return NextResponse.json({ success: true });
}

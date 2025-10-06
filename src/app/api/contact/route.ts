import { NextResponse } from 'next/server';
import { prisma } from '@lib/db/prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const email = body.email as string | undefined;
  const message = body.message as string | undefined;
  const type = (body.type as string | undefined) ?? 'contact';

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const key = `inbox:${Date.now()}`;
  await prisma.setting.upsert({
    where: { key },
    create: {
      key,
      value: {
        email,
        message,
        type
      }
    },
    update: {}
  });

  return NextResponse.json({ success: true });
}

import { NextResponse } from 'next/server';
import { getAdminSession } from '@lib/auth/session';

export const dynamic = 'force-dynamic';

export async function POST() {
  const session = await getAdminSession();
  await session.destroy();
  return NextResponse.json({ success: true });
}

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@lib/db/prisma';
import { getAdminSession } from '@lib/auth/session';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const session = await getAdminSession();
  session.adminId = admin.id;
  session.mustChangePassword = admin.mustChangePassword;
  await session.save();

  return NextResponse.json({ success: true, mustChangePassword: admin.mustChangePassword });
}

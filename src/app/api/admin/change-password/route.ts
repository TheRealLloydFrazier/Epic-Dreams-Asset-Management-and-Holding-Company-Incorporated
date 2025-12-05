import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@lib/db/prisma';
import { getAdminSession } from '@lib/auth/session';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session.adminId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { currentPassword, newPassword } = await request.json();
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
  }

  const admin = await prisma.adminUser.findUnique({ where: { id: session.adminId } });
  if (!admin) {
    return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
  }

  const valid = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await prisma.adminUser.update({
    where: { id: session.adminId },
    data: {
      passwordHash,
      mustChangePassword: false
    }
  });

  session.mustChangePassword = false;
  await session.save();

  return NextResponse.json({ success: true });
}

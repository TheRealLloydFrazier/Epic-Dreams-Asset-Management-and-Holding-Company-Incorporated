import { NextResponse } from 'next/server';
import { prisma } from '@lib/db/prisma';
import { getAdminSession } from '@lib/auth/session';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session.adminId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.product.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ success: true });
}

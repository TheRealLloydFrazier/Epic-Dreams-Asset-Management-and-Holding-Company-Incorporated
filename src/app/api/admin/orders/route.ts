import { NextResponse } from 'next/server';
import { prisma } from '@lib/db/prisma';
import { getAdminSession } from '@lib/auth/session';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getAdminSession();
  if (!session.adminId || session.mustChangePassword) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const orders = await prisma.order.findMany({ include: { items: true } });
  const header = 'id,email,status,total_cents,created_at\n';
  const rows = orders
    .map((order) => `${order.id},${order.email},${order.status},${order.totalCents},${order.createdAt.toISOString()}`)
    .join('\n');

  return new NextResponse(header + rows, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="orders.csv"'
    }
  });
}

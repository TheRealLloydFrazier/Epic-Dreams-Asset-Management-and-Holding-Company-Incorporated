import { NextResponse } from 'next/server';
import { prisma } from '@lib/db/prisma';
import { getAdminSession } from '@lib/auth/session';
import { z } from 'zod';

const UpdateSchema = z.object({
  status: z.string().optional(),
  trackingNumber: z.string().optional()
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session.adminId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id: Number(params.id) },
    data: {
      status: parsed.data.status as any,
      trackingNumber: parsed.data.trackingNumber
    }
  });

  return NextResponse.json({ success: true, order });
}

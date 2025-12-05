import { redirect } from 'next/navigation';
import { getAdminSession } from '@lib/auth/session';
import { AdminShell } from '@components/admin/AdminShell';
import { prisma } from '@lib/db/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session.adminId) {
    return <AdminShell.Unauthenticated />;
  }

  if (session.mustChangePassword) {
    return <AdminShell.ChangePassword />;
  }

  const [products, orders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count()
  ]);

  return <AdminShell.Dashboard stats={{ products, orders }} />;
}

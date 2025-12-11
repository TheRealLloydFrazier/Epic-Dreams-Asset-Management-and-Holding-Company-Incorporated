import { prisma } from '@lib/db/prisma';
import { formatCurrency } from '@lib/utils/styles';
import { getAdminSession } from '@lib/auth/session';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const session = await getAdminSession();
  if (!session.adminId) {
    redirect('/admin');
  }

  const orders = await prisma.order.findMany({
    include: { items: { include: { variant: { include: { product: true } } } } },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Orders</h1>
        <a
          href="/api/admin/orders"
          className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 hover:border-accent-teal hover:text-white"
        >
          Export CSV
        </a>
      </div>
      <p className="mt-2 text-sm text-white/60">Track fulfillment statuses and update tracking numbers.</p>
      <div className="mt-8 space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">Order #{order.id}</p>
                <p className="text-xs text-white/50">{order.email}</p>
              </div>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
                {order.status}
              </span>
              <p className="text-sm text-white/70">{formatCurrency(order.totalCents)}</p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              {order.items.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                  <p className="text-white">{item.title}</p>
                  <p className="text-xs text-white/50">
                    {item.quantity} × {formatCurrency(item.priceCents)} — {item.sku}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { prisma } from '@lib/db/prisma';
import { formatCurrency } from '@lib/utils/styles';
import { getAdminSession } from '@lib/auth/session';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

type DiscountRecord = {
  id: number;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  startsAt: Date | null;
  endsAt: Date | null;
};

export default async function AdminDiscountsPage() {
  const session = await getAdminSession();
  if (!session.adminId || session.mustChangePassword) {
    redirect('/admin');
  }

  const discounts = (await prisma.discount.findMany({ orderBy: { startsAt: 'desc' } })) as DiscountRecord[];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-white">Discount Codes</h1>
      <p className="mt-2 text-sm text-white/60">Create campaigns for percentage or fixed promotions.</p>
      <div className="mt-8 space-y-4">
        {discounts.map((discount) => (
          <div key={discount.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-accent-teal">
                {discount.code}
              </span>
              <p className="text-sm text-white/70">
                {discount.type === 'percentage' ? `${discount.value}% off` : `${formatCurrency(discount.value)} off`}
              </p>
              <p className="text-xs text-white/50">
                {discount.startsAt ? new Date(discount.startsAt).toLocaleDateString() : 'No start'} —
                {discount.endsAt ? new Date(discount.endsAt).toLocaleDateString() : 'No end'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

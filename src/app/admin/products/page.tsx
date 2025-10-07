import Link from 'next/link';
import { prisma } from '@lib/db/prisma';
import { getAdminSession } from '@lib/auth/session';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const session = await getAdminSession();
  if (!session.adminId) {
    redirect('/admin');
  }

  const products = await prisma.product.findMany({
    include: { variants: true },
    orderBy: { updatedAt: 'desc' }
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Products</h1>
          <p className="text-sm text-white/60">Manage catalog, signed variants, and inventory.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/api/admin/products/export"
            className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 hover:border-accent-teal hover:text-white"
          >
            Export CSV
          </Link>
          <Link
            href="/admin/products/new"
            className="rounded-full bg-accent-teal px-4 py-2 text-xs uppercase tracking-[0.3em] text-black"
          >
            New Product
          </Link>
        </div>
      </div>
      <div className="mt-10 overflow-hidden rounded-3xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm text-white/70">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.3em] text-white/60">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Variants</th>
              <th className="px-4 py-3">Inventory</th>
              <th className="px-4 py-3">Signed</th>
              <th className="px-4 py-3">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-white/5">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-white">{product.title}</span>
                    <span className="text-xs text-white/50">/{product.slug}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{product.variants.length}</td>
                <td className="px-4 py-3">
                  {product.variants.reduce((sum, variant) => sum + variant.inventory, 0)}
                </td>
                <td className="px-4 py-3">
                  {product.variants.some((variant) => variant.signed) ? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-3">
                  {product.updatedAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

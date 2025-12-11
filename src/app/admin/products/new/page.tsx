import { getAdminSession } from '@lib/auth/session';
import { redirect } from 'next/navigation';

export default async function NewProductPage() {
  const session = await getAdminSession();
  if (!session.adminId) {
    redirect('/admin');
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-white">Create Product</h1>
      <p className="mt-2 text-sm text-white/60">
        Product creation via UI is coming soon. Use the CSV export/import flow or the API endpoint `/api/admin/products` to add
        new items.
      </p>
      <pre className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
        <code>
{`POST /api/admin/products
{
  "title": "Epic Dreams Crewneck",
  "slug": "epic-dreams-crewneck",
  "description": "Premium heavyweight crewneck with tonal embroidery.",
  "variants": [
    { "name": "Black / M", "sku": "CREW-BLK-M", "priceCents": 6800, "inventory": 20 }
  ],
  "images": ["https://..."]
}`}
        </code>
      </pre>
    </div>
  );
}

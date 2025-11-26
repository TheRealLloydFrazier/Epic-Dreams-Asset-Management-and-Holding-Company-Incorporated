import { NextResponse } from 'next/server';
import { prisma } from '@lib/db/prisma';
import { getAdminSession } from '@lib/auth/session';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getAdminSession();
  if (!session.adminId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const products = await prisma.product.findMany({ include: { variants: true } });
  const header = 'id,title,slug,variant,sku,price_cents,inventory,signed\n';
  const rows = products
    .flatMap((product) =>
      product.variants.map((variant) =>
        [
          product.id,
          JSON.stringify(product.title),
          product.slug,
          JSON.stringify(variant.name),
          variant.sku,
          variant.priceCents,
          variant.inventory,
          variant.signed
        ].join(',')
      )
    )
    .join('\n');

  return new NextResponse(header + rows, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="products.csv"'
    }
  });
}

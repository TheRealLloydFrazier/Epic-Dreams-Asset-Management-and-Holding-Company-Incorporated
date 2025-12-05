import { NextResponse } from 'next/server';
import { prisma } from '@lib/db/prisma';
import { getAdminSession } from '@lib/auth/session';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const VariantSchema = z.object({
  name: z.string(),
  sku: z.string(),
  priceCents: z.number(),
  inventory: z.number(),
  signed: z.boolean().optional(),
  attributes: z.record(z.any()).optional()
});

const ProductSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  featured: z.boolean().optional(),
  images: z.array(z.string()).default([]),
  variants: z.array(VariantSchema)
});

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session.adminId || session.mustChangePassword) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = ProductSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      title: parsed.data.title,
      slug: parsed.data.slug,
      description: parsed.data.description,
      featured: parsed.data.featured ?? false,
      images: {
        create: parsed.data.images.map((url, index) => ({ url, sortOrder: index }))
      },
      variants: {
        create: parsed.data.variants.map((variant) => ({
          name: variant.name,
          sku: variant.sku,
          priceCents: variant.priceCents,
          inventory: variant.inventory,
          signed: variant.signed ?? false,
          attributes: variant.attributes ?? {}
        }))
      }
    }
  });

  return NextResponse.json({ success: true, product });
}

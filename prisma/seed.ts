import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.collectionProduct.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.productArtist.deleteMany();
  await prisma.product.deleteMany();
  await prisma.discount.deleteMany();
  await prisma.release.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.post.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.adminSession.deleteMany();
  await prisma.adminUser.deleteMany();

  const artist = await prisma.artist.create({
    data: {
      name: 'Kelly Layton',
      slug: 'kelly-layton',
      bio: 'Kelly Layton crafts nocturnal dreamscapes that blend synthwave and neo-soul. This is a placeholder bio for demo purposes.',
      socials: {
        instagram: 'https://instagram.com/kellylayton',
        youtube: 'https://youtube.com/@kellylayton',
        tiktok: 'https://tiktok.com/@kellylayton'
      },
      heroImage: 'https://images.unsplash.com/photo-1521337580396-0259d59d6b47?auto=format&fit=crop&w=1600&q=80'
    }
  });

  const release = await prisma.release.create({
    data: {
      title: 'Empty Chair Blues',
      slug: 'empty-chair-blues',
      releaseDate: new Date('2024-05-01T00:00:00Z'),
      coverImage: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=1200&q=80',
      tracks: [
        { title: 'Empty Chair Blues', duration: '3:42' },
        { title: 'Neon Harbor', duration: '4:11' },
        { title: 'Dream Logic', duration: '3:57' }
      ],
      links: {
        spotify: 'https://open.spotify.com',
        appleMusic: 'https://music.apple.com'
      },
      artistId: artist.id
    }
  });

  const products = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const tee = await tx.product.create({
      data: {
        title: 'Epic Dreams Signature Tee',
        slug: 'epic-dreams-signature-tee',
        description: 'Premium 6.1oz cotton tee featuring the Epic Dreams Entertainment sigil in electric teal. Soft, durable, and built for the stage.',
        featured: true,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80',
              sortOrder: 0
            }
          ]
        },
        variants: {
          create: [
            {
              name: 'Black / S',
              sku: 'TEE-BLK-S',
              priceCents: 3200,
              inventory: 25,
              attributes: { size: 'S', color: 'Black' }
            },
            {
              name: 'Black / M',
              sku: 'TEE-BLK-M',
              priceCents: 3200,
              inventory: 35,
              attributes: { size: 'M', color: 'Black' }
            },
            {
              name: 'Black / L',
              sku: 'TEE-BLK-L',
              priceCents: 3200,
              inventory: 32,
              attributes: { size: 'L', color: 'Black' }
            },
            {
              name: 'Black / XL Signed',
              sku: 'TEE-BLK-XL-SIGNED',
              priceCents: 4800,
              inventory: 10,
              signed: true,
              attributes: { size: 'XL', color: 'Black', signed: true }
            }
          ]
        }
      }
    });

    const hoodie = await tx.product.create({
      data: {
        title: 'Midnight Pulse Hoodie',
        slug: 'midnight-pulse-hoodie',
        description: 'Heavyweight fleece hoodie with oversized front print and luminous violet sleeve hits. Perfect for late-night sessions.',
        featured: true,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80',
              sortOrder: 0
            }
          ]
        },
        variants: {
          create: [
            {
              name: 'Black / M',
              sku: 'HOOD-BLK-M',
              priceCents: 6800,
              inventory: 20,
              attributes: { size: 'M', color: 'Black' }
            },
            {
              name: 'Black / L',
              sku: 'HOOD-BLK-L',
              priceCents: 6800,
              inventory: 18,
              attributes: { size: 'L', color: 'Black' }
            },
            {
              name: 'Black / XL Signed',
              sku: 'HOOD-BLK-XL-SIGNED',
              priceCents: 8800,
              inventory: 5,
              signed: true,
              attributes: { size: 'XL', color: 'Black', signed: true }
            }
          ]
        }
      }
    });

    const poster = await tx.product.create({
      data: {
        title: 'Empty Chair Blues Poster',
        slug: 'empty-chair-blues-poster',
        description: '18x24 museum-grade poster featuring the Empty Chair Blues artwork. Includes a digital download QR code.',
        featured: false,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
              sortOrder: 0
            }
          ]
        },
        variants: {
          create: [
            {
              name: 'Standard Edition',
              sku: 'POST-EMPTY-STD',
              priceCents: 2600,
              inventory: 40,
              attributes: { size: '18x24', finish: 'Matte' }
            },
            {
              name: 'Signed Edition',
              sku: 'POST-EMPTY-SIGNED',
              priceCents: 4600,
              inventory: 8,
              signed: true,
              attributes: { size: '18x24', finish: 'Matte', signed: true }
            }
          ]
        }
      }
    });

    const hat = await tx.product.create({
      data: {
        title: 'Neon Crest Snapback',
        slug: 'neon-crest-snapback',
        description: 'Structured snapback with 3D embroidered Epic Dreams crest and teal underbill.',
        featured: false,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1400&q=80',
              sortOrder: 0
            }
          ]
        },
        variants: {
          create: [
            {
              name: 'One Size',
              sku: 'HAT-NEON-OS',
              priceCents: 3600,
              inventory: 50,
              attributes: { size: 'OS', color: 'Black' }
            }
          ]
        }
      }
    });

    const sticker = await tx.product.create({
      data: {
        title: 'Dream Glyph Sticker Pack',
        slug: 'dream-glyph-sticker-pack',
        description: 'Five-pack of holographic stickers featuring Epic Dreams glyphs.',
        featured: false,
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=1200&q=80',
              sortOrder: 0
            }
          ]
        },
        variants: {
          create: [
            {
              name: '5 Pack',
              sku: 'STICKER-GLYPH-5',
              priceCents: 1200,
              inventory: 100,
              attributes: { quantity: 5 }
            }
          ]
        }
      }
    });

    return { tee, hoodie, poster, hat, sticker };
  });

  await prisma.collection.createMany({
    data: [
      { title: 'Tees', slug: 'tees' },
      { title: 'Hoodies', slug: 'hoodies' },
      { title: 'Hats', slug: 'hats' },
      { title: 'Posters', slug: 'posters' },
      { title: 'Stickers', slug: 'stickers' },
      { title: 'Signed', slug: 'signed' }
    ]
  });

  const collections = await prisma.collection.findMany();
  const collectionMap = Object.fromEntries(
    collections.map((collection: { slug: string; id: number }) => [collection.slug, collection.id])
  );

  const allProducts = await prisma.product.findMany({ include: { variants: true } });

  for (const product of allProducts) {
    const tags: string[] = [];
    if (product.slug.includes('tee')) tags.push('tees');
    if (product.slug.includes('hoodie')) tags.push('hoodies');
    if (product.slug.includes('poster')) tags.push('posters');
    if (product.slug.includes('hat')) tags.push('hats');
    if (product.slug.includes('sticker')) tags.push('stickers');
    if (product.variants.some((variant: { signed: boolean }) => variant.signed)) tags.push('signed');

    for (const tag of tags) {
      const collectionId = collectionMap[tag];
      if (!collectionId) continue;
      await prisma.collectionProduct.upsert({
        where: {
          collectionId_productId: {
            collectionId,
            productId: product.id
          }
        },
        create: {
          collectionId,
          productId: product.id
        },
        update: {}
      });
    }

    await prisma.productArtist.upsert({
      where: {
        productId_artistId: {
          productId: product.id,
          artistId: artist.id
        }
      },
      create: {
        productId: product.id,
        artistId: artist.id
      },
      update: {}
    });
  }

  await prisma.discount.createMany({
    data: [
      {
        code: 'DREAM10',
        type: 'percentage',
        value: 10,
        startsAt: new Date(),
        usageLimit: 500
      },
      {
        code: 'FREESHIP',
        type: 'fixed',
        value: 500,
        startsAt: new Date(),
        usageLimit: 100
      }
    ]
  });

  await prisma.post.createMany({
    data: [
      {
        title: 'Why Limited Drops Boost Merch Sales',
        slug: 'why-limited-drops-boost-merch-sales',
        excerpt: 'Scarcity drives demand—discover how timed drops fuel the Epic Dreams community.',
        content: '# Why Limited Drops Boost Merch Sales\n\nLimited drops create anticipation and community moments. Use them to power up your merch releases.',
        heroImage: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80',
        publishedAt: new Date()
      },
      {
        title: 'How to Care for Printed Tees',
        slug: 'how-to-care-for-printed-tees',
        excerpt: 'Keep your fits fresh with these quick care tips for printed tees.',
        content: '# How to Care for Printed Tees\n\nTurn inside out, wash cold, hang dry. Your merch will thank you.',
        heroImage: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=80',
        publishedAt: new Date()
      }
    ]
  });

  await prisma.setting.createMany({
    data: [
      {
        key: 'shipping',
        value: {
          domestic_standard_cents: 500,
          domestic_expedited_cents: 1500,
          international_flat_cents: 2500
        }
      },
      {
        key: 'tax',
        value: {
          enabled: false,
          default_rate_percent: 8.5
        }
      },
      {
        key: 'analytics',
        value: {
          provider: 'plausible',
          plausible_domain: '',
          ga4_measurement_id: ''
        }
      },
      {
        key: 'setup_checklist',
        value: {
          stripe: 'Connect STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET',
          smtp: 'Configure SMTP credentials to enable transactional emails',
          analytics: 'Provide Plausible or GA4 identifiers',
          shipping: 'Review shipping rates in Settings > Shipping'
        }
      }
    ]
  });

  const passwordHash = await bcrypt.hash('ChangeMe123!', 12);
  await prisma.adminUser.create({
    data: {
      email: 'admin@epicdreamsent.com',
      passwordHash,
      mustChangePassword: true
    }
  });

  console.log('Seed data created successfully. Admin: admin@epicdreamsent.com / ChangeMe123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

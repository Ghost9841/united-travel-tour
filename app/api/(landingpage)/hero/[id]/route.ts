
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

// Next.js 15+: params is a Promise
type Params = { params: Promise<{ id: string }> };

function parseId(raw: string): number | null {
  const n = parseInt(raw, 10);
  return isNaN(n) ? null : n;
}

// GET /api/offers/carouselimages/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const { id: rawId } = await params;
  const id = parseId(rawId);

  if (!id) {
    return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const image = await prisma.landingHeroCarouselImage.findUnique({ where: { id } });

    if (!image) {
      return NextResponse.json({ success: false, error: 'Image not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: image });
  } catch (error) {
    console.error(`[GET /api/hero/${rawId}]`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id: rawId } = await params;
  const id = parseId(rawId);

  if (!id) {
    return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const body = await req.json();

    const data: Record<string, unknown> = {};
    if (body.src    !== undefined) data.src    = body.src.trim();
    if (body.alt    !== undefined) data.alt    = body.alt.trim();
    if (body.order  !== undefined) data.order  = Number(body.order);
    if (body.status !== undefined) data.status = body.status;

    const image = await prisma.landingHeroCarouselImage.update({ where: { id }, data });

    return NextResponse.json({ success: true, data: image });
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Image not found' }, { status: 404 });
    }
    console.error(`[PUT /api/hero/${rawId}]`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to update image' },
      { status: 500 }
    );
  }
}

// DELETE /api/offers/carouselimages/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id: rawId } = await params;
  const id = parseId(rawId);

  if (!id) {
    return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });
  }

  try {
    await prisma.landingHeroCarouselImage.delete({ where: { id } });

    return NextResponse.json({ success: true, data: { id } });
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Image not found' }, { status: 404 });
    }
    console.error(`[DELETE /api/hero/${rawId}]`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
// app/api/special-offers/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { UpdateSpecialOfferInput } from '@/types/special-offer';

type Params = { params: { id: string } };

function parseId(raw: string): number | null {
  const n = parseInt(raw, 10);
  return isNaN(n) ? null : n;
}

// GET /api/special-offers/[id]  — fetch single offer
export async function GET(_req: NextRequest, { params }: Params) {
  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const offer = await prisma.specialOffer.findUnique({ where: { id } });

    if (!offer) {
      return NextResponse.json({ success: false, error: 'Offer not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: offer });
  } catch (error) {
    console.error(`[GET /api/special-offers/${params.id}]`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch offer' },
      { status: 500 }
    );
  }
}

// PUT /api/special-offers/[id]  — update an offer
export async function PUT(req: NextRequest, { params }: Params) {
  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const body: UpdateSpecialOfferInput = await req.json();

    // Build only the fields that were actually sent
    const data: Record<string, unknown> = {};
    if (body.title       !== undefined) data.title           = body.title.trim();
    if (body.description !== undefined) data.description     = body.description.trim();
    if (body.location    !== undefined) data.location        = body.location.trim();
    if (body.price       !== undefined) data.price           = Number(body.price);
    if (body.discountedPrice !== undefined) data.discountedPrice = Number(body.discountedPrice);
    if (body.image       !== undefined) data.image           = body.image.trim();
    if (body.rating      !== undefined) data.rating          = Number(body.rating);
    if (body.status      !== undefined) data.status          = body.status;
    if (body.views       !== undefined) data.views           = Number(body.views);
    if (body.likes       !== undefined) data.likes           = Number(body.likes);

    const offer = await prisma.specialOffer.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, data: offer });
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Offer not found' }, { status: 404 });
    }
    console.error(`[PUT /api/special-offers/${params.id}]`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to update offer' },
      { status: 500 }
    );
  }
}

// DELETE /api/special-offers/[id]  — remove an offer
export async function DELETE(_req: NextRequest, { params }: Params) {
  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });
  }

  try {
    await prisma.specialOffer.delete({ where: { id } });

    return NextResponse.json({ success: true, data: { id } });
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Offer not found' }, { status: 404 });
    }
    console.error(`[DELETE /api/special-offers/${params.id}]`, error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete offer' },
      { status: 500 }
    );
  }
}
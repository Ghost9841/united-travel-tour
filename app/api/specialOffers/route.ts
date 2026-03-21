// app/api/special-offers/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { CreateSpecialOfferInput } from '@/types/special-offer';

// GET /api/special-offers  — list all offers (optionally filter by status)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status'); // 'active' | 'draft' | null

    const offers = await prisma.specialOffer.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: offers });
  } catch (error) {
    console.error('[GET /api/special-offers]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch special offers' },
      { status: 500 }
    );
  }
}

// POST /api/special-offers  — create a new offer
export async function POST(req: NextRequest) {
  try {
    const body: CreateSpecialOfferInput = await req.json();

    if (!body.title?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }
    if (!body.description?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Description is required' },
        { status: 400 }
      );
    }

    const offer = await prisma.specialOffer.create({
      data: {
        title:           body.title.trim(),
        description:     body.description.trim(),
        location:        body.location?.trim()  ?? '',
        price:           body.price            ?? 0,
        discountedPrice: body.discountedPrice  ?? 0,
        image:           body.image?.trim()    ?? '',
        rating:          body.rating           ?? 5,
        status:          body.status           ?? 'active',
        views:           body.views            ?? 0,
        likes:           body.likes            ?? 0,
      },
    });

    return NextResponse.json({ success: true, data: offer }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/special-offers]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create special offer' },
      { status: 500 }
    );
  }
}
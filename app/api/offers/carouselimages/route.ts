// app/api/offers/carouselimages/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

// GET /api/offers/carouselimages  — list all (optionally filter by status)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const images = await prisma.carouselImage.findMany({
      where: status ? { status } : undefined,
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error('[GET /api/offers/carouselimages]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch carousel images' },
      { status: 500 }
    );
  }
}

// POST /api/offers/carouselimages  — create a new image
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.src?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Image URL (src) is required' },
        { status: 400 }
      );
    }

    const image = await prisma.carouselImage.create({
      data: {
        src:    body.src.trim(),
        alt:    body.alt?.trim()    ?? '',
        order:  body.order          ?? 0,
        status: body.status         ?? 'active',
      },
    });

    return NextResponse.json({ success: true, data: image }, { status: 201 });
  } catch (error) {
    console.error('[POST /api/offers/carouselimages]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create carousel image' },
      { status: 500 }
    );
  }
}
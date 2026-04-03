import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { ApiResponse } from '../../types';
import { OngoingFare } from '@prisma/client';

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<OngoingFare[]>>> {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get('status');

    const fares = await prisma.ongoingFare.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: fares });
  } catch (error) {
    console.error('Error fetching ongoing fares:', error);
    return NextResponse.json({ success: false, data: [], error: 'Failed to fetch ongoing fares' }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<OngoingFare>>> {
  try {
    const body = await req.json();

    if (!body.title?.trim() || !body.description?.trim() || !body.image?.trim()) {
      return NextResponse.json({ success: false, error: 'Missing required fields', data: undefined }, { status: 400 });
    }

    const fare = await prisma.ongoingFare.create({
      data: {
        title: body.title.trim(),
        description: body.description.trim(),
        originalPrice: body.originalPrice?.trim() ?? '',
        discountedPrice: body.discountedPrice?.trim() ?? '',
        discount: body.discount?.trim() ?? '',
        image: body.image.trim(),
        alt: body.alt?.trim() ?? '',
        departure: body.departure?.trim() ?? '',
        arrival: body.arrival?.trim() ?? '',
        expires: body.expires?.trim() ?? '',
        status: body.status?.trim() ?? 'active',
      },
    });

    return NextResponse.json({ success: true, data: fare }, { status: 201 });
  } catch (error) {
    console.error('Error creating ongoing fare:', error);
    return NextResponse.json({ success: false, data: undefined, error: 'Failed to create ongoing fare' }, { status: 500 });
  }
}

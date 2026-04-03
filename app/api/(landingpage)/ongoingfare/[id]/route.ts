import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { OngoingFare } from '@prisma/client';
import { ApiResponse } from '@/app/api/types';

function parseId(params: Promise<{ id: string }>): Promise<number> {
  return params.then((p) => {
    const id = Number(p.id);
    if (Number.isNaN(id)) throw new Error('INVALID_ID');
    return id;
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<OngoingFare>>> {
  try {
    const id = await parseId(params);
    const fare = await prisma.ongoingFare.findUnique({ where: { id } });

    if (!fare) {
      return NextResponse.json({ success: false, data: undefined, error: 'Ongoing fare not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: fare });
  } catch (error) {
    if ((error as Error).message === 'INVALID_ID') {
      return NextResponse.json({ success: false, data: undefined, error: 'Invalid id' }, { status: 400 });
    }
    console.error('Error fetching ongoing fare:', error);
    return NextResponse.json({ success: false, data: undefined, error: 'Failed to fetch ongoing fare' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<OngoingFare>>> {
  try {
    const id = await parseId(params);
    const body = await req.json();

    const fare = await prisma.ongoingFare.update({
      where: { id },
      data: {
        title: body.title?.trim(),
        description: body.description?.trim(),
        originalPrice: body.originalPrice?.trim(),
        discountedPrice: body.discountedPrice?.trim(),
        discount: body.discount?.trim(),
        image: body.image?.trim(),
        alt: body.alt?.trim(),
        departure: body.departure?.trim(),
        arrival: body.arrival?.trim(),
        expires: body.expires?.trim(),
        status: body.status?.trim(),
      },
    });

    return NextResponse.json({ success: true, data: fare });
  } catch (error) {
    if ((error as Error).message === 'INVALID_ID') {
      return NextResponse.json({ success: false, data: undefined, error: 'Invalid id' }, { status: 400 });
    }

    console.error('Error updating ongoing fare:', error);
    if ((error as any)?.code === 'P2025') {
      return NextResponse.json({ success: false, data: undefined, error: 'Ongoing fare not found' }, { status: 404 });
    }
    return NextResponse.json({ success: false, data: undefined, error: 'Failed to update ongoing fare' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const id = await parseId(params);
    await prisma.ongoingFare.delete({ where: { id } });
    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    if ((error as Error).message === 'INVALID_ID') {
      return NextResponse.json({ success: false, data: null, error: 'Invalid id' }, { status: 400 });
    }

    console.error('Error deleting ongoing fare:', error);
    if ((error as any)?.code === 'P2025') {
      return NextResponse.json({ success: false, data: null, error: 'Ongoing fare not found' }, { status: 404 });
    }
    return NextResponse.json({ success: false, data: null, error: 'Failed to delete ongoing fare' }, { status: 500 });
  }
}

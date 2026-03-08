import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { Destination } from "@prisma/client";
import { ApiResponse } from "../../types";



export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<Destination>>> {
  try {
    const { id } = await params;
    const destinationId = Number(id);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Invalid destination ID' },
        { status: 400 }
      );
    }

    const destination = await prisma.destination.findUnique({
      where: { id: destinationId },
    });

    if (!destination) {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Destination not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: destination as Destination,
    });
  } catch (error) {
    console.error('Error fetching destination:', error);
    return NextResponse.json(
      { success: false, data: undefined, error: 'Failed to fetch destination' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<Destination>>> {
  try {
    const { id } = await params;
    const destinationId = Number(id);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Invalid destination ID' },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Validation
    if (!body.name?.trim() || !body.country?.trim() || !body.description?.trim()) {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const destination = await prisma.destination.update({
      where: { id: destinationId },
      data: {
        name: body.name.trim(),
        country: body.country.trim(),
        description: body.description.trim(),
        image: body.image || '',
        price: Number(body.price) || 0,
        originalPrice: Number(body.originalPrice) || 0,
        rating: Number(body.rating) || 4.0,
        reviews: Number(body.reviews) || 0,
        duration: body.duration || '3-5 days',
        groupSize: body.groupSize || '2-4',
        category: body.category || 'Beach',
        status: body.status || 'active',
        featured: body.featured || false,
        views: Number(body.views) || 0,
        likes: Number(body.likes) || 0,
      },
    });

    return NextResponse.json({
      success: true,
      data: destination as Destination,
    });
  } catch (error) {
    console.error('Error updating destination:', error);
    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Destination not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, data: undefined, error: 'Failed to update destination' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const { id } = await params;
    const destinationId = Number(id);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, data: null, error: 'Invalid destination ID' },
        { status: 400 }
      );
    }

    await prisma.destination.delete({
      where: { id: destinationId },
    });

    return NextResponse.json({
      success: true,
      data: null,
    });
  } catch (error) {
    console.error('Error deleting destination:', error);
    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { success: false, data: null, error: 'Destination not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, data: null, error: 'Failed to delete destination' },
      { status: 500 }
    );
  }
}

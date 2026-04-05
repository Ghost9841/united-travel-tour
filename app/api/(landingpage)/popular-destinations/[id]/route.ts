import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { PopularDestination } from "@prisma/client";
import { ApiResponse } from "../../../types";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<PopularDestination>>> {
  try {
    const { id } = await params;
    const popularDestinationId = Number(id);
    if (isNaN(popularDestinationId)) {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Invalid popular destination ID' },
        { status: 400 }
      );
    }

    const popularDestination = await prisma.popularDestination.findUnique({
      where: { id: popularDestinationId },
    });

    if (!popularDestination) {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Popular destination not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: popularDestination as PopularDestination,
    });
  } catch (error) {
    console.error('Error fetching popular destination:', error);
    return NextResponse.json(
      { success: false, data: undefined, error: 'Failed to fetch popular destination' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<PopularDestination>>> {
  try {
    const { id } = await params;
    const popularDestinationId = Number(id);
    if (isNaN(popularDestinationId)) {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Invalid popular destination ID' },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Validation
    if (!body.name?.trim() || !body.location?.trim() || !body.description?.trim() || !body.src?.trim()) {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Missing required fields: name, location, description, src' },
        { status: 400 }
      );
    }

    const popularDestination = await prisma.popularDestination.update({
      where: { id: popularDestinationId },
      data: {
        name: body.name.trim(),
        location: body.location.trim(),
        description: body.description.trim(),
        src: body.src.trim(),
        alt: body.alt?.trim() || '',
        status: body.status || 'active',
      },
    });

    return NextResponse.json({
      success: true,
      data: popularDestination as PopularDestination,
    });
  } catch (error) {
    console.error('Error updating popular destination:', error);
    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Popular destination not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, data: undefined, error: 'Failed to update popular destination' },
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
    const popularDestinationId = Number(id);
    if (isNaN(popularDestinationId)) {
      return NextResponse.json(
        { success: false, data: null, error: 'Invalid popular destination ID' },
        { status: 400 }
      );
    }

    await prisma.popularDestination.delete({
      where: { id: popularDestinationId },
    });

    return NextResponse.json({
      success: true,
      data: null,
    });
  } catch (error) {
    console.error('Error deleting popular destination:', error);
    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { success: false, data: null, error: 'Popular destination not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, data: null, error: 'Failed to delete popular destination' },
      { status: 500 }
    );
  }
}

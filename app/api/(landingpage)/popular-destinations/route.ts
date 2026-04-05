import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { ApiResponse } from "../../types";
import { PopularDestination } from "@prisma/client";

export async function GET(): Promise<NextResponse<ApiResponse<PopularDestination[]>>> {
  try {
    const popularDestinations = await prisma.popularDestination.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({
      success: true,
      data: popularDestinations as PopularDestination[],
    });
  } catch (error) {
    console.error('Error fetching popular destinations:', error);
    return NextResponse.json(
      { success: false, data: [], error: 'Failed to fetch popular destinations' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request): Promise<NextResponse<ApiResponse<PopularDestination>>> {
  try {
    const body = await req.json();

    // Validation
    if (!body.name?.trim() || !body.location?.trim() || !body.description?.trim() || !body.src?.trim()) {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Missing required fields: name, location, description, src' },
        { status: 400 }
      );
    }

    const popularDestination = await prisma.popularDestination.create({
      data: {
        name: body.name.trim(),
        location: body.location.trim(),
        description: body.description.trim(),
        src: body.src.trim(),
        alt: body.alt?.trim() || '',
        status: body.status || 'active',
      },
    });

    return NextResponse.json(
      { success: true, data: popularDestination as PopularDestination },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating popular destination:', error);
    return NextResponse.json(
      { success: false, data: undefined, error: 'Failed to create popular destination' },
      { status: 500 }
    );
  }
}

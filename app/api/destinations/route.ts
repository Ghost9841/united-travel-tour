import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { ApiResponse } from "../types";
import { Destination } from "@prisma/client";


export async function GET(): Promise<NextResponse<ApiResponse<Destination[]>>> {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({
      success: true,
      data: destinations as Destination[],
    });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { success: false, data: [], error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request): Promise<NextResponse<ApiResponse<Destination>>> {
  try {
    const body = await req.json();

    // Validation
    if (!body.name?.trim() || !body.country?.trim() || !body.description?.trim()) {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const destination = await prisma.destination.create({
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

    return NextResponse.json(
      { success: true, data: destination as Destination },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating destination:', error);
    return NextResponse.json(
      { success: false, data: undefined, error: 'Failed to create destination' },
      { status: 500 }
    );
  }
}
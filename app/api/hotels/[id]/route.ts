import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import Hotel from "../types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// GET /api/hotels/[id] - Get single hotel
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Hotel>>> {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        error: "Invalid ID",
      }, { status: 400 });
    }

    const hotel = await prisma.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      return NextResponse.json({
        success: false,
        error: "Hotel not found",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    console.error("GET /hotels/[id] error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch hotel",
    }, { status: 500 });
  }
}

// PUT /api/hotels/[id] - Update hotel
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Hotel>>> {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        error: "Invalid ID",
      }, { status: 400 });
    }

    const body = await req.json();
    console.log("Received PUT data:", body);

    // Validate required fields
    const missingFields: string[] = [];
    if (!body.name) missingFields.push("name");
    if (!body.location) missingFields.push("location");
    if (!body.description) missingFields.push("description");
    if (!body.pricePerNight) missingFields.push("pricePerNight");
    if (!body.roomType) missingFields.push("roomType");
    if (!body.capacity) missingFields.push("capacity");

    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Missing required fields: ${missingFields.join(", ")}`,
      }, { status: 400 });
    }

    // Update hotel
    const updatedHotel = await prisma.hotel.update({
      where: { id },
      data: {
        name: body.name,
        location: body.location,
        description: body.description,
        pricePerNight: Number(body.pricePerNight),
        originalPrice: body.originalPrice ? Number(body.originalPrice) : Math.round(Number(body.pricePerNight) * 1.3),
        rating: body.rating ? Number(body.rating) : 4.0,
        reviews: body.reviews ? Number(body.reviews) : 0,
        image: body.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        amenities: Array.isArray(body.amenities) ? body.amenities : [],
        roomType: body.roomType,
        capacity: body.capacity,
        status: body.status || "active",
      },
    });

    console.log("Updated hotel:", updatedHotel);

    return NextResponse.json({
      success: true,
      data: updatedHotel,
    });

  } catch (error) {
    console.error("PUT /hotels/[id] error:", error);

    if (error instanceof Error && error.message.includes("Record to update not found")) {
      return NextResponse.json({
        success: false,
        error: "Hotel not found",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update hotel",
    }, { status: 500 });
  }
}

// DELETE /api/hotels/[id] - Delete hotel
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<{ deleted: boolean }>>> {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        error: "Invalid ID",
      }, { status: 400 });
    }

    await prisma.hotel.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      data: { deleted: true },
    });

  } catch (error) {
    console.error("DELETE /hotels/[id] error:", error);

    if (error instanceof Error && error.message.includes("Record to delete does not exist")) {
      return NextResponse.json({
        success: false,
        error: "Hotel not found",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete hotel",
    }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import Hotel from "./types"

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// GET /api/hotels - Get all hotels
export async function GET(): Promise<NextResponse<ApiResponse<Hotel[]>>> {
  try {
    const hotels = await prisma.hotel.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: hotels,
    });
  } catch (error) {
    console.error("GET /hotels error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch hotels",
    }, { status: 500 });
  }
}

// POST /api/hotels - Create new hotel
export async function POST(req: Request): Promise<NextResponse<ApiResponse<Hotel>>> {
  try {
    const body = await req.json();
    console.log("Received POST data:", body);

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

    // Create new hotel
    const newHotel = await prisma.hotel.create({
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

    console.log("Created hotel:", newHotel);

    return NextResponse.json({
      success: true,
      data: newHotel,
    }, { status: 201 });

  } catch (error) {
    console.error("POST /hotels error:", error);

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to create hotel",
    }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import Travel from "./types";

const filePath = path.join(process.cwd(), "@/data/travels/travels.json");

export async function GET(): Promise<NextResponse<ApiResponse<Travel[]>>> {
  try {
    const travels = await prisma.travel.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: travels,
    });
  } catch (error) {
    console.error("GET /travels error:", error);

    return NextResponse.json({
      success: false,
      error: "Failed to fetch travels",
    }, { status: 500 });
  }
}

export async function POST(req: Request): Promise<NextResponse<ApiResponse<Travel>>> {
  try {
    const body = await req.json();
    console.log("Received POST data:", body);

    // Validate required fields
    const missingFields: string[] = [];
    if (!body.title) missingFields.push("title");
    if (!body.location) missingFields.push("location");
    if (!body.description) missingFields.push("description");
    if (!body.price) missingFields.push("price");

    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Missing required fields: ${missingFields.join(", ")}`,
      }, { status: 400 });
    }

    // Create new travel
    const newTravel = await prisma.travel.create({
      data: {
        title: body.title,
        location: body.location,
        description: body.description,
        price: Number(body.price),
        originalPrice: body.originalPrice ? Number(body.originalPrice) : Math.round(Number(body.price) * 1.2),
        duration: body.duration || "3 Days / 2 Nights",
        rating: body.rating ? Number(body.rating) : 4.0,
        reviews: body.reviews ? Number(body.reviews) : 0,
        image: body.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
        category: body.category || "General",
        groupSize: body.groupSize || "2-6 people",
      },
    });

    console.log("Created travel:", newTravel);

    return NextResponse.json({
      success: true,
      data: newTravel,
    }, { status: 201 });

  } catch (error) {
    console.error("POST /travels error:", error);

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to create travel",
    }, { status: 500 });
  }
}

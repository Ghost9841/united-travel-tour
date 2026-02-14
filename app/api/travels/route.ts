import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const travels = await prisma.travel.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        travels: travels,
      },
    });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch travels",
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received POST data:", body);

    // Validate required fields
    const missingFields = [];
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

    // Create new travel in database
    const newTravel = await prisma.travel.create({
      data: {
        title: body.title,
        location: body.location,
        description: body.description,
        price: Number(body.price),
        originalPrice: Math.round(Number(body.price) * 1.2),
        duration: body.duration || "3 Days / 2 Nights",
        rating: 4.0,
        reviews: 0,
        image: body.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
        category: body.category || "General",
        groupSize: body.groupSize || "2-6 people",
      },
    });

    console.log("Created new travel:", newTravel);

    return NextResponse.json({
      success: true,
      data: {
        travels: [newTravel],
      },
    }, { status: 201 });

  } catch (error) {
    console.error("POST error details:", error);
    
    let errorMessage = "Failed to create travel";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status: 500 });
  }
}         
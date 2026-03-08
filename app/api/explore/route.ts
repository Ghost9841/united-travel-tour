import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { ExplorePage } from "@prisma/client";
import { ApiResponse } from "../types";

export async function GET(): Promise<NextResponse<ApiResponse<ExplorePage[]>>> {
  try {
    const explore = await prisma.explorePage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: explore,
    });
  } catch (error) {
    console.error("GET /explore error:", error);

    return NextResponse.json({
      success: false,
      error: "Failed to fetch explore data",
    }, { status: 500 });
  }
}

export async function POST(req: Request): Promise<NextResponse<ApiResponse<ExplorePage>>> {
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

    // Create new explore page
    const newExplore = await prisma.explorePage.create({
      data: {
        title: body.title,
        location: body.location,
        description: body.description,
        price: Number(body.price),
        discountedPrice: body.discountedPrice ? Number(body.discountedPrice) : Math.round(Number(body.price) * 0.85),
        duration: body.duration || "5 Days / 4 Nights",
        status: body.status || "active",
        rating: body.rating ? Number(body.rating) : 4.0,
        views: body.views ? Number(body.views) : 0,
        likes: body.likes ? Number(body.likes) : 0,
        image: body.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
        category: body.category || "General",
      },
    });

    console.log("Created explore:", newExplore);

    return NextResponse.json({
      success: true,
      data: newExplore,
    }, { status: 201 });

  } catch (error) {
    console.error("POST /explore error:", error);

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to create explore entry",
    }, { status: 500 });
  }
}

export async function DELETE(req: Request): Promise<NextResponse<ApiResponse<{ deleted: boolean }>>> {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID parameter is required',
      }, { status: 400 });
    }

    const deletedItem = await prisma.explorePage.delete({
      where: { id: parseInt(id) },
    });

    console.log("Deleted explore item:", deletedItem);

    return NextResponse.json({
      success: true,
      data: { deleted: true },
    });

  } catch (error) {
    console.error("DELETE /explore error:", error);

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete explore item",
    }, { status: 500 });
  }
}

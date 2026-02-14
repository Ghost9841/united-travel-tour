import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const travel = await prisma.travel.findUnique({
      where: { id: Number(id) }
    });

    if (!travel) {
      return NextResponse.json({
        success: false,
        error: "Travel not found",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        travel: travel,
      },
    });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch travel",
    }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedTravel = await prisma.travel.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        location: body.location,
        description: body.description,
        price: Number(body.price),
        duration: body.duration,
        category: body.category,
        groupSize: body.groupSize,
        image: body.image,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        travel: updatedTravel,
      },
    });
  } catch (error) {
    console.error("PUT error:", error);
    
    let errorMessage = "Failed to update travel";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.travel.delete({
      where: { id: Number(id) }
    });

    return NextResponse.json({
      success: true,
      message: "Travel deleted successfully",
    });
  } catch (error) {
    console.error("DELETE error:", error);
    
    let errorMessage = "Failed to delete travel";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status: 500 });
  }
}
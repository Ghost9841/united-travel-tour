// app/api/enquiry/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET - Fetch single enquiry
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const enquiry = await prisma.enquiry.findUnique({
      where: { id },
    });

    if (!enquiry) {
      return NextResponse.json(
        { error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(enquiry, { status: 200 });
  } catch (error) {
    console.error("Error fetching enquiry:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiry" },
      { status: 500 }
    );
  }
}

// PATCH - Update enquiry
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ["PENDING", "CONTACTED", "COMPLETED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(
      { 
        message: "Enquiry updated successfully", 
        enquiry 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return NextResponse.json(
      { error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}

// DELETE - Delete enquiry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.enquiry.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Enquiry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    return NextResponse.json(
      { error: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
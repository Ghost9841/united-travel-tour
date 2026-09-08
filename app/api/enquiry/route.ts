// app/api/enquiry/route.ts

import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


// GET - Fetch all enquiries
export async function GET(request: NextRequest) {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(enquiries, { status: 200 });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

// POST - Create a new enquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      email,
      phoneNumber,
      enquiryMessage,
      airlineName,
      sectorRoute,
      journeyType,
      departureDate,
      returnDate,
    } = body;

    // Validate required fields
    if (!name || !email || !phoneNumber) {
      return NextResponse.json(
        { error: "Name, email, and phone number are required" },
        { status: 400 }
      );
    }

    // Create enquiry
    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        email,
        phoneNumber,
        enquiryMessage: enquiryMessage || null,
        airlineName: airlineName || null,
        sectorRoute: sectorRoute || null,
        journeyType: journeyType || null,
        departureDate: departureDate ? new Date(departureDate) : null,
        returnDate: returnDate ? new Date(returnDate) : null,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      { 
        message: "Enquiry submitted successfully", 
        enquiry 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return NextResponse.json(
      { error: "Failed to create enquiry" },
      { status: 500 }
    );
  }
}

// PATCH - Update enquiry status (for dashboard)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID and status are required" },
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
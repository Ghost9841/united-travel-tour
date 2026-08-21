// app/api/terms-agreement/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const agreements = await prisma.termsAgreement.findMany({
      include: {
        termsVersion: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(agreements);
  } catch (error) {
    console.error("GET AGREEMENTS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch agreements",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      phoneNumber,
      sectorRoute,
      journeyType,
      termsVersionId,
      departureDate,  // Admin provides this
      returnDate,     // Admin provides this (optional for ONE_WAY)
    } = body;

    // Validate required fields
    if (
      !name ||
      !phoneNumber ||
      !sectorRoute ||
      !journeyType ||
      !termsVersionId ||
      !departureDate  // departure date is always required
    ) {
      return NextResponse.json(
        {
          error: "Name, phone number, sector/route, journey type, departure date, and terms version are required",
        },
        { status: 400 }
      );
    }

    // Validate journey type
    if (!["TWO_WAY", "ONE_WAY"].includes(journeyType)) {
      return NextResponse.json(
        {
          error: "Invalid journey type",
        },
        { status: 400 }
      );
    }

    // For TWO_WAY, return date is required
    if (journeyType === "TWO_WAY" && !returnDate) {
      return NextResponse.json(
        {
          error: "Return date is required for TWO_WAY journeys",
        },
        { status: 400 }
      );
    }

    // Validate that return date is after departure date (if provided)
    if (returnDate && new Date(returnDate) < new Date(departureDate)) {
      return NextResponse.json(
        {
          error: "Return date must be after departure date",
        },
        { status: 400 }
      );
    }

    // Get the terms version
    const termsVersion = await prisma.termsVersion.findUnique({
      where: {
        id: Number(termsVersionId),
      },
    });

    if (!termsVersion) {
      return NextResponse.json(
        {
          error: "Terms version not found",
        },
        { status: 404 }
      );
    }

    // Create the agreement with all fields
    const agreement = await prisma.termsAgreement.create({
      data: {
        name,
        phoneNumber,
        sectorRoute,
        journeyType,

        // Admin provides these dates
        departureDate: new Date(departureDate),
        returnDate: returnDate ? new Date(returnDate) : null,

        termsVersion: {
          connect: {
            id: termsVersion.id,
          },
        },

        termsSnapshot: JSON.stringify({
          english: termsVersion.englishText,
          nepali: termsVersion.nepaliText,
        }),

        // Customer fields - initially null/empty
        date: null,
        customerSignature: null,
        acceptTerms: false,
      },

      include: {
        termsVersion: true,
      },
    });

    return NextResponse.json(agreement, {
      status: 201,
    });
  } catch (error) {
    console.error("CREATE AGREEMENT ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create agreement",
      },
      { status: 500 }
    );
  }
}
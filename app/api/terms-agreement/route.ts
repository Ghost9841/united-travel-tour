import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app//lib/prisma";

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
    } = body;

    if (
      !name ||
      !phoneNumber ||
      !sectorRoute ||
      !journeyType ||
      !termsVersionId
    ) {
      return NextResponse.json(
        {
          error:
            "Name, phone number, sector/route, journey type and terms version are required",
        },
        { status: 400 }
      );
    }

    if (!["TWO_WAY", "ONE_WAY"].includes(journeyType)) {
      return NextResponse.json(
        {
          error: "Invalid journey type",
        },
        { status: 400 }
      );
    }

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

    const agreement = await prisma.termsAgreement.create({
      data: {
        name,
        phoneNumber,
        sectorRoute,
        journeyType,

        termsVersion: {
          connect: {
            id: termsVersion.id,
          },
        },

        termsSnapshot: JSON.stringify({
          english: termsVersion.englishText,
          nepali: termsVersion.nepaliText,
        }),

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

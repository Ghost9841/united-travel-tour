import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const agreement = await prisma.termsAgreement.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        termsVersion: true,
      },
    });

    if (!agreement) {
      return NextResponse.json(
        {
          error: "Agreement not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(agreement);
  } catch (error) {
    console.error("GET AGREEMENT ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch agreement",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const agreementId = Number(id);

    const existing = await prisma.termsAgreement.findUnique({
      where: {
        id: agreementId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Agreement not found",
        },
        { status: 404 }
      );
    }

    const body = await req.json();

    const {
      name,
      phoneNumber,
      sectorRoute,
      journeyType,
      date,
      acceptTerms,
      customerSignature,
      termsVersionId,
    } = body;

    const updateData: any = {};

    if (name !== undefined) updateData.name = name;
    if (phoneNumber !== undefined) {
      updateData.phoneNumber = phoneNumber;
    }

    if (sectorRoute !== undefined) {
      updateData.sectorRoute = sectorRoute;
    }

    if (journeyType !== undefined) {
      if (!["TWO_WAY", "ONE_WAY"].includes(journeyType)) {
        return NextResponse.json(
          {
            error: "Invalid journey type",
          },
          { status: 400 }
        );
      }

      updateData.journeyType = journeyType;
    }

    if (date !== undefined) {
      updateData.date = date ? new Date(date) : null;
    }

    if (acceptTerms !== undefined) {
      updateData.acceptTerms = Boolean(acceptTerms);
    }

    if (customerSignature !== undefined) {
      updateData.customerSignature = customerSignature;
    }

    // If administrator changes the terms version
    if (
      termsVersionId !== undefined &&
      Number(termsVersionId) !== existing.termsVersionId
    ) {
      const newVersion = await prisma.termsVersion.findUnique({
        where: {
          id: Number(termsVersionId),
        },
      });

      if (!newVersion) {
        return NextResponse.json(
          {
            error: "Terms version not found",
          },
          { status: 404 }
        );
      }

      updateData.termsVersionId = newVersion.id;
      updateData.englishSnapshot =
        newVersion.englishText;

      updateData.nepaliSnapshot =
        newVersion.nepaliText;
    }

    const agreement = await prisma.termsAgreement.update({
      where: {
        id: agreementId,
      },
      data: updateData,
      include: {
        termsVersion: true,
      },
    });

    return NextResponse.json(agreement);
  } catch (error) {
    console.error("UPDATE AGREEMENT ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to update agreement",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    const agreementId = Number(id);

    const existing = await prisma.termsAgreement.findUnique({
      where: {
        id: agreementId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Agreement not found",
        },
        { status: 404 }
      );
    }

    await prisma.termsAgreement.delete({
      where: {
        id: agreementId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Agreement deleted successfully",
    });
  } catch (error) {
    console.error("DELETE AGREEMENT ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to delete agreement",
      },
      { status: 500 }
    );
  }
}
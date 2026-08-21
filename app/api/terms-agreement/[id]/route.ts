// app/api/terms-agreement/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const agreementId = parseInt(id);

    if (isNaN(agreementId)) {
      return NextResponse.json(
        { error: "Invalid agreement ID" },
        { status: 400 }
      );
    }

    const agreement = await prisma.termsAgreement.findUnique({
      where: { id: agreementId },
      include: {
        termsVersion: true,
      },
    });

    if (!agreement) {
      return NextResponse.json(
        { error: "Agreement not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(agreement);
  } catch (error) {
    console.error("GET AGREEMENT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch agreement" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const agreementId = parseInt(id);

    if (isNaN(agreementId)) {
      return NextResponse.json(
        { error: "Invalid agreement ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Check if agreement exists
    const existingAgreement = await prisma.termsAgreement.findUnique({
      where: { id: agreementId },
    });

    if (!existingAgreement) {
      return NextResponse.json(
        { error: "Agreement not found" },
        { status: 404 }
      );
    }

    const updateData: any = {};

    // Admin fields
    if (body.name !== undefined) updateData.name = body.name;
    if (body.phoneNumber !== undefined) updateData.phoneNumber = body.phoneNumber;
    if (body.sectorRoute !== undefined) updateData.sectorRoute = body.sectorRoute;
    
    if (body.journeyType !== undefined) {
      // When changing journey type, ensure return date is handled
      if (body.journeyType === "ONE_WAY") {
        updateData.returnDate = null; // Clear return date for ONE_WAY
      }
      updateData.journeyType = body.journeyType;
    }
    
    // Admin date fields
    if (body.departureDate !== undefined) {
      if (!body.departureDate) {
        return NextResponse.json(
          { error: "Departure date is required" },
          { status: 400 }
        );
      }
      updateData.departureDate = new Date(body.departureDate);
    }

    if (body.returnDate !== undefined) {
      // For ONE_WAY, return date should be null
      if (body.journeyType === "ONE_WAY" || existingAgreement.journeyType === "ONE_WAY") {
        updateData.returnDate = null;
      } else if (body.returnDate) {
        // Validate return date is after departure date
        const departure = body.departureDate ? new Date(body.departureDate) : existingAgreement.departureDate;
        if (departure && new Date(body.returnDate) < departure) {
          return NextResponse.json(
            { error: "Return date must be after departure date" },
            { status: 400 }
          );
        }
        updateData.returnDate = new Date(body.returnDate);
      } else {
        updateData.returnDate = null;
      }
    }
    
    // Terms version update (with snapshot update)
    if (body.termsVersionId !== undefined) {
      const termsVersion = await prisma.termsVersion.findUnique({
        where: { id: Number(body.termsVersionId) },
      });

      if (!termsVersion) {
        return NextResponse.json(
          { error: "Terms version not found" },
          { status: 404 }
        );
      }

      updateData.termsVersionId = Number(body.termsVersionId);
      updateData.termsSnapshot = JSON.stringify({
        english: termsVersion.englishText,
        nepali: termsVersion.nepaliText,
      });
    }

    // Customer fields - signature (admin can update these too)
    if (body.customerSignature !== undefined) {
      updateData.customerSignature = body.customerSignature;
    }

    // Customer signature date
    if (body.date !== undefined) {
      updateData.date = body.date ? new Date(body.date) : null;
    }

    if (body.acceptTerms !== undefined) {
      updateData.acceptTerms = body.acceptTerms;
    }

    const updatedAgreement = await prisma.termsAgreement.update({
      where: { id: agreementId },
      data: updateData,
      include: {
        termsVersion: true,
      },
    });

    return NextResponse.json(updatedAgreement);
  } catch (error) {
    console.error("UPDATE AGREEMENT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update agreement" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const agreementId = parseInt(id);

    if (isNaN(agreementId)) {
      return NextResponse.json(
        { error: "Invalid agreement ID" },
        { status: 400 }
      );
    }

    const existingAgreement = await prisma.termsAgreement.findUnique({
      where: { id: agreementId },
    });

    if (!existingAgreement) {
      return NextResponse.json(
        { error: "Agreement not found" },
        { status: 404 }
      );
    }

    await prisma.termsAgreement.delete({
      where: { id: agreementId },
    });

    return NextResponse.json(
      { message: "Agreement deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE AGREEMENT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete agreement" },
      { status: 500 }
    );
  }
}
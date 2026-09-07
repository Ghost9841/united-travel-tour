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
    if (body.name !== undefined) {
      updateData.name = body.name;
    }

    if (body.phoneNumber !== undefined) {
      updateData.phoneNumber = body.phoneNumber;
    }

    // Airline name
    if (body.airlineName !== undefined) {
      updateData.airlineName = body.airlineName;
    }

    if (body.sectorRoute !== undefined) {
      updateData.sectorRoute = body.sectorRoute;
    }

    // Journey type
    if (body.journeyType !== undefined) {
      if (!["ONE_WAY", "TWO_WAY"].includes(body.journeyType)) {
        return NextResponse.json(
          { error: "Invalid journey type" },
          { status: 400 }
        );
      }

      // ONE_WAY should never have a return date
      if (body.journeyType === "ONE_WAY") {
        updateData.returnDate = null;
      }

      updateData.journeyType = body.journeyType;
    }

    // Departure date
    if (body.departureDate !== undefined) {
      if (!body.departureDate) {
        return NextResponse.json(
          { error: "Departure date is required" },
          { status: 400 }
        );
      }

      const departureDate = new Date(body.departureDate);

      if (isNaN(departureDate.getTime())) {
        return NextResponse.json(
          { error: "Invalid departure date" },
          { status: 400 }
        );
      }

      updateData.departureDate = departureDate;
    }

    // Return date
    if (body.returnDate !== undefined) {
      const journeyType =
        body.journeyType ?? existingAgreement.journeyType;

      // ONE_WAY => always clear return date
      if (journeyType === "ONE_WAY") {
        updateData.returnDate = null;
      } else if (body.returnDate) {
        const departureDate = body.departureDate
          ? new Date(body.departureDate)
          : existingAgreement.departureDate;

        const returnDate = new Date(body.returnDate);

        if (isNaN(returnDate.getTime())) {
          return NextResponse.json(
            { error: "Invalid return date" },
            { status: 400 }
          );
        }

        if (departureDate && returnDate < departureDate) {
          return NextResponse.json(
            {
              error: "Return date must be after departure date",
            },
            { status: 400 }
          );
        }

        updateData.returnDate = returnDate;
      } else {
        updateData.returnDate = null;
      }
    }

    // If changing to TWO_WAY, make sure a return date exists
    if (
      body.journeyType === "TWO_WAY" &&
      body.returnDate === undefined &&
      !existingAgreement.returnDate
    ) {
      return NextResponse.json(
        {
          error: "Return date is required for TWO_WAY journeys",
        },
        { status: 400 }
      );
    }

    // Terms version update
    if (body.termsVersionId !== undefined) {
      const termsVersion = await prisma.termsVersion.findUnique({
        where: {
          id: Number(body.termsVersionId),
        },
      });

      if (!termsVersion) {
        return NextResponse.json(
          { error: "Terms version not found" },
          { status: 404 }
        );
      }

      updateData.termsVersionId = Number(body.termsVersionId);

      // Update snapshot whenever terms version changes
      updateData.termsSnapshot = JSON.stringify({
        english: termsVersion.englishText,
        nepali: termsVersion.nepaliText,
      });
    }

    // Customer signature
    if (body.customerSignature !== undefined) {
      updateData.customerSignature = body.customerSignature;
    }

    // Customer signature date
    if (body.date !== undefined) {
      updateData.date = body.date
        ? new Date(body.date)
        : null;
    }

    // Terms acceptance
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

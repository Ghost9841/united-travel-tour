import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import SpecialOffer from "./types";

export async function GET() {
  const specialOffers: SpecialOffer[] = await prisma.explorePage.findMany();

  return NextResponse.json({
    success: true,
    data: specialOffers
  });
}
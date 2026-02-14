import { NextResponse } from "next/server";
import specailOffersData from "@/app/data/specialoffers.json";
import SpecialOffer from "./types"

export async function GET() {
  const specialOffers : SpecialOffer[] = specailOffersData.specialOffers;
  return NextResponse.json({
    success : true,
    data : specialOffers
  })
}
import { NextResponse } from "next/server";
import hotelsData from "@/app/data/hotels.json";
import Hotel from "./types"

export async function GET() {
  const hotels : Hotel[] = hotelsData.hotels;
  return NextResponse.json({
    success : true,
    data : hotels
  })
}

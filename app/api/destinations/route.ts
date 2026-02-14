import { NextResponse } from "next/server";
import destinationData from "@/app/data/destinations.json";
import Destination from "./types"

export async function GET() {
  const destinations : Destination[] = destinationData.destinations;
  return NextResponse.json({
    success : true,
    data : destinations
  })
}
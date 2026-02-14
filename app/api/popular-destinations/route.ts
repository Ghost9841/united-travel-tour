import { NextResponse } from "next/server";
import destinationsData from "@/app/data/populardestinations.json";
import PopularDestination from "./types";

export async function GET() {
  const populardestinations: PopularDestination[] = destinationsData.populardestinations;

  return NextResponse.json({
    success: true,
    data: populardestinations
  });
}

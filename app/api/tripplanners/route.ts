import { NextResponse } from "next/server";
import tripPlannersData from "@/app/data/tripplanners.json";
import TripPlanner from "./types";

export async function GET() {
  const tripPlanners: TripPlanner[] = tripPlannersData.tripPlanners;

  return NextResponse.json({
    success: true,
    data: tripPlanners
  });
}

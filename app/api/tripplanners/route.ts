import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import TripPlanner from "./types";

export async function GET() {
  const tripPlanners: TripPlanner[] = await prisma.travel.findMany();

  return NextResponse.json({
    success: true,
    data: tripPlanners
  });
}

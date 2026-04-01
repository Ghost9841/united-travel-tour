import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import PopularDestination from "./types";

export async function GET() {
  const populardestinations: PopularDestination[] = await prisma.destination.findMany();

  return NextResponse.json({
    success: true,
    data: populardestinations
  });
}

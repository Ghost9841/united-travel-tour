import { NextResponse } from "next/server";
import exploreData from "@/app/data/explore.json";
import Explore from "./types";

export async function GET() {
  const explore: Explore[] = exploreData.explore;

  return NextResponse.json({
    success: true,
    data: explore
  });
}

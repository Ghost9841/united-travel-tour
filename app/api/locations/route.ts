import { NextResponse } from "next/server";
import { getLocations } from "@/app/lib/locations";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function GET(): Promise<NextResponse<ApiResponse<string[]>>> {
  try {
    const locations = await getLocations();
    return NextResponse.json({
      success: true,
      data: locations,
    });
  } catch (error) {
    console.error("GET /locations error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch locations",
    }, { status: 500 });
  }
}
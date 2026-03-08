import { NextResponse } from "next/server";
import { getCategories } from "@/app/lib/categories";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function GET(): Promise<NextResponse<ApiResponse<any[]>>> {
  try {
    const categories = await getCategories();
    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("GET /categories error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch categories",
    }, { status: 500 });
  }
}

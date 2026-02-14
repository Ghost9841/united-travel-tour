import { NextResponse } from "next/server";
import blogsData from "@/app/data/blogs.json";
import Blog from "./types"

export async function GET() {
  const blogs : Blog[] = blogsData.blogs;
  return NextResponse.json({
    success : true,
    data : blogs
  })
}

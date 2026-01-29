// app/api/blogs/route.ts
import { NextResponse } from "next/server";

const MOCK_API_URL = process.env.MOCK_API_URL!;

export async function GET() {
  const res = await fetch(`${MOCK_API_URL}/blogs`, {
    cache: "no-store",
  });

  const blogs = await res.json();
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${MOCK_API_URL}/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const blog = await res.json();
  return NextResponse.json(blog, { status: 201 });
}

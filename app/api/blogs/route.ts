import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import Blog from "./types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function GET(): Promise<NextResponse<ApiResponse<Blog[]>>> {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({
      success: true,
      data: blogs as Blog[],
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, data: [], error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request): Promise<NextResponse<ApiResponse<Blog>>> {
  try {
    const body = await req.json();

    // Validation
    if (!body.title?.trim() || !body.excerpt?.trim() || !body.content?.trim()) {
      return NextResponse.json(
        { success: false, data: null, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title: body.title.trim(),
        excerpt: body.excerpt.trim(),
        content: body.content.trim(),
        image: body.image || '',
        author: body.author || 'Anonymous',
        date: body.date || new Date().toISOString().split('T')[0],
        readTime: body.readTime || '5 min read',
        category: body.category || 'General',
        status: body.status || 'published',
        views: Number(body.views) || 0,
        likes: Number(body.likes) || 0,
      },
    });

    return NextResponse.json(
      { success: true, data: blog as Blog },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { success: false, data: null, error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
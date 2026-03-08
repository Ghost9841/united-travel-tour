import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import Blog from "../types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Blog>>> {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog as Blog,
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, data: undefined, error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Blog>>> {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Validation
    if (!body.title?.trim() || !body.excerpt?.trim() || !body.content?.trim()) {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.update({
      where: { id },
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

    return NextResponse.json({
      success: true,
      data: blog as Blog,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { success: false, data: undefined, error: 'Blog not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, data: undefined, error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, data: null, error: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      data: null,
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    if ((error as any).code === 'P2025') {
      return NextResponse.json(
        { success: false, data: null, error: 'Blog not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: false, data: null, error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
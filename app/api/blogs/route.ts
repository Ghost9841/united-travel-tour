// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const BLOGS_FILE_PATH = path.join(process.cwd(), "data", "blogs.json");

// Helper function to read blogs
async function readBlogs() {
  try {
    const fileContent = await fs.readFile(BLOGS_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

// Helper function to write blogs
async function writeBlogs(blogs: any[]) {
  await fs.writeFile(BLOGS_FILE_PATH, JSON.stringify(blogs, null, 2), "utf-8");
}

// GET - Fetch all blogs
export async function GET() {
  const blogs = await readBlogs();
  return NextResponse.json(blogs);
}

// POST - Create new blog
export async function POST(req: Request) {
  const body = await req.json();
  
  const blogs = await readBlogs();
  
  const newBlog = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  blogs.push(newBlog);
  await writeBlogs(blogs);
  
  return NextResponse.json(newBlog, { status: 201 });
}

// DELETE - Delete blog by ID
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  
  const blogs = await readBlogs();
  const filteredBlogs = blogs.filter((blog: any) => blog.id !== id);
  
  if (blogs.length === filteredBlogs.length) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }
  
  await writeBlogs(filteredBlogs);
  
  return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
}

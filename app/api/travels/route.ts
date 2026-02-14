import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "travels.json");

// Ensure the data directory exists
async function ensureDirectoryExists() {
  const dir = path.join(process.cwd(), "data");
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

// Initialize file if it doesn't exist
async function initializeFile() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify([], null, 2));
  }
}

export async function GET() {
  try {
    await ensureDirectoryExists();
    await initializeFile();
    
    const file = await fs.readFile(filePath, "utf-8");
    const travels = JSON.parse(file);

    return NextResponse.json({
      success: true,
      data: {
        travels: travels,
      },
    });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch travels",
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await ensureDirectoryExists();
    await initializeFile();
    
    const body = await req.json();
    console.log("Received POST data:", body); // Debug log

    // Validate required fields
    if (!body.title || !body.location || !body.description || !body.price) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields",
      }, { status: 400 });
    }

    const file = await fs.readFile(filePath, "utf-8");
    const travels = JSON.parse(file);

    const newTravel = {
      id: Date.now(),
      title: body.title,
      location: body.location,
      description: body.description,
      price: Number(body.price),
      originalPrice: Math.round(Number(body.price) * 1.2), // Round to whole number
      duration: body.duration || "3 Days / 2 Nights",
      rating: 0,
      reviews: 0,
      image: body.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
      category: body.category || "General",
      groupSize: body.groupSize || "2-6 people",
    };

    console.log("Creating new travel:", newTravel); // Debug log

    travels.push(newTravel);

    await fs.writeFile(filePath, JSON.stringify(travels, null, 2));

    return NextResponse.json({
      success: true,
      data: {
        travels: [newTravel],
      },
    }, { status: 201 });

  } catch (error) {
    console.error("POST error details:", error); // Detailed error log
    return NextResponse.json({
      success: false,
      error: "Failed to create travel: " + (error instanceof Error ? error.message : "Unknown error"),
    }, { status: 500 });
  }
}
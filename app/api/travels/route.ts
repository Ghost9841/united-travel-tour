export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "travels.json");

export async function GET() {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    const travels = JSON.parse(file);

    return NextResponse.json({
      success: true,
      data: {
        travels: travels,  // Always wrap in { travels: [...] }
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch travels",
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const file = await fs.readFile(filePath, "utf-8");
    const travels = JSON.parse(file);

    const newTravel = {
      id: Date.now(),
      title: body.title,
      location: body.location,
      description: body.description,
      price: Number(body.price),
      originalPrice: Number(body.price) * 1.2,  // Default markup
      duration: body.duration || "3 Days / 2 Nights",
      rating: 0,
      reviews: 0,
      image: body.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
      category: body.category || "General",
      groupSize: body.groupSize || "2-6 people",
    };

    travels.push(newTravel);

    await fs.writeFile(filePath, JSON.stringify(travels, null, 2));

    return NextResponse.json({
      success: true,
      data: {
        travels: [newTravel],  // Wrap in array to match GET structure
      },
    }, { status: 201 });

  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to create travel",
    }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Travel from './types';

// Path to JSON file
const filePath = path.join(process.cwd(), '@/app/data/travels.json');

// Helper: Read travels from file
function getTravels(): Travel[] {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(fileData);
  return parsed.travels;
}

// Helper: Write travels to file
function saveTravels(travels: Travel[]) {
  const data = { travels };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET - fetch all travels (reads fresh from file)
export async function GET() {
  try {
    const travels = getTravels();
    
    return NextResponse.json({
      success: true,
      data: travels
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch travels" },
      { status: 500 }
    );
  }
}

// POST - create new travel (writes to file)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validation
    if (!body.title || !body.location || !body.price) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: title, location, price" },
        { status: 400 }
      );
    }

    // Get current travels
    const travels = getTravels();
    
    // Create new travel
    const newTravel: Travel = {
      id: Date.now(),
      title: body.title,
      location: body.location,
      description: body.description || "",
      price: Number(body.price),
      originalPrice: Number(body.originalPrice) || Number(body.price),
      duration: body.duration || "N/A",
      rating: body.rating || 0,
      reviews: 0,
      image: body.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
      category: body.category || "Uncategorized",
      groupSize: body.groupSize || "1-10 people"
    };

    // Add and save
    travels.push(newTravel);
    saveTravels(travels);

    return NextResponse.json({
      success: true,
      data: newTravel,
      message: "Travel package created successfully"
    }, { status: 201 });

  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create travel package" },
      { status: 500 }
    );
  }
}
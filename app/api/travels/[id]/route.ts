import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Travel from '../types';

const filePath = path.join(process.cwd(), '@/app/data/travels.json');

function getTravels(): Travel[] {
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData).travels || [];
  } catch (error) {
    console.error('Error reading travels file:', error);
    return [];
  }
}

function saveTravels(travels: Travel[]) {
  try {
    fs.writeFileSync(filePath, JSON.stringify({ travels }, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing travels file:', error);
    throw error;
  }
}

// GET single travel
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const travels = getTravels();
    const travel = travels.find(t => t.id === Number(id));
    
    if (!travel) {
      return NextResponse.json(
        { success: false, error: "Travel not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: travel });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch travel" },
      { status: 500 }
    );
  }
}

// PUT update travel
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const travels = getTravels();
    const index = travels.findIndex(t => t.id === Number(id));
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Travel not found" },
        { status: 404 }
      );
    }

    // Update the travel while preserving the ID
    travels[index] = {
      ...travels[index],
      ...body,
      id: travels[index].id, // Ensure ID doesn't change
      price: Number(body.price) || travels[index].price,
      originalPrice: Number(body.originalPrice) || travels[index].originalPrice,
      rating: Number(body.rating) || travels[index].rating,
      reviews: Number(body.reviews) || travels[index].reviews,
    };

    saveTravels(travels);

    return NextResponse.json({
      success: true,
      data: travels[index],
      message: "Travel package updated successfully"
    });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { success: false, error: "Failed to update travel package" },
      { status: 500 }
    );
  }
}

// DELETE travel
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const travels = getTravels();
    const filtered = travels.filter(t => t.id !== Number(id));
    
    if (filtered.length === travels.length) {
      return NextResponse.json(
        { success: false, error: "Travel not found" },
        { status: 404 }
      );
    }

    saveTravels(filtered);

    return NextResponse.json({
      success: true,
      message: "Travel package deleted successfully"
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { success: false, error: "Failed to delete travel package" },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Travel from '../types';

const filePath = path.join(process.cwd(), 'src/app/data/travels.json');

function getTravels(): Travel[] {
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData).travels;
}

function saveTravels(travels: Travel[]) {
  fs.writeFileSync(filePath, JSON.stringify({ travels }, null, 2));
}

// GET single travel
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ← Changed to Promise
) {
  try {
    const { id } = await params;  // ← Await the params
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
    return NextResponse.json(
      { success: false, error: "Failed to fetch travel" },
      { status: 500 }
    );
  }
}

// PUT update travel
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ← Changed to Promise
) {
  try {
    const { id } = await params;  // ← Await the params
    const body = await request.json();
    const travels = getTravels();
    const index = travels.findIndex(t => t.id === Number(id));
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Travel not found" },
        { status: 404 }
      );
    }

    travels[index] = {
      ...travels[index],
      ...body,
      id: travels[index].id,
      price: Number(body.price) || travels[index].price,
      originalPrice: Number(body.originalPrice) || travels[index].originalPrice,
    };

    saveTravels(travels);

    return NextResponse.json({
      success: true,
      data: travels[index],
      message: "Updated successfully"
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update" },
      { status: 500 }
    );
  }
}

// DELETE travel
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ← Changed to Promise
) {
  try {
    const { id } = await params;  // ← Await the params
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
      message: "Deleted successfully"
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete" },
      { status: 500 }
    );
  }
}
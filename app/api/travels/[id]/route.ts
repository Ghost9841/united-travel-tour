import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "travels.json");

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    const travels = JSON.parse(file);
    const travel = travels.find((t: any) => t.id === Number(params.id));

    if (!travel) {
      return NextResponse.json({
        success: false,
        error: "Travel not found",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        travel: travel,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch travel",
    }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const file = await fs.readFile(filePath, "utf-8");
    const travels = JSON.parse(file);
    
    const index = travels.findIndex((t: any) => t.id === Number(params.id));
    
    if (index === -1) {
      return NextResponse.json({
        success: false,
        error: "Travel not found",
      }, { status: 404 });
    }

    // Update the travel
    travels[index] = {
      ...travels[index],
      ...body,
      price: Number(body.price),
      originalPrice: travels[index].originalPrice, // Preserve original price or recalculate
    };

    await fs.writeFile(filePath, JSON.stringify(travels, null, 2));

    return NextResponse.json({
      success: true,
      data: {
        travel: travels[index],
      },
    });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to update travel",
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    const travels = JSON.parse(file);
    
    const filteredTravels = travels.filter((t: any) => t.id !== Number(params.id));
    
    if (filteredTravels.length === travels.length) {
      return NextResponse.json({
        success: false,
        error: "Travel not found",
      }, { status: 404 });
    }

    await fs.writeFile(filePath, JSON.stringify(filteredTravels, null, 2));

    return NextResponse.json({
      success: true,
      message: "Travel deleted successfully",
    });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to delete travel",
    }, { status: 500 });
  }
}
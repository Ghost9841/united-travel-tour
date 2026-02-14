import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import Travel from "./types";

const filePath = path.join(process.cwd(), "data/travels/travels.json");

// GET all travels
export async function GET() {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    const travels: Travel[] = JSON.parse(file);
    return NextResponse.json(travels);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch travels" }, { status: 500 });
  }
}

// POST new travel
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const file = await fs.readFile(filePath, "utf-8");
    const travels: Travel[] = JSON.parse(file);

    const newTravel: Travel = {
      id: Date.now(),
      ...body,
    };

    travels.push(newTravel);

    await fs.writeFile(filePath, JSON.stringify(travels, null, 2));

    return NextResponse.json(newTravel, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create travel" }, { status: 500 });
  }
}

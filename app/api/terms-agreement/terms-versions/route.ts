import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const versions = await prisma.termsVersion.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(versions);
  } catch (error) {
    console.error("GET TERMS VERSIONS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch terms versions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      version,
      title,
      englishText,
      nepaliText,
    } = body;

    if (!version) {
      return NextResponse.json(
        { error: "Version is required" },
        { status: 400 }
      );
    }

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!englishText?.trim()) {
      return NextResponse.json(
        { error: "English terms are required" },
        { status: 400 }
      );
    }

    if (!nepaliText?.trim()) {
      return NextResponse.json(
        { error: "Nepali terms are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.termsVersion.findUnique({
      where: {
        version,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          error: `Version ${version} already exists`,
        },
        { status: 409 }
      );
    }

    const termsVersion = await prisma.termsVersion.create({
      data: {
        version,
        title: title.trim(),
        englishText: englishText.trim(),
        nepaliText: nepaliText.trim(),
        status: "active",
      },
    });

    return NextResponse.json(
      termsVersion,
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CREATE TERMS VERSION ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create terms version",
      },
      { status: 500 }
    );
  }
}
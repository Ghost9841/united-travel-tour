import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');

        const images = await prisma.landingHeroCarouselImage.findMany({
            where: status ? { status } : undefined,
            orderBy: { order: 'asc' },
        });

        return NextResponse.json({ success: true, data: images });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to fetch hero images" });

    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.src?.trim()) {
            return NextResponse.json({ success: false, message: "Image URL (src) is required" }, { status: 400 });
        }

        const image = await prisma.landingHeroCarouselImage.create({
            data: {
                src: body.src.trim(),
                alt: body.alt?.trim() ?? '',
                order: body.order ?? 0,
                status: body.status ?? 'active',
            },
        });

        return NextResponse.json({ success: true, data: image }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Failed to create hero image" }, { status: 500 });
    }
}
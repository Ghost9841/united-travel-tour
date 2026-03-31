// app/api/trending-routes/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

type Params = { params: Promise<{ id: string }> };

function parseId(raw: string) {
  const n = Number(raw);
  return isNaN(n) ? null : n;
}

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id: raw } = await params;
    const id = parseId(raw);
    if (!id) return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });

    const route = await prisma.trendingRoute.findUnique({ where: { id } });
    if (!route) return NextResponse.json({ success: false, error: 'Route not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: route });
  } catch (error) {
    console.error('Error fetching trending route:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch route' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { id: raw } = await params;
    const id = parseId(raw);
    if (!id) return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });

    const body = await req.json();

    const data: Record<string, unknown> = {};
    if (body.from           !== undefined) data.from           = body.from.trim();
    if (body.fromCode       !== undefined) data.fromCode       = body.fromCode.trim();
    if (body.to             !== undefined) data.to             = body.to.trim();
    if (body.toCode         !== undefined) data.toCode         = body.toCode.trim();
    if (body.date           !== undefined) data.date           = body.date;
    if (body.price          !== undefined) data.price          = Number(body.price);
    if (body.currency       !== undefined) data.currency       = body.currency;
    if (body.image          !== undefined) data.image          = body.image.trim();
    if (body.airline        !== undefined) data.airline        = body.airline.trim();
    if (body.flightNo       !== undefined) data.flightNo       = body.flightNo.trim();
    if (body.duration       !== undefined) data.duration       = body.duration.trim();
    if (body.stops          !== undefined) data.stops          = body.stops;
    if (body.departure      !== undefined) data.departure      = body.departure.trim();
    if (body.arrival        !== undefined) data.arrival        = body.arrival.trim();
    if (body.fromFull       !== undefined) data.fromFull       = body.fromFull.trim();
    if (body.toFull         !== undefined) data.toFull         = body.toFull.trim();
    if (body.fromTerminal   !== undefined) data.fromTerminal   = body.fromTerminal.trim();
    if (body.toTerminal     !== undefined) data.toTerminal     = body.toTerminal.trim();
    if (body.travelClass    !== undefined) data.travelClass    = body.travelClass;
    if (body.checkinBaggage !== undefined) data.checkinBaggage = body.checkinBaggage.trim();
    if (body.cabinBaggage   !== undefined) data.cabinBaggage   = body.cabinBaggage.trim();
    if (body.baseFare       !== undefined) data.baseFare       = Number(body.baseFare);
    if (body.tax            !== undefined) data.tax            = Number(body.tax);
    if (body.insurance      !== undefined) data.insurance      = Number(body.insurance);
    if (body.status         !== undefined) data.status         = body.status;
    if (body.order          !== undefined) data.order          = Number(body.order);

    const route = await prisma.trendingRoute.update({ where: { id }, data });
    return NextResponse.json({ success: true, data: route });
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Route not found' }, { status: 404 });
    }
    console.error('Error updating trending route:', error);
    return NextResponse.json({ success: false, error: 'Failed to update route' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id: raw } = await params;
    const id = parseId(raw);
    if (!id) return NextResponse.json({ success: false, error: 'Invalid ID' }, { status: 400 });

    await prisma.trendingRoute.delete({ where: { id } });
    return NextResponse.json({ success: true, data: { id } });
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Route not found' }, { status: 404 });
    }
    console.error('Error deleting trending route:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete route' }, { status: 500 });
  }
}
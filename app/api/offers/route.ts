// app/api/trending-routes/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const routes = await prisma.trendingRoute.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ success: true, data: routes });
  } catch (error) {
    console.error('Error fetching trending routes:', error);
    return NextResponse.json(
      { success: false, data: [], error: 'Failed to fetch trending routes' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.from?.trim() || !body.to?.trim() || !body.airline?.trim()) {
      return NextResponse.json(
        { success: false, error: 'from, to and airline are required' },
        { status: 400 }
      );
    }

    const route = await prisma.trendingRoute.create({
      data: {
        from:           body.from.trim(),
        fromCode:       body.fromCode?.trim()       || '',
        to:             body.to.trim(),
        toCode:         body.toCode?.trim()         || '',
        date:           body.date                   || '',
        price:          Number(body.price)          || 0,
        currency:       body.currency               || '£',
        image:          body.image?.trim()          || '',
        airline:        body.airline.trim(),
        flightNo:       body.flightNo?.trim()       || '',
        duration:       body.duration?.trim()       || '',
        stops:          body.stops                  || 'Non Stop',
        departure:      body.departure?.trim()      || '',
        arrival:        body.arrival?.trim()        || '',
        fromFull:       body.fromFull?.trim()       || '',
        toFull:         body.toFull?.trim()         || '',
        fromTerminal:   body.fromTerminal?.trim()   || '',
        toTerminal:     body.toTerminal?.trim()     || '',
        travelClass:    body.travelClass            || 'Economy',
        checkinBaggage: body.checkinBaggage?.trim() || '',
        cabinBaggage:   body.cabinBaggage?.trim()   || '',
        baseFare:       Number(body.baseFare)       || 0,
        tax:            Number(body.tax)            || 0,
        insurance:      Number(body.insurance)      || 0,
        status:         body.status                 || 'active',
        order:          Number(body.order)          || 0,
      },
    });

    return NextResponse.json({ success: true, data: route }, { status: 201 });
  } catch (error) {
    console.error('Error creating trending route:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create trending route' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import travelsData from "@/app/data/travels.json"
import Travel from './types';


export async function GET() {
    const travels : Travel[] = travelsData.travels;

    return NextResponse.json({
        success: true,
        data : travels
    })
}
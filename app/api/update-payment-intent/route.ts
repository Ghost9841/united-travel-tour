// app/api/update-payment-intent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { paymentIntentId, customerName, customerEmail } = await req.json();

    if (!paymentIntentId) {
      return NextResponse.json({ error: 'Missing paymentIntentId' }, { status: 400 });
    }

    await stripe.paymentIntents.update(paymentIntentId, {
      receipt_email: customerEmail || undefined,
      metadata: {
        customerName:  customerName  ?? '',
        customerEmail: customerEmail ?? '',
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to update payment intent:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { amount, currency, outPageTitle, type, id, customerName, customerEmail } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses pence/cents
      currency: currency || 'gbp',
      receipt_email: customerEmail,
metadata: {
        itemTitle:     outPageTitle,
        itemType:      type,
        itemId:        id,
        customerName:  customerName  ?? '',
        customerEmail: customerEmail ?? '',
        amount:        String(amount),
      },
        });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
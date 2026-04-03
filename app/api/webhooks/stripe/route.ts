// app/api/webhooks/stripe/route.ts
import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);
const BUSINESS_EMAIL = process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? 'info@unitedtravels.co.uk';

export async function POST(req: NextRequest) {
  const body      = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent   = event.data.object as Stripe.PaymentIntent;
    const meta     = intent.metadata;
    const amount   = (intent.amount / 100).toFixed(2);
    const currency = intent.currency.toUpperCase();

    const customerName  = meta.customerName  || 'Customer';
    const customerEmail = meta.customerEmail || '';
    const itemTitle     = meta.itemTitle     || 'Booking';
    const itemType      = meta.itemType      || '';

    // ── 1. Email to customer ──────────────────────────────────────────────────
    if (customerEmail) {
      await resend.emails.send({
        from:    'United Travel & Tours <noreply@unitedtravels.co.uk>',
        to:      customerEmail,
        subject: `Booking Confirmed – ${itemTitle}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#fff;border-radius:12px;border:1px solid #e5e7eb">
            <img src="https://www.unitedtravels.co.uk/unitedtravellogo300x300pxfull-01.svg"
              alt="United Travel & Tours" style="width:80px;margin-bottom:24px" />

            <h1 style="font-size:22px;font-weight:700;color:#111827;margin-bottom:8px">
              Booking Confirmed 🎉
            </h1>
            <p style="color:#6b7280;margin-bottom:24px">
              Hi ${customerName}, thank you for booking with United Travel &amp; Tours.
              Your payment has been received successfully.
            </p>

            <div style="background:#fff7ed;border-radius:8px;padding:20px;margin-bottom:24px">
              <h2 style="font-size:16px;font-weight:600;color:#ea580c;margin:0 0 12px">
                Booking Summary
              </h2>
              <table style="width:100%;font-size:14px;color:#374151">
                <tr>
                  <td style="padding:4px 0;color:#6b7280">Item</td>
                  <td style="padding:4px 0;text-align:right;font-weight:600">${itemTitle}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:#6b7280">Type</td>
                  <td style="padding:4px 0;text-align:right;font-weight:600;text-transform:capitalize">${itemType}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:#6b7280">Amount Paid</td>
                  <td style="padding:4px 0;text-align:right;font-weight:700;color:#ea580c">${currency} ${amount}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;color:#6b7280">Payment ID</td>
                  <td style="padding:4px 0;text-align:right;font-size:12px;color:#9ca3af">${intent.id}</td>
                </tr>
              </table>
            </div>

            <p style="color:#6b7280;font-size:14px;margin-bottom:8px">
              Our team will be in touch shortly to confirm your booking details.
            </p>
            <p style="color:#6b7280;font-size:14px;margin-bottom:24px">
              If you have any questions, call us on
              <strong style="color:#111827"> +44 20 3725 3460</strong>
              or reply to this email.
            </p>

            <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0" />
            <p style="font-size:12px;color:#9ca3af;text-align:center">
              United Travel &amp; Tours Limited · London, UK ·
              <a href="https://www.unitedtravels.co.uk" style="color:#ea580c">unitedtravels.co.uk</a>
            </p>
          </div>
        `,
      });
    }

    // ── 2. Notification email to the business ─────────────────────────────────
    await resend.emails.send({
      from:    'United Travel Bookings <noreply@unitedtravels.co.uk>',
      to:      BUSINESS_EMAIL,
      subject: `New Booking: ${itemTitle} – ${currency} ${amount}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:32px;background:#fff;border-radius:12px;border:1px solid #e5e7eb">
          <h1 style="font-size:20px;font-weight:700;color:#111827;margin-bottom:16px">
            💳 New Payment Received
          </h1>

          <div style="background:#f9fafb;border-radius:8px;padding:20px;margin-bottom:24px">
            <table style="width:100%;font-size:14px;color:#374151">
              <tr>
                <td style="padding:6px 0;color:#6b7280;width:140px">Customer</td>
                <td style="padding:6px 0;font-weight:600">${customerName}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280">Email</td>
                <td style="padding:6px 0;font-weight:600">
                  <a href="mailto:${customerEmail}" style="color:#ea580c">${customerEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280">Item</td>
                <td style="padding:6px 0;font-weight:600">${itemTitle}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280">Type</td>
                <td style="padding:6px 0;font-weight:600;text-transform:capitalize">${itemType}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280">Amount</td>
                <td style="padding:6px 0;font-weight:700;color:#16a34a">${currency} ${amount}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#6b7280">Payment ID</td>
                <td style="padding:6px 0;font-size:12px;color:#9ca3af">${intent.id}</td>
              </tr>
            </table>
          </div>

          <p style="font-size:13px;color:#9ca3af">
            View full details in your
            <a href="https://dashboard.stripe.com/payments/${intent.id}" style="color:#ea580c">
              Stripe dashboard
            </a>
          </p>
        </div>
      `,
    });

    console.log(`✅ Payment confirmed: ${intent.id} — ${currency} ${amount} — ${customerEmail}`);
  }

  return NextResponse.json({ received: true });
}
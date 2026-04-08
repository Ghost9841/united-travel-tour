// app/api/webhooks/stripe/route.ts
import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);
const BUSINESS_EMAIL = process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? 'info@unitedtravels.co.uk';

// ─── Shared email styles ──────────────────────────────────────────────────────
const BASE = `font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin:0;padding:0;background:#f3f4f6`;
const CONTAINER = `max-width:620px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb`;

function customerEmail(
  customerName: string,
  itemTitle: string,
  itemType: string,
  amount: string,
  currency: string,
  paymentId: string,
  date: string
) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="${BASE}">
<table width="100%" cellpadding="0" cellspacing="0" style="${BASE};padding:32px 16px">
<tr><td>
<table width="100%" cellpadding="0" cellspacing="0" style="${CONTAINER}">

  <!-- Header -->
  <tr>
    <td style="background:#ea580c;padding:28px 32px;text-align:center">
      <img src="https://www.unitedtravels.co.uk/unitedtravellogo300x300pxfull-01.svg"
        alt="United Travel & Tours" height="56"
        style="display:inline-block;margin-bottom:12px" />
      <p style="color:#fff;font-size:13px;margin:0;opacity:0.85;letter-spacing:0.5px">
        UNITED TRAVEL &amp; TOURS LIMITED
      </p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:36px 32px">

      <p style="font-size:15px;color:#374151;margin:0 0 6px">Dear ${customerName},</p>
      <h1 style="font-size:22px;font-weight:700;color:#111827;margin:0 0 8px">
        Your booking is confirmed ✓
      </h1>
      <p style="font-size:14px;color:#6b7280;margin:0 0 28px;line-height:1.6">
        Thank you for booking with United Travel &amp; Tours. Your payment has been received
        and your booking is now confirmed. We look forward to making your journey memorable.
      </p>

      <!-- Purchase table -->
      <table width="100%" cellpadding="0" cellspacing="0"
        style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:28px">

        <!-- Table header -->
        <tr style="background:#f9fafb">
          <th style="padding:10px 16px;text-align:left;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb">
            Description
          </th>
          <th style="padding:10px 16px;text-align:left;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb">
            Type
          </th>
          <th style="padding:10px 16px;text-align:left;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb">
            Date
          </th>
          <th style="padding:10px 16px;text-align:right;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb">
            Amount
          </th>
        </tr>

        <!-- Table row -->
        <tr>
          <td style="padding:14px 16px;font-size:14px;color:#111827;font-weight:600;border-bottom:1px solid #f3f4f6">
            ${itemTitle}
          </td>
          <td style="padding:14px 16px;font-size:14px;color:#374151;text-transform:capitalize;border-bottom:1px solid #f3f4f6">
            ${itemType}
          </td>
          <td style="padding:14px 16px;font-size:14px;color:#374151;border-bottom:1px solid #f3f4f6">
            ${date}
          </td>
          <td style="padding:14px 16px;font-size:14px;font-weight:700;color:#ea580c;text-align:right;border-bottom:1px solid #f3f4f6">
            ${currency} ${amount}
          </td>
        </tr>

        <!-- Total row -->
        <tr style="background:#fff7ed">
          <td colspan="3" style="padding:12px 16px;font-size:14px;font-weight:700;color:#111827;text-align:right">
            Total Paid
          </td>
          <td style="padding:12px 16px;font-size:16px;font-weight:700;color:#ea580c;text-align:right">
            ${currency} ${amount}
          </td>
        </tr>
      </table>

      <!-- Payment reference -->
      <p style="font-size:12px;color:#9ca3af;margin:0 0 28px">
        Payment reference: <span style="font-family:monospace;color:#6b7280">${paymentId}</span>
      </p>

      <!-- Thank you note -->
      <div style="background:#f9fafb;border-left:4px solid #ea580c;border-radius:4px;padding:16px 20px;margin-bottom:28px">
        <p style="font-size:14px;color:#374151;margin:0;line-height:1.6">
          <strong>Thank you for choosing United Travel &amp; Tours.</strong><br/>
          Our team will be in touch shortly to confirm your full itinerary details.
          If you have any questions or special requests, don't hesitate to reach out.
        </p>
      </div>

      <!-- Contact -->
      <p style="font-size:14px;color:#374151;margin:0 0 4px">
        📞 <strong>+44 20 3725 3460</strong>
      </p>
      <p style="font-size:14px;color:#374151;margin:0">
        ✉️ <a href="mailto:info@unitedtravels.co.uk" style="color:#ea580c;text-decoration:none">
          info@unitedtravels.co.uk
        </a>
      </p>
    </td>
  </tr>

  <!-- Bill to footer -->
  <tr>
    <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:24px 32px">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:top;width:50%">
            <p style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;margin:0 0 6px">
              Bill To
            </p>
            <p style="font-size:13px;font-weight:700;color:#111827;margin:0 0 2px">
              UNITED TRAVEL &amp; TOURS LIMITED
            </p>
            <p style="font-size:12px;color:#6b7280;margin:0;line-height:1.6">
              2, HIGH STREET<br/>
              Bracknell RG12 1AA<br/>
              GB<br/>
              <a href="mailto:info@unitedtravels.co.uk" style="color:#ea580c;text-decoration:none">
                info@unitedtravels.co.uk
              </a>
            </p>
          </td>
          <td style="vertical-align:top;text-align:right">
            <a href="https://unitedtravels.co.uk" style="color:#ea580c;font-size:13px;font-weight:600;text-decoration:none">
              unitedtravels.co.uk
            </a>
            <p style="font-size:11px;color:#9ca3af;margin:4px 0 0">
              © ${new Date().getFullYear()} United Travel &amp; Tours Limited
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function businessEmail(
  customerName: string,
  customerEmail: string,
  itemTitle: string,
  itemType: string,
  amount: string,
  currency: string,
  paymentId: string,
  date: string
) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="${BASE}">
<table width="100%" cellpadding="0" cellspacing="0" style="${BASE};padding:32px 16px">
<tr><td>
<table width="100%" cellpadding="0" cellspacing="0" style="${CONTAINER}">

  <tr>
    <td style="background:#111827;padding:24px 32px">
      <h1 style="color:#fff;font-size:18px;font-weight:700;margin:0">
        💳 New Payment Received
      </h1>
      <p style="color:#9ca3af;font-size:13px;margin:4px 0 0">${date}</p>
    </td>
  </tr>

  <tr>
    <td style="padding:32px">

      <!-- Purchase table -->
      <table width="100%" cellpadding="0" cellspacing="0"
        style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:24px">

        <tr style="background:#f9fafb">
          <th style="padding:10px 16px;text-align:left;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb">Field</th>
          <th style="padding:10px 16px;text-align:left;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #e5e7eb">Value</th>
        </tr>

        ${[
          ['Customer',   customerName],
          ['Email',      `<a href="mailto:${customerEmail}" style="color:#ea580c">${customerEmail}</a>`],
          ['Item',       `<strong>${itemTitle}</strong>`],
          ['Type',       itemType],
          ['Amount',     `<strong style="color:#16a34a">${currency} ${amount}</strong>`],
          ['Payment ID', `<span style="font-family:monospace;font-size:12px;color:#6b7280">${paymentId}</span>`],
        ].map(([label, val], i) => `
          <tr style="background:${i % 2 === 0 ? '#fff' : '#f9fafb'}">
            <td style="padding:12px 16px;font-size:13px;color:#6b7280;border-bottom:1px solid #f3f4f6;white-space:nowrap">${label}</td>
            <td style="padding:12px 16px;font-size:13px;color:#111827;border-bottom:1px solid #f3f4f6">${val}</td>
          </tr>
        `).join('')}
      </table>

      <a href="https://dashboard.stripe.com/payments/${paymentId}"
        style="display:inline-block;background:#ea580c;color:#fff;font-size:13px;font-weight:600;padding:10px 20px;border-radius:8px;text-decoration:none">
        View in Stripe Dashboard →
      </a>
    </td>
  </tr>

  <tr>
    <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 32px;text-align:center">
      <p style="font-size:12px;color:#9ca3af;margin:0">
        United Travel &amp; Tours Limited · Bracknell RG12 1AA ·
        <a href="https://unitedtravels.co.uk" style="color:#ea580c">unitedtravels.co.uk</a>
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ─── Webhook handler ──────────────────────────────────────────────────────────
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
    const intent        = event.data.object as Stripe.PaymentIntent;
    const meta          = intent.metadata;
    const amount        = (intent.amount / 100).toFixed(2);
    const currency      = intent.currency.toUpperCase();
    const customerName  = meta.customerName  || 'Customer';
    const customerEmailAddr = meta.customerEmail || '';
    const itemTitle     = meta.itemTitle     || 'Booking';
    const itemType      = meta.itemType      || '';
    const date          = new Date().toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    // 1. Email to customer
    if (customerEmailAddr) {
      await resend.emails.send({
        from:    'United Travel & Tours <noreply@unitedtravels.co.uk>',
        to:      customerEmailAddr,
        subject: `Booking Confirmed – ${itemTitle}`,
        html:    customerEmail(customerName, itemTitle, itemType, amount, currency, intent.id, date),
      });
    }

    // 2. Notification to business
    await resend.emails.send({
      from:    'United Travel Bookings <noreply@unitedtravels.co.uk>',
      to:      BUSINESS_EMAIL,
      subject: `New Booking: ${itemTitle} – ${currency} ${amount}`,
      html:    businessEmail(customerName, customerEmailAddr, itemTitle, itemType, amount, currency, intent.id, date),
    });

    console.log(`✅ ${intent.id} — ${currency} ${amount} — ${customerEmailAddr}`);
  }

  return NextResponse.json({ received: true });
}
'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements, PaymentElement, useStripe, useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Inner form — uses Stripe hooks
function InnerForm({ amount }: { amount: number }) {
  const stripe   = useStripe();
  const elements = useElements();
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking-success`,
        payment_method_data: {
          billing_details: { name, email },
        },
      },
    });

    if (submitError) {
      setError(submitError.message ?? 'Payment failed');
      setLoading(false);
    }
    // On success Stripe redirects to return_url automatically
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Your details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input value={name} onChange={e => setName(e.target.value)} required
              placeholder="Aakash Subedi"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="aakash@example.com"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Payment</h2>
        {/* This renders Stripe's card/wallet elements */}
        <PaymentElement />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={!stripe || loading}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors shadow-md text-lg">
        {loading ? 'Processing...' : `Pay £${amount}`}
      </button>
    </form>
  );
}

// Outer wrapper — fetches clientSecret and sets up Elements provider
export default function CheckoutForm({ amount, currency, outPageTitle ,type ,id}: {
  amount: number;
  currency: string;
  outPageTitle: string;
  type: string;
  id: string;
}) {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency, outPageTitle,type,id }),
    })
      .then(r => r.json())
      .then(d => setClientSecret(d.clientSecret));
  }, [amount, currency, outPageTitle]);

  if (!clientSecret) return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
      <InnerForm amount={amount} />
    </Elements>
  );
}
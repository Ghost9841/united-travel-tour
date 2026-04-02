'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements, PaymentElement, useStripe, useElements
} from '@stripe/react-stripe-js';
import { CreditCard, Smartphone, Building2, Lock, ShieldCheck, Truck, Headphones, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Payment method selector component
function PaymentMethodSelector({ selectedMethod, onSelect }: { selectedMethod: string; onSelect: (method: string) => void }) {
  const methods = [
    { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
    { id: 'google_pay', name: 'Google Pay', icon: Smartphone, description: 'Fast & secure' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {methods.map((method) => (
        <button
          key={method.id}
          onClick={() => onSelect(method.id)}
          className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
            selectedMethod === method.id
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/50'
          }`}
        >
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            selectedMethod === method.id ? 'bg-orange-500' : 'bg-gray-100'
          }`}>
            <method.icon className={`w-6 h-6 ${
              selectedMethod === method.id ? 'text-white' : 'text-gray-600'
            }`} />
          </div>
          <div className="text-left">
            <p className={`font-semibold ${
              selectedMethod === method.id ? 'text-orange-600' : 'text-gray-900'
            }`}>{method.name}</p>
            <p className="text-xs text-gray-500">{method.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

// Order summary component
function OrderSummary({ amount, currency, type, id }: { amount: number; currency: string; type: string; id: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-4">
        {/* Flight/Product Details */}
        <div className="bg-orange-50 rounded-xl p-4">
          <p className="text-sm text-gray-600 mb-2">Booking Type</p>
          <p className="font-semibold text-gray-900 capitalize">{type} Booking</p>
          <p className="text-xs text-gray-500 mt-1">Reference: #{id}</p>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{currency}{amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Taxes & Fees</span>
            <span>Included</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Service Charge</span>
            <span>Free</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900 text-lg">Total Amount</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-orange-600">{currency}{amount.toLocaleString()}</span>
              <p className="text-xs text-gray-500">All inclusive</p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-gray-50 rounded-xl p-4 mt-4">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="text-center">
              <Lock className="w-4 h-4 mx-auto mb-1 text-green-600" />
              <span>Secure Payment</span>
            </div>
            <div className="text-center">
              <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-blue-600" />
              <span>Fraud Protection</span>
            </div>
            <div className="text-center">
              <Headphones className="w-4 h-4 mx-auto mb-1 text-orange-600" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Payment Methods Accepted */}
        <div className="pt-4">
          <p className="text-xs text-gray-500 mb-2">We accept:</p>
          <div className="flex gap-2">
            {['Visa', 'Mastercard', 'Amex', 'Google Pay'].map((method) => (
              <span key={method} className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">{method}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Inner form — uses Stripe hooks
function InnerForm({ amount, currency, type, id }: { amount: number; currency: string; type: string; id: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    
    setLoading(true);
    setError('');

    // For Google Pay, you might need additional configuration
    // This example uses the standard payment method
    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking-success`,
        payment_method_data: {
          billing_details: { name, email, phone },
        },
      },
    });

    if (submitError) {
      setError(submitError.message ?? 'Payment failed');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4 text-orange-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full name *</label>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email address *</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required
              placeholder="john@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
            <input 
              type="tel" 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
              placeholder="+1 234 567 8900"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-orange-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
        </div>
        
        <PaymentMethodSelector selectedMethod={paymentMethod} onSelect={setPaymentMethod} />
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Card Information</label>
          <PaymentElement />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <button 
        type="submit" 
        disabled={!stripe || loading}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg text-lg"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </div>
        ) : (
          `Pay ${currency}${amount.toLocaleString()}`
        )}
      </button>

      <p className="text-center text-xs text-gray-500">
        By completing this payment, you agree to our Terms of Service and Privacy Policy.
        Your payment is secure and encrypted.
      </p>
    </form>
  );
}

// Outer wrapper — fetches clientSecret and sets up Elements provider
export default function CheckoutForm({ amount, currency, outPageTitle, type, id }: {
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
      body: JSON.stringify({ amount, currency, outPageTitle, type, id }),
    })
      .then(r => r.json())
      .then(d => setClientSecret(d.clientSecret));
  }, [amount, currency, outPageTitle, type, id]);

  if (!clientSecret) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-gray-600">Loading secure checkout...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-amber-500 to-orange-500 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white hover:text-orange-100 mb-4 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-white">Complete Your Payment</h1>
          <p className="text-orange-100 mt-2">Secure checkout powered by Stripe</p>
        </div>

        {/* Main Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Checkout Form (Larger) */}
          <div className="lg:w-2/3 space-y-6">
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
              <InnerForm amount={amount} currency={currency} type={type} id={id} />
            </Elements>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <OrderSummary amount={amount} currency={currency} type={type} id={id} />
          </div>
          
        </div>

        {/* Footer Security Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-white" />
              <span className="text-xs text-white">256-bit SSL Encryption</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span className="text-xs text-white">PCI Compliant</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-white" />
              <span className="text-xs text-white">Instant Confirmation</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
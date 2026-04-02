import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-12 text-center max-w-md">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-500 mb-6">Thank you for booking with United Travel & Tours. You'll receive a confirmation email shortly.</p>
        <Link href="/" className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
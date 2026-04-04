'use client';

import Link from 'next/link';

export default function CheckoutLinkButton({ type, id }: { type: string; id: number }) {
  const checkoutUrl = `/checkout/${type}/${id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("https://unitedtravels.co.uk"+ checkoutUrl);
      alert('Checkout link copied!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex gap-2">

      {/* Open in new tab */}
      <Link
        href={checkoutUrl}
        target="_blank"
        className="px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 rounded"
      >
        Open ↗
      </Link>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="px-4 py-2.5 text-sm text-green-600 hover:bg-green-50 rounded"
      >
        Copy Link
      </button>
    </div>
  );
}
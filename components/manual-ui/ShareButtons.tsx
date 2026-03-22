'use client';

import { useState } from 'react';
import { Link, Facebook } from 'lucide-react';

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyLink = async () => {
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={copyLink}
        className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:text-black rounded-xl text-sm font-medium text-white hover:bg-gray-50 transition-colors"
      >
        <Link className="w-4 h-4" />
        {copied ? 'Copied!' : 'Copy Link'}
      </button>

      <button
        onClick={shareOnFacebook}
        className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-xl text-sm font-medium hover:bg-[#166FE5] transition-colors"
      >
        <Facebook className="w-4 h-4" />
        Share
      </button>
    </div>
  );
}
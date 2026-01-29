'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import CustomLink from './manual-ui/CustomLink';
import Link from 'next/link';
import clsx from 'clsx';

const navItems = [
  { href: '/', title: 'Home' },
  { href: '/aboutus', title: 'About Us' },
  { href: '/explore', title: 'Explore' },
  { href: '/travels', title: 'Travels' },
  { href: '/hotels', title: 'Hotels' },
  { href: '/blogs', title: 'Blogs' },
];

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        'fixed top-0 z-50 w-full transition-colors duration-300',
        isSticky ? 'bg-primary shadow-md' : 'bg-transparent'
      )}
    >
      <div className="flex items-center justify-between w-full mx-auto px-6 py-4">
        <div className="flex items-center">
          <a href="/">
          <Image
            src="/UNITED_Logo-01.svg"
            alt="Logo"
            width={256}
            height={64}
            />
            </a>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map(({ href, title }) => (
            <CustomLink
              key={href}
              href={href}
              title={title}
              className="text-white"
            />
          ))}
        </div>

        <div className="flex items-center gap-6">
          <CustomLink href="/login" title="Login" className="text-white" />
          <Button size="lg" className="rounded-full text-base">
            <Link href="/login">Book Tour</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import CustomLink from './manual-ui/CustomLink';
import Link from 'next/link';

const navItems = [
  { href: '/', title: 'Home' },
  { href: '/explore', title: 'Explore' },
  { href: '/travel', title: 'Travel' },
  { href: '/blog', title: 'Blog' },
  { href: '/pricing', title: 'Pricing' },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full mx-auto">
    
      <div className="flex items-center">
        <Image src="/Logo.svg" alt="Logo" width={180} height={36} />
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

      {/* Actions */}
      <div className="flex items-center gap-6">
        <CustomLink href="/login" title="Login" className="text-white" />
        <Button size="lg" className="rounded-full text-base">
          <Link href={'/signup'}>
          Book Tour
          </Link>
        </Button>
      </div>
    </nav>
  );
}
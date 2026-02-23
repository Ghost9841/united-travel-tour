'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { Menu, Phone } from 'lucide-react';
import CustomLink from './manual-ui/CustomLink';
import Link from 'next/link';
import clsx from 'clsx';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
  useUser
} from '@clerk/nextjs';

const navItems = [
  { href: '/', title: 'Home' },
  { href: '/aboutus', title: 'About Us' },
  { href: '/explore', title: 'Explore' },
  { href: '/travels', title: 'Travels' },
  { href: '/hotels', title: 'Hotels' },
  { href: '/blogs', title: 'Blogs' },
  { href: '/cargo', title: 'Cargo' },
];

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user } = useUser();

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
        isSticky ? 'bg-primary shadow-md' : 'bg-transparent mt-6'
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

        {/* Desktop Navigation */}
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

        {/* Desktop CTA Buttons - Clerk Integrated */}
        <div className="hidden md:flex items-center gap-6">
          <SignedOut>
            {/* Contact Icon Button */}
            <Link href="/contactus">
              <Button variant="ghost" size="icon" aria-label="Contact us">
                <Phone className="h-5 w-5 text-white hover:text-black" />
              </Button>
            </Link>
            <SignInButton mode="modal">
              <button className="text-white hover:text-white/80 font-medium">
                Login
              </button>
            </SignInButton>
            <Button size="lg" className="rounded-full text-base">
              <Link href="/booknow">Book Tour</Link>
            </Button>

          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-4">
              <Link href="/contactus">
              <Button variant="ghost" size="icon" aria-label="Contact us">
                <Phone className="h-5 w-5 text-white hover:text-black" />
              </Button>
            </Link>
              <Button size="lg" className="rounded-full text-base">
                <Link href="/booknow">Book Tour</Link>
              </Button>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "mt-2"
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-primary border-primary/20">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                {/* Mobile Nav Items */}
                <div className="flex flex-col gap-4">
                  {navItems.map(({ href, title }) => (
                    <CustomLink
                      key={href}
                      href={href}
                      title={title}
                      className="text-white text-lg py-2 border-b border-white/10"
                    />
                  ))}
                </div>

                {/* Mobile CTA Section - Clerk Integrated */}
                <div className="flex flex-col gap-4 mt-4">
                  <SignedOut>
                    <Link href="/contactus">
              <Button variant="ghost" size="icon" aria-label="Contact us">
                Contact Us
              </Button>
            </Link>
                    <SignInButton mode="modal">
                      <button className="text-white text-lg text-left py-2 border-b border-white/10">
                        Login
                      </button>
                    </SignInButton>
                    <Button
                      size="lg"
                      className="rounded-full text-base w-full"
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/booknow">Book Tour</Link>
                    </Button>
                  </SignedOut>

                  <SignedIn>
                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                      <span className="text-white text-lg">
                        {user?.firstName || 'Account'}
                      </span>
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "w-8 h-8"
                          }
                        }}
                      />
                    </div>
                    
                    <Button
                      size="lg"
                      className="rounded-full text-base w-full"
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/booknow">Book Tour</Link>
                    </Button>
                    <Link href="/contactus">
              <Button variant="ghost" size="icon" aria-label="Contact us">
                Contact Us
              </Button>
            </Link>
                  </SignedIn>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
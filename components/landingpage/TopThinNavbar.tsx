'use client';

import CustomLink from '../manual-ui/CustomLink';
import { FaFacebookF, FaTwitter, FaShareAlt } from 'react-icons/fa';

const TopThinNavbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-100 hidden sm:block">
      <div className="bg-primary/70 text-white text-xs md:text-sm">
        <div className="max-w-8xl mx-auto md:px-16 py-2 flex items-center justify-end">

          {/* Right: Contact Links + Social Icons */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/95">

            {/* Contact Info using CustomLink */}
            <CustomLink
              href="tel:+123456789"
              title="+123 456 789"
              className="hover:text-white hover:cursor-pointer"
              target='_blank'
            />

            <CustomLink
              href="mailto:info@unitedtravels.com"
              title="info@unitedtravels.com"
              className="hover:text-white"
              target='_blank'
            />

            <CustomLink
              href="/offices"
              title="12345, New York, USA"
              className="hover:text-white"
              target='_blank'
            />

            {/* Social Icons */}
            <div className="flex items-center gap-3 ml-2">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-blue-400"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-sky-400"
              >
                <FaTwitter />
              </a>

              <button
                aria-label="Share"
                className="hover:text-green-400"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'United Travels',
                      url: window.location.href,
                    });
                  }
                }}
              >
                <FaShareAlt />
              </button>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopThinNavbar;

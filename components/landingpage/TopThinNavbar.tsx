// TopThinNavbar.tsx
import CustomLink from '../manual-ui/CustomLink';

const TopThinNavbar = () => {
  const topThinNavbar = [
    { href: '/aboutus',   title: 'About Us' },
    { href: '/blogs',     title: 'Blogs' },
    { href: '/contact',   title: 'Contact' },
    { href: '/offices',   title: 'Our Offices' },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-40">
      <div className="bg-black/40 text-white text-xs md:text-sm">
        <div className="max-w-8xl mx-auto px-8 md:px-16 py-2 flex justify-end">
          <ul className="flex items-center gap-4 md:gap-6">
            {topThinNavbar.map(({ href, title }) => (
              <li key={href}>
                <CustomLink
                  href={href}
                  title={title}
                  className="text-white"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopThinNavbar;
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type CustomLinkProps = {
  href: string;
  title: string;
  className?: string;
  showActive?: boolean; // 👈 NEW
};

export default function CustomLink({
  href,
  title,
  className = '',
  showActive = true, // default ON (navbar behavior)
}: CustomLinkProps) {
  const pathname = usePathname();
  const active = showActive && pathname === href;

  return (
    <Link
      href={href}
      className={clsx('relative inline-block pb-1 group', className)}
    >
      {title}

      <span
        className={clsx(
          'absolute left-0 -bottom-0.5 h-0.5 bg-current',
          'transition-all duration-300 ease-in-out',
          active
            ? 'w-full'
            : showActive
            ? 'w-0 group-hover:w-full'
            : 'w-0 group-hover:w-1/2' 
        )}
      />
    </Link>
  );
}

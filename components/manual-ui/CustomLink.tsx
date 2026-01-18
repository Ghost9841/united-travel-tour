'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function CustomLink({
  href,
  title,
  className = '',
}: {
  href: string;
  title: string;
  className?: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        'relative inline-block pb-1 group', // ← group + inline-block
        className
      )}
    >
      {title}

      {/* animated underline */}
      <span
        className={clsx(
          'absolute left-0 -bottom-0.5 h-[2px] bg-current',
          'transition-all duration-300 ease-in-out',
          active ? 'w-full' : 'w-0 group-hover:w-full'
        )}
      />
    </Link>
  );
}
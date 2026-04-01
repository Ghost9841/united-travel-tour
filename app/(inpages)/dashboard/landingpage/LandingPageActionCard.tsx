// components/dashboard/ActionCard.tsx

import Link from "next/link";
import { ReactNode } from "react";

interface ActionCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
}

export default function LandingPageActionCard({
  title,
  description,
  href,
  icon,
}: ActionCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 mb-8 flex items-center gap-5 group cursor-pointer">
        
        <div className="p-4 bg-orange-50 rounded-2xl group-hover:bg-orange-100 transition-colors flex-shrink-0">
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
            {title}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {description}
          </p>
        </div>

        <span className="text-orange-400 text-sm font-semibold group-hover:translate-x-1 transition-transform flex-shrink-0">
          Manage →
        </span>

      </div>
    </Link>
  );
}
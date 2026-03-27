import { Images } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
    return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto p-6">
                {/* ── Carousel Images card ── */}
        <Link href="/dashboard/landingpage/hero">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 mb-8 flex items-center gap-5 group cursor-pointer">
            <div className="p-4 bg-orange-50 rounded-2xl group-hover:bg-orange-100 transition-colors flex-shrink-0">
              <Images className="w-8 h-8 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                Hero Home Page Carousel Images
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Add, reorder, and manage the images shown in the homepage hero carousel
              </p>
            </div>
            <span className="text-orange-400 text-sm font-semibold group-hover:translate-x-1 transition-transform flex-shrink-0">
              Manage →
            </span>
          </div>
        </Link>
        </div>
        </div>
    );
}
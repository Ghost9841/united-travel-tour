import { Images } from "lucide-react";
import Link from "next/link";
import LandingPageActionCard from "./LandingPageActionCard";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto p-6">
        <LandingPageActionCard
          title="Hero Home Page Carousel Images"
          description="Add, reorder, and manage the images shown in the homepage hero carousel"
          href="/dashboard/landingpage/hero"
          icon={<Images className="w-8 h-8 text-orange-500" />}
        />
        <LandingPageActionCard
          title="Popular Destinations Images"
          description="Add, reorder, and manage the images shown in the homepage popular destinations section"
          href="/dashboard/landingpage/popular-destinations"
          icon={<Images className="w-8 h-8 text-orange-500" />}
        />
         <LandingPageActionCard
          title="Ongoing Fares"
          description="Manage the ongoing fares displayed on the homepage"
          href="/dashboard/landingpage/ongoingfare"
          icon={<Images className="w-8 h-8 text-orange-500" />}
        />
      </div>
    </div>
  );
}
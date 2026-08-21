// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Briefcase,
  Building2,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Globe,
  Hotel,
  LayoutGrid,
  MapPin,
  Package,
  Plane,
  Plus,
  Settings,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";

interface DashboardStats {
  totalAgreements: number;
  pendingAgreements: number;
  completedAgreements: number;
  totalHotels: number;
  totalDestinations: number;
  totalTravels: number;
  totalOffers: number;
  totalTrips: number;
  totalBookings?: number;
  revenue?: number;
}

interface RecentAgreement {
  id: number;
  name: string;
  phoneNumber: string;
  sectorRoute: string;
  journeyType: "ONE_WAY" | "TWO_WAY";
  acceptTerms: boolean;
  date: string | null;
  createdAt: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAgreements: 0,
    pendingAgreements: 0,
    completedAgreements: 0,
    totalHotels: 0,
    totalDestinations: 0,
    totalTravels: 0,
    totalOffers: 0,
    totalTrips: 0,
  });
  const [recentAgreements, setRecentAgreements] = useState<RecentAgreement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch agreements
      const agreementsRes = await fetch("/api/terms-agreement", {
        cache: "no-store",
      });
      
      let agreementsData = [];
      if (agreementsRes.ok) {
        agreementsData = await agreementsRes.json();
        // Get recent agreements (last 5)
        setRecentAgreements(
          agreementsData
            .sort((a: RecentAgreement, b: RecentAgreement) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .slice(0, 5)
        );
      }

      // Fetch counts from various APIs (with error handling for each)
      const [
        hotelsRes,
        destinationsRes,
        travelsRes,
        offersRes,
        tripsRes,
      ] = await Promise.allSettled([
        fetch("/api/hotels", { cache: "no-store" }),
        fetch("/api/destinations", { cache: "no-store" }),
        fetch("/api/travels", { cache: "no-store" }),
        fetch("/api/offers", { cache: "no-store" }),
        fetch("/api/tripplanners", { cache: "no-store" }),
      ]);

      const hotels = hotelsRes.status === "fulfilled" && hotelsRes.value.ok 
        ? await hotelsRes.value.json() 
        : [];
      const destinations = destinationsRes.status === "fulfilled" && destinationsRes.value.ok 
        ? await destinationsRes.value.json() 
        : [];
      const travels = travelsRes.status === "fulfilled" && travelsRes.value.ok 
        ? await travelsRes.value.json() 
        : [];
      const offers = offersRes.status === "fulfilled" && offersRes.value.ok 
        ? await offersRes.value.json() 
        : [];
      const trips = tripsRes.status === "fulfilled" && tripsRes.value.ok 
        ? await tripsRes.value.json() 
        : [];

      // Calculate agreement stats
      const totalAgreements = agreementsData.length;
      const completedAgreements = agreementsData.filter(
        (a: RecentAgreement) => a.acceptTerms
      ).length;
      const pendingAgreements = totalAgreements - completedAgreements;

      setStats({
        totalAgreements,
        pendingAgreements,
        completedAgreements,
        totalHotels: hotels.length || 0,
        totalDestinations: destinations.length || 0,
        totalTravels: travels.length || 0,
        totalOffers: offers.length || 0,
        totalTrips: trips.length || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0b3558] border-t-transparent" />
          <p className="text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0b3558]">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Welcome back! Here&apos;s what&apos;s happening with your travel business.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard/terms-agreement/new"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0b3558] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#092c4a] transition"
            >
              <Plus className="h-4 w-4" />
              New Agreement
            </Link>
            <Link
              href="/dashboard/settings"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <StatCard
            icon={<FileText className="h-5 w-5" />}
            label="Total Agreements"
            value={stats.totalAgreements}
            color="blue"
          />
          <StatCard
            icon={<Clock className="h-5 w-5" />}
            label="Pending"
            value={stats.pendingAgreements}
            color="amber"
          />
          <StatCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Completed"
            value={stats.completedAgreements}
            color="green"
          />
          <StatCard
            icon={<Hotel className="h-5 w-5" />}
            label="Hotels"
            value={stats.totalHotels}
            color="purple"
          />
          <StatCard
            icon={<MapPin className="h-5 w-5" />}
            label="Destinations"
            value={stats.totalDestinations}
            color="rose"
          />
          <StatCard
            icon={<Briefcase className="h-5 w-5" />}
            label="Travels"
            value={stats.totalTravels}
            color="indigo"
          />
          <StatCard
            icon={<Package className="h-5 w-5" />}
            label="Offers"
            value={stats.totalOffers}
            color="orange"
          />
          <StatCard
            icon={<Plane className="h-5 w-5" />}
            label="Trip Planners"
            value={stats.totalTrips}
            color="teal"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Agreements */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Recent Agreements
                  </h2>
                  <p className="text-sm text-gray-500">
                    Latest terms agreements
                  </p>
                </div>
                <Link
                  href="/dashboard/terms-agreement"
                  className="text-sm font-medium text-[#0b3558] hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="divide-y divide-gray-100">
                {recentAgreements.length === 0 ? (
                  <div className="px-6 py-8 text-center text-sm text-gray-500">
                    No agreements found
                  </div>
                ) : (
                  recentAgreements.map((agreement) => (
                    <Link
                      key={agreement.id}
                      href={`/dashboard/terms-agreement/${agreement.id}`}
                      className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b3558]/10">
                          <Users className="h-5 w-5 text-[#0b3558]" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {agreement.name}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>{agreement.phoneNumber}</span>
                            <span>•</span>
                            <span>{agreement.sectorRoute}</span>
                            <span>•</span>
                            <span>{agreement.journeyType === "TWO_WAY" ? "Return" : "One Way"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {agreement.acceptTerms ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                            <CheckCircle2 className="h-3 w-3" />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                            <Clock className="h-3 w-3" />
                            Pending
                          </span>
                        )}
                        <span className="text-xs text-gray-400">
                          {new Date(agreement.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions / Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 p-4">
                <QuickAction
                  icon={<FileText className="h-5 w-5" />}
                  label="New Agreement"
                  href="/dashboard/terms-agreement/new"
                  color="blue"
                />
                <QuickAction
                  icon={<Hotel className="h-5 w-5" />}
                  label="Add Hotel"
                  href="/dashboard/hotels/new"
                  color="purple"
                />
                <QuickAction
                  icon={<MapPin className="h-5 w-5" />}
                  label="Add Destination"
                  href="/dashboard/destinations/new"
                  color="rose"
                />
                <QuickAction
                  icon={<Package className="h-5 w-5" />}
                  label="Add Offer"
                  href="/dashboard/offers/new"
                  color="orange"
                />
                <QuickAction
                  icon={<Plane className="h-5 w-5" />}
                  label="Trip Planner"
                  href="/dashboard/tripplanners/new"
                  color="teal"
                />
                <QuickAction
                  icon={<Briefcase className="h-5 w-5" />}
                  label="Add Travel"
                  href="/dashboard/travels/new"
                  color="indigo"
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="font-semibold text-gray-900">Quick Stats</h2>
              </div>
              <div className="space-y-3 p-4">
                <QuickStat
                  label="Agreement Completion Rate"
                  value={
                    stats.totalAgreements > 0
                      ? `${Math.round((stats.completedAgreements / stats.totalAgreements) * 100)}%`
                      : "0%"
                  }
                  progress={
                    stats.totalAgreements > 0
                      ? (stats.completedAgreements / stats.totalAgreements) * 100
                      : 0
                  }
                  color="green"
                />
                <QuickStat
                  label="Total Destinations"
                  value={stats.totalDestinations.toString()}
                  progress={Math.min((stats.totalDestinations / 20) * 100, 100)}
                  color="blue"
                />
                <QuickStat
                  label="Total Hotels"
                  value={stats.totalHotels.toString()}
                  progress={Math.min((stats.totalHotels / 15) * 100, 100)}
                  color="purple"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// STAT CARD COMPONENT
// ==========================================

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "blue" | "amber" | "green" | "purple" | "rose" | "indigo" | "orange" | "teal";
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    rose: "bg-rose-50 text-rose-600",
    indigo: "bg-indigo-50 text-indigo-600",
    orange: "bg-orange-50 text-orange-600",
    teal: "bg-teal-50 text-teal-600",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2.5 ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// QUICK ACTION COMPONENT
// ==========================================

function QuickAction({
  icon,
  label,
  href,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: "blue" | "purple" | "rose" | "orange" | "teal" | "indigo";
}) {
  const colorClasses = {
    blue: "hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600",
    purple: "hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600",
    rose: "hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600",
    orange: "hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600",
    teal: "hover:bg-teal-50 hover:border-teal-200 hover:text-teal-600",
    indigo: "hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600",
  };

  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1.5 rounded-lg border border-gray-200 p-3 text-center transition ${colorClasses[color]}`}
    >
      {icon}
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </Link>
  );
}

// ==========================================
// QUICK STAT COMPONENT
// ==========================================

function QuickStat({
  label,
  value,
  progress,
  color,
}: {
  label: string;
  value: string;
  progress: number;
  color: "green" | "blue" | "purple";
}) {
  const colorClasses = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
  };

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-bold text-gray-900">{value}</span>
      </div>
      <div className="mt-1.5 h-2 w-full rounded-full bg-gray-100">
        <div
          className={`h-2 rounded-full ${colorClasses[color]} transition-all duration-500`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}
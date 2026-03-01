"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  DollarSign,
  Search,
  Plus,
  Globe2,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";


import { ApiResponse } from '@/app/api/travels/types';
import { Travel } from "@prisma/client";
import { EmptyState, StatCard, TravelCard, TravelGridSkeleton } from "./CallingComp";



// Main Component
export default function TravelsAdminPage() {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchTravels();
  }, []);

  const fetchTravels = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/travels");
      const data: ApiResponse = await res.json();
      
      if (data.success && data.data) {
        if (Array.isArray(data.data)) {
          setTravels(data.data);
        } else if (data.data.travels && Array.isArray(data.data.travels)) {
          setTravels(data.data.travels);
        }
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTravel = async (id: number) => {
    if (!confirm("Are you sure you want to delete this travel package?")) return;

    try {
      const res = await fetch(`/api/travels/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTravels(prev => prev.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const filtered = travels.filter(travel =>
    travel.title.toLowerCase().includes(query.toLowerCase()) ||
    travel.location.toLowerCase().includes(query.toLowerCase()) ||
    travel.category.toLowerCase().includes(query.toLowerCase())
  );

  // Calculate stats
  const totalTravels = travels.length;
  const avgRating = travels.reduce((sum, t) => sum + t.rating, 0) / totalTravels || 0;
  const totalRevenue = travels.reduce((sum, t) => sum + t.price, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto p-6">
          <TravelGridSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Travel Packages</h1>
            <p className="text-sm text-muted-foreground">
              Manage your travel offerings and track performance
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search travels..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button asChild>
              <Link href="/dashboard/travels/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Travel
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Packages"
            value={totalTravels}
            icon={Globe2}
          />
          <StatCard
            label="Average Rating"
            value={Number(avgRating.toFixed(1))}
            icon={Star}
          />
          <StatCard
            label="Total Revenue"
            value={totalRevenue}
            icon={DollarSign}
          />
          <StatCard
            label="Active Tours"
            value={travels.filter(t => t.rating > 4).length}
            icon={MapPin}
          />
        </div>

        <Separator />

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(travels.map(t => t.category))).map(category => (
            <Badge 
              key={category} 
              variant="outline"
              className="px-3 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition"
              onClick={() => setQuery(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Travel Grid */}
        {filtered.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((travel) => (
              <TravelCard
                key={travel.id}
                travel={travel}
                onDelete={() => deleteTravel(travel.id)}
                onView={() => {
                  // Handle view - could open a sheet or navigate
                  window.location.href = `/dashboard/travels/${travel.id}`;
                }}
              />
            ))}
          </div>
        )}

        {/* Results count */}
        {filtered.length > 0 && (
          <p className="text-sm text-muted-foreground text-center">
            Showing {filtered.length} of {totalTravels} travel packages
          </p>
        )}
      </div>
    </div>
  );
}
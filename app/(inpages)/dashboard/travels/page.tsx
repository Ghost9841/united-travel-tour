"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  DollarSign,
  Clock,
  Users,
  Tag,
  Eye,
  Heart,
  Search,
  Plus,
  Edit3,
  Trash2,
  MoreHorizontal,
  Globe2,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { ApiResponse } from '@/app/api/travels/types';
import { Travel } from "@prisma/client";

// Stat Card Component
function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="border rounded-lg p-4 flex items-center justify-between bg-card hover:shadow-md transition">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </div>
  );
}

// Travel Card Component
function TravelCard({
  travel,
  onDelete,
  onView,
}: {
  travel: Travel;
  onDelete: () => void;
  onView: () => void;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden" onClick={onView}>
        <img
          src={travel.image}
          alt={travel.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <Badge 
          className="absolute top-3 right-3"
          variant="secondary"
        >
          {travel.category}
        </Badge>
      </div>

      <CardContent className="p-4" onClick={onView}>
        {/* Title and Location */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition">
            {travel.title}
          </h3>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{travel.location}</span>
          </div>
        </div>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              ${travel.price}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ${travel.originalPrice}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{travel.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({travel.reviews})
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span className="line-clamp-1">{travel.duration}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="h-3.5 w-3.5 mr-1" />
            <span className="line-clamp-1">{travel.groupSize}</span>
          </div>
        </div>

        {/* Description Preview */}
        <p className="text-sm text-muted-foreground line-clamp-2 mt-3">
          {travel.description}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between border-t mt-2">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> 1.2k
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" /> 345
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/travels/${travel.id}`} className="flex items-center gap-2">
                <Edit3 className="h-3.5 w-3.5" /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onDelete} 
              className="text-destructive flex items-center gap-2"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}

// Skeleton Loader
function TravelGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Empty State
function EmptyState({ query }: { query: string }) {
  return (
    <div className="text-center py-16">
      <Globe2 className="mx-auto h-12 w-12 text-muted-foreground" />
      <p className="mt-4 text-lg font-medium">
        {query ? `No travels match “${query}”` : "No travels added yet"}
      </p>
      <p className="text-sm text-muted-foreground">
        Start adding travel packages to see them here.
      </p>
      <Button className="mt-4" asChild>
        <Link href="/dashboard/travels/new">
          <Plus className="h-4 w-4 mr-2" />
          Add your first travel
        </Link>
      </Button>
    </div>
  );
}

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
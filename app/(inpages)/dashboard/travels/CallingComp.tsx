import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  Users,
  Heart,
  Plus,
  Edit3,
  Trash2,
  MoreHorizontal,
  Globe2,
  Star,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Travel } from "@prisma/client";




export function StatCard({
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

export function TravelCard({
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
            <MapPin className="h-3.5 w-3.5 mr-1 shrink-0" />
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
export function TravelGridSkeleton() {
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
export function EmptyState({ query }: { query: string }) {
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
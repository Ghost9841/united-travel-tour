"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  X,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Tag,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import  {toast} from "sonner"
import { Skeleton } from "@/components/ui/skeleton";

import Travel, { ApiResponse } from '@/app/api/travels/types';

// Reuse the same categories, durations, group sizes from the new page
const CATEGORIES = [
  "City Tour",
  "Adventure",
  "Beach",
  "Cultural",
  "Wildlife",
  "Mountain",
  "Cruise",
  "Honeymoon",
  "Family",
  "Luxury",
];

const DURATIONS = [
  "2 Days / 1 Night",
  "3 Days / 2 Nights",
  "4 Days / 3 Nights",
  "5 Days / 4 Nights",
  "6 Days / 5 Nights",
  "7 Days / 6 Nights",
  "8 Days / 7 Nights",
  "10 Days / 9 Nights",
  "14 Days / 13 Nights",
];

const GROUP_SIZES = [
  "1-2 people",
  "2-4 people",
  "2-6 people",
  "2-8 people",
  "4-8 people",
  "4-10 people",
  "6-12 people",
  "8-15 people",
  "10-20 people",
];

export default function EditTravelPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    groupSize: "",
    image: "",
  });

  const travelId = params.id;

  useEffect(() => {
    if (travelId) {
      fetchTravel();
    }
  }, [travelId]);

  const fetchTravel = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/travels/${travelId}`);
      const data = await res.json();

      if (data.success && data.data) {
        const travel = data.data.travel || data.data;
        setFormData({
          title: travel.title || "",
          location: travel.location || "",
          description: travel.description || "",
          price: travel.price?.toString() || "",
          duration: travel.duration || "",
          category: travel.category || "",
          groupSize: travel.groupSize || "",
          image: travel.image || "",
        });
        setImagePreview(travel.image || "");
      } else {
        toast("Error",{
          description: "Travel package not found",
        });
        router.push("/dashboard/travels");
      }
    } catch (error) {
      console.error("Failed to fetch travel", error);
      toast("Error",{
        description: "Failed to load travel package",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "image" && value) {
      setImagePreview(value);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Log the data being sent
    const submitData = {
      ...formData,
      price: Number(formData.price),
    };
    console.log("Submitting data:", submitData);

    const res = await fetch("/api/travels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData),
    });

    console.log("Response status:", res.status);
    
    const data = await res.json();
    console.log("Response data:", data);

    if (data.success) {
      toast("Success!", {
        description: "Travel package created successfully.",
      });
      router.push("/dashboard/travels");
    } else {
      toast("Error", {
        description: data.error || "Failed to create travel package.",
      });
    }
  } catch (error) {
    console.error("Failed to create", error);
    toast("Error", {
      description: "Something went wrong. Please try again.",
    });
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/travels/${travelId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast("Success!",{
          description: "Travel package deleted successfully.",
        });
        router.push("/dashboard/travels");
      } else {
        toast("Error",{
          description: data.error || "Failed to delete travel package.",
        });
      }
    } catch (error) {
      console.error("Failed to delete", error);
      toast("Error",{
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-10 w-10" />
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/travels">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Edit Travel Package</h1>
              <p className="text-sm text-muted-foreground">
                Update the details of your travel experience
              </p>
            </div>
          </div>

          {/* Delete Button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  travel package &quot;{formData.title}&quot;.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            {/* Main Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Update the essential details about the travel package
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Package Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Romantic Paris Getaway"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g., Paris, France"
                      className="pl-9"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the travel experience, highlights, itinerary, etc."
                    rows={5}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing and Details */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Details</CardTitle>
                <CardDescription>
                  Update the price and other important details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="499"
                        className="pl-9"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Select
                        value={formData.duration}
                        onValueChange={(value) => handleSelectChange("duration", value)}
                        required
                      >
                        <SelectTrigger className="pl-9">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {DURATIONS.map((duration) => (
                            <SelectItem key={duration} value={duration}>
                              {duration}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                        required
                      >
                        <SelectTrigger className="pl-9">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="groupSize">Group Size *</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Select
                        value={formData.groupSize}
                        onValueChange={(value) => handleSelectChange("groupSize", value)}
                        required
                      >
                        <SelectTrigger className="pl-9">
                          <SelectValue placeholder="Select group size" />
                        </SelectTrigger>
                        <SelectContent>
                          {GROUP_SIZES.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Image */}
            <Card>
              <CardHeader>
                <CardTitle>Package Image</CardTitle>
                <CardDescription>
                  Update the image for your travel package
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="image"
                      name="image"
                      placeholder="https://example.com/image.jpg"
                      className="pl-9"
                      value={formData.image}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {imagePreview && (
                  <div className="relative mt-4 rounded-lg overflow-hidden border">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                      onError={() => setImagePreview("")}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImagePreview("");
                        setFormData((prev) => ({ ...prev, image: "" }));
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                asChild
              >
                <Link href="/dashboard/travels">Cancel</Link>
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
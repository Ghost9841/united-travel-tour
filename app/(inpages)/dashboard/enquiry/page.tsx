// app/dashboard/enquiry/page.tsx

"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { format } from "date-fns";
import {
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  enquiryMessage: string | null;
  airlineName: string | null;
  sectorRoute: string | null;
  journeyType: "TWO_WAY" | "ONE_WAY" | null;
  departureDate: string | null;
  returnDate: string | null;
  status: "PENDING" | "CONTACTED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

const EnquiryDashboardPage = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/enquiry");
      if (!response.ok) throw new Error("Failed to fetch enquiries");
      const data = await response.json();
      setEnquiries(data);
    } catch (error) {
      toast.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateEnquiryStatus = async (id: string, status: Enquiry["status"]) => {
    try {
      const response = await fetch(`/api/enquiry/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      toast.success("Status Updated", {
        description: `Enquiry status changed to ${status.toLowerCase()}`,
      });

      fetchEnquiries();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      const response = await fetch(`/api/enquiry/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete enquiry");

      toast.success("Enquiry Deleted", {
        description: "The enquiry has been removed.",
      });

      fetchEnquiries();
    } catch (error) {
      toast.error("Failed to delete enquiry");
    }
  };

  const getStatusBadge = (status: Enquiry["status"]) => {
    const statusConfig = {
      PENDING: { color: "bg-yellow-500", label: "Pending" },
      CONTACTED: { color: "bg-blue-500", label: "Contacted" },
      COMPLETED: { color: "bg-green-500", label: "Completed" },
      CANCELLED: { color: "bg-red-500", label: "Cancelled" },
    };

    const config = statusConfig[status];
    return (
      <Badge className={`${config.color} text-white`}>
        {config.label}
      </Badge>
    );
  };

  const filteredEnquiries = enquiries.filter((enquiry) =>
    enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.phoneNumber.includes(searchTerm) ||
    (enquiry.airlineName?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enquiries</h1>
          <p className="text-muted-foreground">
            Manage and track all flight enquiries
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchEnquiries}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{enquiries.length}</div>
            <p className="text-sm text-muted-foreground">Total Enquiries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {enquiries.filter(e => e.status === "PENDING").length}
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">
              {enquiries.filter(e => e.status === "CONTACTED").length}
            </div>
            <p className="text-sm text-muted-foreground">Contacted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {enquiries.filter(e => e.status === "COMPLETED").length}
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, phone, or airline..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Enquiries Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Airline</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Journey</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    Loading enquiries...
                  </TableCell>
                </TableRow>
              ) : filteredEnquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No enquiries found
                  </TableCell>
                </TableRow>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <TableRow key={enquiry.id}>
                    <TableCell className="font-medium">{enquiry.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{enquiry.email}</div>
                        <div className="text-xs text-muted-foreground">{enquiry.phoneNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>{enquiry.airlineName || "-"}</TableCell>
                    <TableCell>{enquiry.sectorRoute || "-"}</TableCell>
                    <TableCell>
                      {enquiry.journeyType === "TWO_WAY" ? "Two Way" : "One Way"}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {enquiry.departureDate && format(new Date(enquiry.departureDate), "MM/dd/yyyy")}
                        {enquiry.returnDate && (
                          <>
                            <br />
                            <span className="text-xs text-muted-foreground">
                              Return: {format(new Date(enquiry.returnDate), "MM/dd/yyyy")}
                            </span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(enquiry.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedEnquiry(enquiry);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => updateEnquiryStatus(enquiry.id, "CONTACTED")}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Mark as Contacted
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateEnquiryStatus(enquiry.id, "COMPLETED")}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Mark as Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateEnquiryStatus(enquiry.id, "CANCELLED")}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Cancel Enquiry
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => deleteEnquiry(enquiry.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Enquiry Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
            <DialogDescription>
              Full details of the enquiry and customer information.
            </DialogDescription>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Name</Label>
                  <p className="font-medium">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedEnquiry.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium">{selectedEnquiry.phoneNumber}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedEnquiry.status)}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Airline</Label>
                  <p className="font-medium">{selectedEnquiry.airlineName || "-"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Route</Label>
                  <p className="font-medium">{selectedEnquiry.sectorRoute || "-"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Journey Type</Label>
                  <p className="font-medium">
                    {selectedEnquiry.journeyType === "TWO_WAY" ? "Two Way" : "One Way"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Departure Date</Label>
                  <p className="font-medium">
                    {selectedEnquiry.departureDate && 
                      format(new Date(selectedEnquiry.departureDate), "MM/dd/yyyy")}
                  </p>
                </div>
                {selectedEnquiry.returnDate && (
                  <div>
                    <Label className="text-muted-foreground">Return Date</Label>
                    <p className="font-medium">
                      {format(new Date(selectedEnquiry.returnDate), "MM/dd/yyyy")}
                    </p>
                  </div>
                )}
                <div className="col-span-2">
                  <Label className="text-muted-foreground">Enquiry Message</Label>
                  <p className="font-medium mt-1 p-3 bg-gray-50 rounded-md">
                    {selectedEnquiry.enquiryMessage || "No message provided"}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Created</Label>
                  <p className="font-medium text-sm">
                    {format(new Date(selectedEnquiry.createdAt), "MM/dd/yyyy HH:mm")}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Last Updated</Label>
                  <p className="font-medium text-sm">
                    {format(new Date(selectedEnquiry.updatedAt), "MM/dd/yyyy HH:mm")}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            {selectedEnquiry && selectedEnquiry.status === "PENDING" && (
              <Button
                onClick={() => {
                  updateEnquiryStatus(selectedEnquiry.id, "CONTACTED");
                  setIsDialogOpen(false);
                }}
              >
                Mark as Contacted
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnquiryDashboardPage;
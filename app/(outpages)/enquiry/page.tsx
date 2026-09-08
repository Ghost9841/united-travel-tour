// app/outpage/enquiry/page.tsx

"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Shadcn UI imports
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Form validation schema
const enquiryFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  enquiryMessage: z.string().optional(),
  airlineName: z.string().optional(),
  sectorRoute: z.string().optional(),
  journeyType: z.enum(["TWO_WAY", "ONE_WAY"]).optional(),
  departureDate: z.date().optional(),
  returnDate: z.date().optional(),
});

type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;

// Example airline data
const AIRLINES = [
  "Nepal Airlines",
  "Qatar Airways",
  "Emirates",
  "Turkish Airlines",
  "Singapore Airlines",
  "Thai Airways",
  "Malaysia Airlines",
  "Etihad Airways",
  "Air India",
  "Buddha Air",
  "Yeti Airlines",
  "Other",
];

const EnquiryPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      enquiryMessage: "",
      airlineName: "",
      sectorRoute: "",
      journeyType: "TWO_WAY",
    },
  });

  const journeyType = form.watch("journeyType");

  async function onSubmit(data: EnquiryFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit enquiry");
      }
      toast.success("Enquiry submitted successfully!");
      
      form.reset();
    } catch (error) {
      toast.error("Failed to submit enquiry");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-primary/50 py-10 px-4">
      <div className=" max-w-3xl mx-auto mt-16">
        <Card className="shadow-2xl border mt-0 p-0">
          <CardHeader className="space-y-2 bg-primary text-white rounded-t-xl p-12">
            <CardTitle className="text-4xl font-bold">Flight Enquiry</CardTitle>
            <CardDescription className="text-blue-100 text-base">
              Fill in the details below and we'll get back to you with the best flight options.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Full Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="h-12 border-gray-300 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Email Address *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john@example.com"
                          type="email"
                          {...field}
                          className="h-12 border-gray-300 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number Field */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Phone Number *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+977 9800000000"
                          {...field}
                          className="h-12 border-gray-300 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Enquiry Message Field */}
                <FormField
                  control={form.control}
                  name="enquiryMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Enquiry Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your travel requirements..."
                          {...field}
                          className="min-h-[100px] border-gray-300 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormDescription>
                        Any specific requirements or preferences?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Airline Name Field */}
                <FormField
                  control={form.control}
                  name="airlineName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Airline Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500">
                            <SelectValue placeholder="Select an airline" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {AIRLINES.map((airline) => (
                            <SelectItem key={airline} value={airline}>
                              {airline}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        e.g. Nepal Airlines
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sector/Route Field */}
                <FormField
                  control={form.control}
                  name="sectorRoute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Sector / Route</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="KTM - LHR"
                          {...field}
                          className="h-12 border-gray-300 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormDescription>
                        e.g. KTM - LHR (Kathmandu to London Heathrow)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Journey Type Field */}
                <FormField
                  control={form.control}
                  name="journeyType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-gray-700 font-semibold">Journey Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1 sm:flex-row sm:space-x-8 sm:space-y-0"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="TWO_WAY" className="border-gray-400" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Return / Two Way
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="ONE_WAY" className="border-gray-400" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              One Way
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Departure Date Field */}
                <FormField
                  control={form.control}
                  name="departureDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-gray-700 font-semibold">Departure Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "h-12 w-full pl-3 text-left font-normal border-gray-300",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "MM/dd/yyyy")
                              ) : (
                                <span>Select departure date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        mm/dd/yyyy
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Return Date Field - Conditional */}
                {journeyType === "TWO_WAY" && (
                  <FormField
                    control={form.control}
                    name="returnDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-gray-700 font-semibold">Return Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "h-12 w-full pl-3 text-left font-normal border-gray-300",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "MM/dd/yyyy")
                                ) : (
                                  <span>Select return date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                const departureDate = form.getValues("departureDate");
                                return date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                  !!(departureDate && date < departureDate);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          mm/dd/yyyy
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Submitting...
                    </>
                  ) : (
                    "Submit Enquiry ✈️"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnquiryPage;
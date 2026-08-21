// app/dashboard/terms-agreement/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  CheckCircle2,
  Clock3,
  Loader2,
  Lock,
  Save,
  User,
  Phone,
  FileText,
  ChevronDown,
  PlaneTakeoff,
  PlaneLanding,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface TermsVersion {
  id: number;
  version: string;
  title: string;
  englishText: string;
  nepaliText: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Agreement {
  id: number;
  name: string;
  phoneNumber: string;
  sectorRoute: string;
  journeyType: "TWO_WAY" | "ONE_WAY";
  termsVersionId: number;
  termsVersion: TermsVersion;
  englishSnapshot: string;
  nepaliSnapshot: string;
  departureDate: string | null;
  returnDate: string | null;
  date: string | null;
  acceptTerms: boolean;
  customerSignature: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AgreementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [agreement, setAgreement] = useState<Agreement | null>(null);
  const [versions, setVersions] = useState<TermsVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [error, setError] = useState("");

  // Form state for admin edits
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sectorRoute, setSectorRoute] = useState("");
  const [journeyType, setJourneyType] = useState<"TWO_WAY" | "ONE_WAY">("TWO_WAY");
  const [termsVersionId, setTermsVersionId] = useState<number | "">("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // ==========================================
  // LOAD AGREEMENT & VERSIONS
  // ==========================================

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [agreementResponse, versionsResponse] = await Promise.all([
        fetch(`/api/terms-agreement/${id}`, {
          cache: "no-store",
        }),
        fetch("/api/terms-agreement/terms-versions", {
          cache: "no-store",
        }),
      ]);

      const agreementData = await agreementResponse.json();
      const versionsData = await versionsResponse.json();

      if (!agreementResponse.ok) {
        throw new Error(agreementData.error || "Failed to load agreement");
      }

      if (!versionsResponse.ok) {
        throw new Error(versionsData.error || "Failed to load terms versions");
      }

      setAgreement(agreementData);
      setVersions(versionsData);

      // Populate form state
      setName(agreementData.name || "");
      setPhoneNumber(agreementData.phoneNumber || "");
      setSectorRoute(agreementData.sectorRoute || "");
      setJourneyType(agreementData.journeyType || "TWO_WAY");
      setTermsVersionId(agreementData.termsVersionId || "");
      
      // Populate dates
      if (agreementData.departureDate) {
        setDepartureDate(
          new Date(agreementData.departureDate).toISOString().split("T")[0]
        );
      }
      if (agreementData.returnDate) {
        setReturnDate(
          new Date(agreementData.returnDate).toISOString().split("T")[0]
        );
      }
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error ? error.message : "Failed to load agreement."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // ==========================================
  // GET SELECTED VERSION
  // ==========================================

  const getSelectedVersion = () => {
    if (termsVersionId) {
      return versions.find((v) => v.id === Number(termsVersionId));
    }
    return agreement?.termsVersion;
  };

  const selectedVersion = getSelectedVersion();

  // ==========================================
  // SAVE CHANGES (Admin can edit until accepted)
  // ==========================================

  const saveChanges = async () => {
    try {
      setSaving(true);
      setError("");

      // Validate dates
      if (!departureDate) {
        setError("Departure date is required.");
        setSaving(false);
        return;
      }

      if (journeyType === "TWO_WAY" && !returnDate) {
        setError("Return date is required for TWO_WAY journeys.");
        setSaving(false);
        return;
      }

      if (returnDate && new Date(returnDate) < new Date(departureDate)) {
        setError("Return date must be after departure date.");
        setSaving(false);
        return;
      }

      // Get the selected version's text for snapshots
      const version = versions.find((v) => v.id === Number(termsVersionId));
      
      const payload: any = {
        name,
        phoneNumber,
        sectorRoute,
        journeyType,
        termsVersionId: termsVersionId ? Number(termsVersionId) : undefined,
        departureDate: new Date(departureDate).toISOString(),
        returnDate: returnDate ? new Date(returnDate).toISOString() : null,
      };

      // If a version is selected, include the snapshot texts
      if (version) {
        payload.englishSnapshot = version.englishText;
        payload.nepaliSnapshot = version.nepaliText;
      }

      const response = await fetch(`/api/terms-agreement/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save changes");
      }

      setAgreement(data);
      toast.success("Agreement updated successfully.");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to save."
      );
      toast.error(error instanceof Error ? error.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // COPY CUSTOMER LINK
  // ==========================================

  const customerLink = `${window.location.origin}/terms-agreement/${id}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(customerLink);
      setCopySuccess(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy link.");
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Not set";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc]">
        <Loader2 className="h-7 w-7 animate-spin text-[#0b3558]" />
      </div>
    );
  }

  // ==========================================
  // ERROR / NOT FOUND
  // ==========================================

  if (!agreement) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] p-6">
        <div className="mx-auto max-w-3xl rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-800">Agreement not found</h2>
          <p className="mt-2 text-sm text-red-700">
            {error || "The requested agreement could not be found."}
          </p>
          <button
            onClick={() => router.push("/dashboard/terms-agreement")}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0b3558] px-4 py-2 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Agreements
          </button>
        </div>
      </div>
    );
  }

  const locked = agreement.acceptTerms;

  // Determine which text to show (selected version or existing snapshot)
  const englishText = selectedVersion?.englishText || agreement.englishSnapshot || "No English terms available";
  const nepaliText = selectedVersion?.nepaliText || agreement.nepaliSnapshot || "No Nepali terms available";

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="border-b border-gray-200 bg-white">
        <div className="px-6 py-5">
          <Link
            href="/dashboard/terms-agreement"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0b3558]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Agreements
          </Link>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-[#0b3558]">
                  Agreement #{agreement.id}
                </h1>

                {locked ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    <Clock3 className="h-3.5 w-3.5" />
                    Pending
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-gray-500">
                {agreement.name}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={copyLink}
                className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium transition ${
                  copySuccess
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {copySuccess ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy Link
                  </>
                )}
              </button>

              <Link
                href={`/terms-agreement/${agreement.id}`}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0b3558] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#092c4a]"
              >
                <ExternalLink className="h-4 w-4" />
                Customer Form
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-6 p-6">
        {/* ==========================================
            STATUS ALERT
        ========================================== */}

        {locked ? (
          <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div className="flex-1">
              <p className="font-semibold text-green-800">
                Terms Accepted
              </p>
              <p className="text-sm text-green-700">
                This agreement is locked because the customer has already accepted the terms.
              </p>
            </div>
            <Lock className="h-5 w-5 text-green-600" />
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <Clock3 className="h-5 w-5 text-amber-600" />
            <div className="flex-1">
              <p className="font-semibold text-amber-800">
                Waiting for Customer
              </p>
              <p className="text-sm text-amber-700">
                Send the customer the link to complete the agreement.
              </p>
            </div>
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          </div>
        )}

        {/* ==========================================
            ERROR ALERT
        ========================================== */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* ==========================================
            PASSENGER / BOOKING DETAILS
        ========================================== */}

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="font-semibold text-gray-900">
              Passenger / Booking Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {locked ? "Read-only - Customer has accepted the terms" : "Edit passenger details"}
            </p>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2">
            <Field
              label="Passenger Name"
              value={name}
              disabled={locked}
              onChange={setName}
              icon={<User className="h-4 w-4" />}
            />

            <Field
              label="Phone Number"
              value={phoneNumber}
              disabled={locked}
              onChange={setPhoneNumber}
              icon={<Phone className="h-4 w-4" />}
            />

            <Field
              label="Sector / Route"
              value={sectorRoute}
              disabled={locked}
              onChange={setSectorRoute}
              icon={<FileText className="h-4 w-4" />}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Journey Type
              </label>

              <select
                value={journeyType}
                disabled={locked}
                onChange={(e) => {
                  const newType = e.target.value as "TWO_WAY" | "ONE_WAY";
                  setJourneyType(newType);
                  // Clear return date when switching to ONE_WAY
                  if (newType === "ONE_WAY") {
                    setReturnDate("");
                  }
                }}
                className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#0b3558] focus:ring-2 focus:ring-[#0b3558]/10 disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="ONE_WAY">One Way</option>
                <option value="TWO_WAY">Return / Two Way</option>
              </select>
            </div>

            {/* Departure Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 flex items-center gap-2">
                <PlaneTakeoff className="h-4 w-4" />
                Departure Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={departureDate}
                disabled={locked}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#0b3558] focus:ring-2 focus:ring-[#0b3558]/10 disabled:bg-gray-100 disabled:text-gray-500"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Return Date - Only for TWO_WAY */}
            {journeyType === "TWO_WAY" && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <PlaneLanding className="h-4 w-4" />
                  Return Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={returnDate}
                  disabled={locked}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#0b3558] focus:ring-2 focus:ring-[#0b3558]/10 disabled:bg-gray-100 disabled:text-gray-500"
                  min={departureDate || new Date().toISOString().split("T")[0]}
                />
                {departureDate && returnDate && new Date(returnDate) < new Date(departureDate) && (
                  <p className="mt-1 text-xs text-red-500">
                    Return date must be after departure date
                  </p>
                )}
              </div>
            )}

            {/* Terms Version Selector */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Terms & Conditions Version
              </label>

              <select
                value={termsVersionId}
                disabled={locked}
                onChange={(e) =>
                  setTermsVersionId(e.target.value ? Number(e.target.value) : "")
                }
                className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#0b3558] focus:ring-2 focus:ring-[#0b3558]/10 disabled:bg-gray-100 disabled:text-gray-500"
              >
                <option value="">Select Terms Version</option>
                {versions.map((version) => (
                  <option key={version.id} value={version.id}>
                    Version {version.version} — {version.title}
                    {version.status === "active" ? " (Active)" : ""}
                  </option>
                ))}
              </select>

              <p className="mt-1 text-xs text-gray-500">
                Changing the version will update the terms snapshots
              </p>
            </div>
          </div>

          {!locked && (
            <div className="flex justify-end border-t border-gray-200 px-6 py-4">
              <button
                onClick={saveChanges}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0b3558] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#092c4a] disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* ==========================================
            TRAVEL DATES (Read-only display)
        ========================================== */}

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-[#0b3558]" />
              Travel Dates
            </h2>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2">
            <Info
              label="Departure Date"
              value={formatDate(agreement.departureDate)}
              icon={<PlaneTakeoff className="h-4 w-4" />}
            />

            <Info
              label="Return Date"
              value={agreement.journeyType === "TWO_WAY" ? formatDate(agreement.returnDate) : "N/A (One Way)"}
              icon={<PlaneLanding className="h-4 w-4" />}
            />
          </div>
        </div>

        {/* ==========================================
            TERMS & CONDITIONS
        ========================================== */}

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <button
            onClick={() => setShowTerms(!showTerms)}
            className="flex w-full items-center justify-between border-b border-gray-200 px-6 py-5 text-left"
          >
            <div>
              <h2 className="font-semibold text-gray-900">
                Terms & Conditions
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Version {selectedVersion?.version || agreement.termsVersion?.version || "N/A"}
                {selectedVersion?.status === "active" && " (Active)"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {agreement.acceptTerms && (
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  Accepted Version
                </span>
              )}
              <ChevronDown
                className={`h-5 w-5 text-gray-400 transition ${
                  showTerms ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {showTerms && (
            <div className="grid gap-6 p-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 font-semibold text-gray-900">
                  English
                </h3>
                <div className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700 max-h-96 overflow-y-auto">
                  {englishText}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-900">
                  नेपाली
                </h3>
                <div className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700 max-h-96 overflow-y-auto">
                  {nepaliText}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ==========================================
            CUSTOMER ACCEPTANCE
        ========================================== */}

        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <h2 className="font-semibold text-gray-900">
              Customer Acceptance
            </h2>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-3">
            <Info
              label="Customer Signature"
              value={agreement.customerSignature || "Not submitted"}
            />

            <Info
              label="Signature Date"
              value={
                agreement.date
                  ? new Date(agreement.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Not submitted"
              }
            />

            <Info
              label="Terms Accepted"
              value={agreement.acceptTerms ? "✅ Yes" : "❌ No"}
            />
          </div>
        </div>

        {/* ==========================================
            TIMESTAMPS
        ========================================== */}

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400">
          <span>Created: {formatDateTime(agreement.createdAt)}</span>
          <span>Last updated: {formatDateTime(agreement.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// FIELD COMPONENT
// ==========================================

function Field({
  label,
  value,
  disabled,
  onChange,
  icon,
}: {
  label: string;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`h-11 w-full rounded-lg border border-gray-200 text-sm outline-none focus:border-[#0b3558] focus:ring-2 focus:ring-[#0b3558]/10 disabled:bg-gray-100 disabled:text-gray-500 ${
            icon ? "pl-10" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}

// ==========================================
// INFO COMPONENT
// ==========================================

function Info({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
        {icon}
        <span>{value || "—"}</span>
      </div>
    </div>
  );
}

// ==========================================
// DATE HELPERS
// ==========================================

function formatDateTime(date: string) {
  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
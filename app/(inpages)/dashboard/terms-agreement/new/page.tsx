// app/dashboard/terms-agreement/new/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, Save, User, Phone, FileText, CalendarDays, PlaneTakeoff, PlaneLanding } from "lucide-react";

interface TermsVersion {
  id: number;
  version: string;
  title: string;
  content: string;
  status: string;
}

export default function NewTermsAgreementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [versions, setVersions] = useState<TermsVersion[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingVersions, setLoadingVersions] = useState(true);
  const [loadingAgreement, setLoadingAgreement] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    sectorRoute: "",
    journeyType: "TWO_WAY",
    termsVersionId: "",
    departureDate: "",
    returnDate: "",
  });

  const isEditMode = !!editId;

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    fetchVersions();
    if (isEditMode) {
      fetchAgreement();
    }
  }, [editId]);

  async function fetchVersions() {
    try {
      const res = await fetch("/api/terms-agreement/terms-versions");
      if (!res.ok) throw new Error("Failed to fetch versions");
      const data = await res.json();
      setVersions(data);

      if (data.length > 0 && !isEditMode) {
        const activeVersion = data.find(
          (version: TermsVersion) => version.status === "active"
        );
        setForm((prev) => ({
          ...prev,
          termsVersionId: String(activeVersion?.id ?? data[0].id),
        }));
      }
    } catch (error) {
      console.error(error);
      setError("Failed to load terms versions.");
    } finally {
      setLoadingVersions(false);
    }
  }

  async function fetchAgreement() {
    if (!editId) return;
    
    try {
      setLoadingAgreement(true);
      const res = await fetch(`/api/terms-agreement/${editId}`);
      if (!res.ok) throw new Error("Failed to fetch agreement");
      const data = await res.json();

      setForm({
        name: data.name || "",
        phoneNumber: data.phoneNumber || "",
        sectorRoute: data.sectorRoute || "",
        journeyType: data.journeyType || "TWO_WAY",
        termsVersionId: String(data.termsVersionId || ""),
        departureDate: data.departureDate ? new Date(data.departureDate).toISOString().split("T")[0] : "",
        returnDate: data.returnDate ? new Date(data.returnDate).toISOString().split("T")[0] : "",
      });
    } catch (error) {
      console.error(error);
      setError("Failed to load agreement.");
    } finally {
      setLoadingAgreement(false);
    }
  }

  // ==========================================
  // FORM HANDLING
  // ==========================================

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.termsVersionId) {
      setError("Please select a terms version.");
      return;
    }

    if (!form.departureDate) {
      setError("Please select a departure date.");
      return;
    }

    if (form.journeyType === "TWO_WAY" && !form.returnDate) {
      setError("Return date is required for TWO_WAY journeys.");
      return;
    }

    if (form.returnDate && new Date(form.returnDate) < new Date(form.departureDate)) {
      setError("Return date must be after departure date.");
      return;
    }

    setLoading(true);

    try {
      const url = isEditMode ? `/api/terms-agreement/${editId}` : "/api/terms-agreement";
      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phoneNumber: form.phoneNumber,
          sectorRoute: form.sectorRoute,
          journeyType: form.journeyType,
          termsVersionId: Number(form.termsVersionId),
          departureDate: form.departureDate,
          returnDate: form.returnDate || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save agreement");
      }

      if (isEditMode) {
        setSuccess("Agreement updated successfully!");
        // Refresh the form with updated data
        setForm({
          name: data.name || "",
          phoneNumber: data.phoneNumber || "",
          sectorRoute: data.sectorRoute || "",
          journeyType: data.journeyType || "TWO_WAY",
          termsVersionId: String(data.termsVersionId || ""),
          departureDate: data.departureDate ? new Date(data.departureDate).toISOString().split("T")[0] : "",
          returnDate: data.returnDate ? new Date(data.returnDate).toISOString().split("T")[0] : "",
        });
      } else {
        router.push(`/dashboard/terms-agreement/${data.id}`);
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // LOADING STATES
  // ==========================================

  if (loadingAgreement) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc]">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-[#0b3558]" />
          Loading agreement...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* HEADER */}
      <header className="border-b border-gray-200 bg-white">
        <div className="px-6 py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/dashboard/terms-agreement")}
                className="rounded-lg border border-gray-200 p-2.5 text-gray-600 hover:bg-gray-50"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div>
                <h1 className="text-2xl font-bold text-[#0b3558]">
                  {isEditMode ? "Edit Terms Agreement" : "Create Terms Agreement"}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {isEditMode ? "Update passenger and booking details." : "Enter the passenger and booking details."}
                </p>
              </div>
            </div>

            <button
              type="submit"
              form="agreement-form"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0b3558] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#092c4a] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {loading ? "Saving..." : isEditMode ? "Update Agreement" : "Create Agreement"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <div className="mx-auto max-w-3xl">
          {/* ALERTS */}
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
              <span className="mt-0.5 text-red-600">✕</span>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
              <span className="mt-0.5 text-green-600">✓</span>
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          {/* FORM */}
          <form id="agreement-form" onSubmit={handleSubmit} className="space-y-6">
            <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-6 py-5">
                <h2 className="font-semibold text-gray-900">Agreement Details</h2>
                <p className="text-sm text-gray-500">
                  Fill in the passenger information
                </p>
              </div>

              <div className="space-y-5 p-6">
                {/* NAME */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Passenger Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      required
                      className="h-11 w-full rounded-lg border border-gray-200 pl-10 pr-4 text-sm outline-none focus:border-[#0b3558] focus:ring-2 focus:ring-[#0b3558]/10"
                      placeholder="Passenger name"
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={form.phoneNumber}
                      onChange={(e) => updateField("phoneNumber", e.target.value)}
                      required
                      className="h-11 w-full rounded-lg border border-gray-200 pl-10 pr-4 text-sm outline-none focus:border-[#0b3558] focus:ring-2 focus:ring-[#0b3558]/10"
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                {/* SECTOR */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Sector / Route
                  </label>
                  <input
                    type="text"
                    value={form.sectorRoute}
                    onChange={(e) => updateField("sectorRoute", e.target.value)}
                    required
                    className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#0b3558] focus:ring-2 focus:ring-[#0b3558]/10"
                    placeholder="e.g. KTM - LHR"
                  />
                </div>

                {/* JOURNEY TYPE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Journey Type
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="journeyType"
                        value="TWO_WAY"
                        checked={form.journeyType === "TWO_WAY"}
                        onChange={(e) => {
                          updateField("journeyType", e.target.value);
                          // Clear return date when switching to ONE_WAY
                          if (e.target.value === "ONE_WAY") {
                            updateField("returnDate", "");
                          }
                        }}
                      />
                      Return / Two Way
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="journeyType"
                        value="ONE_WAY"
                        checked={form.journeyType === "ONE_WAY"}
                        onChange={(e) => {
                          updateField("journeyType", e.target.value);
                          // Clear return date when switching to ONE_WAY
                          if (e.target.value === "ONE_WAY") {
                            updateField("returnDate", "");
                          }
                        }}
                      />
                      One Way
                    </label>
                  </div>
                </div>

                {/* DEPARTURE DATE */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <PlaneTakeoff className="h-4 w-4" />
                    Departure Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.departureDate}
                    onChange={(e) => updateField("departureDate", e.target.value)}
                    required
                    className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#0b3558] focus:ring-2 focus:ring-[#0b3558]/10"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* RETURN DATE - Only for TWO_WAY */}
                {form.journeyType === "TWO_WAY" && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <PlaneLanding className="h-4 w-4" />
                      Return Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={form.returnDate}
                      onChange={(e) => updateField("returnDate", e.target.value)}
                      required
                      className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#0b3558] focus:ring-2 focus:ring-[#0b3558]/10"
                      min={form.departureDate || new Date().toISOString().split("T")[0]}
                    />
                    {form.departureDate && form.returnDate && new Date(form.returnDate) < new Date(form.departureDate) && (
                      <p className="mt-1 text-xs text-red-500">
                        Return date must be after departure date
                      </p>
                    )}
                  </div>
                )}

                {/* TERMS VERSION */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Terms & Conditions Version
                  </label>
                  {loadingVersions ? (
                    <p className="text-sm text-gray-500">Loading versions...</p>
                  ) : (
                    <select
                      value={form.termsVersionId}
                      onChange={(e) => updateField("termsVersionId", e.target.value)}
                      required
                      className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#0b3558] focus:ring-2 focus:ring-[#0b3558]/10"
                    >
                      <option value="">Select terms version</option>
                      {versions.map((version) => (
                        <option key={version.id} value={version.id}>
                          {version.version} — {version.title}
                          {version.status === "active" ? " (Active)" : ""}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </section>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push("/dashboard/terms-agreement")}
                className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || loadingVersions}
                className="flex-1 rounded-lg bg-[#0b3558] px-5 py-3 text-sm font-semibold text-white hover:bg-[#092c4a] disabled:opacity-50"
              >
                {loading ? "Saving..." : isEditMode ? "Update Agreement" : "Create Agreement"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
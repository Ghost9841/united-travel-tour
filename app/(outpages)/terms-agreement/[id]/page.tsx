// app/customer/terms-agreement/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

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
  journeyType: "ONE_WAY" | "TWO_WAY";
  customerSignature: string | null;
  date: string | null;
  acceptTerms: boolean;
  termsVersionId: number;
  termsVersion: TermsVersion;
  termsSnapshot: string; // JSON string with english/nepali
  createdAt: string;
  updatedAt: string;
}

export default function CustomerTermsAgreementPage() {
  const params = useParams();
  const id = params.id as string;

  const [agreement, setAgreement] = useState<Agreement | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [signature, setSignature] = useState("");
  const [date, setDate] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    const loadAgreement = async () => {
      try {
        const response = await fetch(`/api/terms-agreement/${id}`, {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Agreement not found");
        }

        // Set the agreement directly (data is the agreement object)
        setAgreement(data);

        if (data.acceptTerms) {
          setSubmitted(true);
          setSignature(data.customerSignature || "");

          if (data.date) {
            setDate(
              new Date(data.date)
                .toISOString()
                .split("T")[0]
            );
          }

          setAcceptTerms(true);
        }
      } catch (error) {
        console.error("Error loading agreement:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load agreement."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAgreement();
  }, [id]);

  const submitAgreement = async () => {
    setError("");

    if (!signature.trim()) {
      setError("Please enter your signature / name.");
      return;
    }

    if (!date) {
      setError("Please select the date.");
      return;
    }

    if (!acceptTerms) {
      setError("You must accept the terms and conditions.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(`/api/terms-agreement/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerSignature: signature.trim(),
          date,
          acceptTerms: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit.");
      }

      setAgreement(data);
      setSubmitted(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to submit agreement."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fa]">
        <Loader2 className="h-8 w-8 animate-spin text-[#0b3558]" />
      </div>
    );
  }

  // Handle error case - if there's an error or no agreement
  if (error || !agreement) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fa] p-6">
        <div className="rounded-xl bg-white p-8 text-center shadow-lg max-w-md">
          <h1 className="text-xl font-bold text-gray-900">
            Agreement Not Found
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {error || "The agreement you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0b3558] px-4 py-2 text-sm font-semibold text-white hover:bg-[#092c4a] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // Get text from termsVersion or parse from termsSnapshot
  const getEnglishText = () => {
    if (agreement.termsVersion?.englishText) {
      return agreement.termsVersion.englishText;
    }
    if (agreement.termsSnapshot) {
      try {
        const parsed = JSON.parse(agreement.termsSnapshot);
        return parsed.english || "No English terms available";
      } catch (e) {
        return "No English terms available";
      }
    }
    return "No English terms available";
  };

  const getNepaliText = () => {
    if (agreement.termsVersion?.nepaliText) {
      return agreement.termsVersion.nepaliText;
    }
    if (agreement.termsSnapshot) {
      try {
        const parsed = JSON.parse(agreement.termsSnapshot);
        return parsed.nepali || "No Nepali terms available";
      } catch (e) {
        return "No Nepali terms available";
      }
    }
    return "No Nepali terms available";
  };

  const englishText = getEnglishText();
  const nepaliText = getNepaliText();
  const versionNumber = agreement.termsVersion?.version || "N/A";
  const versionTitle = agreement.termsVersion?.title || "Terms & Conditions";

  return (
    <div className="min-h-screen bg-[#f1f5f8]">
      {/* Header */}
      <header className="bg-[#0b3558] text-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
       
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-4 px-4 py-6 md:px-6">
        {/* Status Alert - if already submitted */}
             <header className="bg-[#0b3558] text-white rounded-2xl">
        <div className="mx-auto max-w-5xl px-6 py-16">
       
           <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                UNITED
              </h1>
              <p className="text-xs tracking-[0.3em] text-gray-300">
                TRAVEL & TOURS LIMITED
              </p>
            </div>

            <div className="md:text-right">
              <h2 className="text-xl font-bold">
                NON-REFUNDABLE TICKET
              </h2>
              <p className="mt-1 text-sm font-semibold text-orange-400">
                TERMS & CONDITIONS FORM
              </p>
              <p className="mt-1 text-xs text-gray-300">
                ENGLISH + NEPALI
              </p>
            </div>
          </div>
          
        </div>
      </header>
        {submitted && (
          <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">
                Agreement Already Submitted
              </p>
              <p className="text-sm text-green-700">
                This agreement was already accepted on {date ? new Date(date).toLocaleDateString() : "N/A"}.
              </p>
            </div>
          </div>
        )}

        {/* Passenger Details */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-wide text-[#0b3558]">
            Passenger / Booking Details
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <ReadonlyField
              label="PASSENGER NAME / यात्रुको नाम"
              value={agreement.name}
            />

            <ReadonlyField
              label="PHONE NUMBER / फोन नम्बर"
              value={agreement.phoneNumber}
            />

            <ReadonlyField
              label="SECTOR / ROUTE / सेक्टर / रुट"
              value={agreement.sectorRoute}
            />

            <div>
              <p className="mb-2 text-xs font-bold text-gray-700">
                JOURNEY TYPE / यात्राको प्रकार
              </p>

              <div className="flex gap-6 text-sm">
                <span className="flex items-center gap-2">
                  <span
                    className={`inline-block h-5 w-5 rounded border ${
                      agreement.journeyType === "TWO_WAY"
                        ? "border-[#0b3558] bg-[#0b3558]"
                        : "border-gray-400"
                    }`}
                  />
                  RETURN / TWO WAY
                </span>

                <span className="flex items-center gap-2">
                  <span
                    className={`inline-block h-5 w-5 rounded border ${
                      agreement.journeyType === "ONE_WAY"
                        ? "border-[#0b3558] bg-[#0b3558]"
                        : "border-gray-400"
                    }`}
                  />
                  ONE WAY
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Terms & Conditions */}
        <section className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="bg-[#0b3558] px-5 py-4">
            <h2 className="text-sm font-bold text-white">
              {versionTitle}
            </h2>
            <p className="text-xs text-gray-300">
              Version {versionNumber}
            </p>
          </div>

          <div className="grid divide-y md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="p-5">
              <h3 className="mb-4 font-bold text-orange-500">
                ENGLISH
              </h3>
              <div className="whitespace-pre-wrap text-sm leading-7 text-gray-700 max-h-[400px] overflow-y-auto">
                {englishText}
              </div>
            </div>

            <div className="p-5">
              <h3 className="mb-4 font-bold text-orange-500">
                नेपाली
              </h3>
              <div className="whitespace-pre-wrap text-sm leading-7 text-gray-700 max-h-[400px] overflow-y-auto">
                {nepaliText}
              </div>
            </div>
          </div>
        </section>

        {/* Customer Declaration / Acceptance */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase text-[#0b3558]">
            Customer Declaration / Acceptance
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-700">
            I confirm that I have read and understood both versions
            above and accept all the terms and conditions.
          </p>

          <p className="mt-1 text-sm text-gray-600">
            मैले माथिका इङ्ग्लिस र नेपाली दुवै संस्करण पढी बुझें र
            सबै नियम तथा शर्त स्वीकार गर्दछु।
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {!submitted ? (
            <>
              {/* Accept Terms Checkbox */}
              <div className="mt-5">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="h-5 w-5 accent-[#0b3558]"
                  />
                  <span className="text-sm font-bold text-gray-800">
                    I ACCEPT ALL TERMS / म सबै शर्त स्वीकार गर्दछु
                  </span>
                </label>
              </div>

              {/* Signature and Date */}
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-700">
                    CUSTOMER SIGNATURE / NAME
                  </label>
                  <input
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 w-full border-0 border-b-2 border-gray-300 bg-transparent px-1 text-sm outline-none focus:border-[#0b3558]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-700">
                    DATE / मिति
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-12 w-full border-0 border-b-2 border-gray-300 bg-transparent px-1 text-sm outline-none focus:border-[#0b3558]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={submitAgreement}
                disabled={submitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0b3558] py-3.5 text-sm font-bold text-white hover:bg-[#092c4a] disabled:opacity-60 transition"
              >
                {submitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {submitting
                  ? "SUBMITTING..."
                  : "ACCEPT TERMS & SUBMIT"}
              </button>
            </>
          ) : (
            /* Already Submitted Message */
            <div className="mt-6 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">
                  Agreement Successfully Submitted
                </p>
                <p className="text-sm text-green-700">
                  Thank you. Your acceptance has been recorded.
                </p>
              </div>
            </div>
          )}

          {/* Security Note */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="h-4 w-4" />
            Your acceptance is securely recorded.
          </div>
        </section>
      </main>
    </div>
  );
}

// ==========================================
// READONLY FIELD COMPONENT
// ==========================================

function ReadonlyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold text-gray-700">{label}</p>
      <div className="border-b border-gray-300 pb-2 text-sm text-gray-800">
        {value || "—"}
      </div>
    </div>
  );
}
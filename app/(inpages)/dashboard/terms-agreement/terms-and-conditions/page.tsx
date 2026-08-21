"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  History,
  Loader2,
  Plus,
  Save,
  X,
} from "lucide-react";

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

export default function TermsAndConditionsPage() {
  const [versions, setVersions] = useState<TermsVersion[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showEditor, setShowEditor] = useState(false);
  const [previewId, setPreviewId] = useState<number | null>(
    null
  );

  const [title, setTitle] = useState("");
  const [englishText, setEnglishText] = useState("");
  const [nepaliText, setNepaliText] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadVersions();
  }, []);

  // ==========================================
  // LOAD VERSIONS
  // ==========================================

  async function loadVersions() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/terms-agreement/terms-versions", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to load terms versions."
        );
      }

      setVersions(data);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load terms versions."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // VERSION NUMBER
  // ==========================================

  function getNextVersion() {
    if (versions.length === 0) {
      return "1.0";
    }

    const numbers = versions
      .map((item) => {
        const value = Number.parseFloat(item.version);

        return Number.isNaN(value) ? 0 : value;
      })
      .filter((value) => value > 0);

    const highest = Math.max(...numbers);

    return (highest + 1).toFixed(1);
  }

  // ==========================================
  // OPEN EDITOR
  // ==========================================

  function openNewVersionEditor() {
    setTitle("");
    setEnglishText("");
    setNepaliText("");

    setError("");
    setSuccess("");

    setShowEditor(true);
  }

  // ==========================================
  // CLOSE EDITOR
  // ==========================================

  function closeEditor() {
    if (saving) return;

    setShowEditor(false);

    setTitle("");
    setEnglishText("");
    setNepaliText("");

    setError("");
  }

  // ==========================================
  // CREATE VERSION
  // ==========================================

  async function createVersion() {
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    if (!englishText.trim()) {
      setError("Please enter the English terms.");
      return;
    }

    if (!nepaliText.trim()) {
      setError("Please enter the Nepali terms.");
      return;
    }

    try {
      setSaving(true);

      const version = getNextVersion();

      const response = await fetch("/api/terms-agreement/terms-versions", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          version,
          title: title.trim(),
          englishText: englishText.trim(),
          nepaliText: nepaliText.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to create version."
        );
      }

      setSuccess(
        `Terms & Conditions Version ${version} created successfully.`
      );

      setShowEditor(false);

      setTitle("");
      setEnglishText("");
      setNepaliText("");

      await loadVersions();
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create version."
      );
    } finally {
      setSaving(false);
    }
  }

  const activeVersion =
    versions.find(
      (version) => version.status === "active"
    ) || null;

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="border-b border-gray-200 bg-white">
        <div className="px-6 py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b3558]/10">
                <FileText className="h-5 w-5 text-[#0b3558]" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#0b3558]">
                  Terms & Conditions
                </h1>

                <p className="text-sm text-gray-500">
                  Manage bilingual terms and conditions versions.
                </p>
              </div>
            </div>

            <button
              onClick={openNewVersionEditor}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0b3558] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#092c4a]"
            >
              <Plus className="h-4 w-4" />
              Create New Version
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl space-y-6 p-6">
        {/* ==========================================
            SUCCESS
        ========================================== */}

        {success && (
          <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

            <div className="flex-1">
              <p className="text-sm font-semibold text-green-800">
                Success
              </p>

              <p className="mt-1 text-sm text-green-700">
                {success}
              </p>
            </div>

            <button
              onClick={() => setSuccess("")}
              className="text-green-600 hover:text-green-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* ==========================================
            ERROR
        ========================================== */}

        {error && !showEditor && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

            <div>
              <p className="text-sm font-semibold text-red-800">
                Something went wrong
              </p>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* ==========================================
            ACTIVE VERSION
        ========================================== */}

        <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />

              <h2 className="font-semibold text-gray-900">
                Current Active Version
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-10">
              <Loader2 className="h-6 w-6 animate-spin text-[#0b3558]" />
            </div>
          ) : activeVersion ? (
            <div className="p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {activeVersion.title}
                    </h3>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                      Version {activeVersion.version}
                    </span>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Active
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    Created{" "}
                    {formatDate(activeVersion.createdAt)}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setPreviewId(
                      previewId === activeVersion.id
                        ? null
                        : activeVersion.id
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {previewId === activeVersion.id ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Hide Preview
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Preview Terms
                    </>
                  )}
                </button>
              </div>

              {previewId === activeVersion.id && (
                <TermsPreview version={activeVersion} />
              )}
            </div>
          ) : (
            <div className="p-10 text-center">
              <FileText className="mx-auto h-10 w-10 text-gray-300" />

              <h3 className="mt-3 font-semibold text-gray-900">
                No Terms & Conditions Yet
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Create your first bilingual terms version.
              </p>

              <button
                onClick={openNewVersionEditor}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0b3558] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Plus className="h-4 w-4" />
                Create Version 1.0
              </button>
            </div>
          )}
        </section>

        {/* ==========================================
            IMPORTANT INFORMATION
        ========================================== */}

        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

          <div>
            <p className="text-sm font-semibold text-blue-900">
              About Terms Versions
            </p>

            <p className="mt-1 text-sm leading-6 text-blue-800">
              Each version contains separate English and Nepali
              terms. Creating a new version does not change terms
              on existing agreements. Existing agreements keep
              their own English and Nepali snapshots.
            </p>
          </div>
        </div>

        {/* ==========================================
            VERSION HISTORY
        ========================================== */}

        <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <div className="flex items-center gap-3">
              <History className="h-5 w-5 text-[#0b3558]" />

              <div>
                <h2 className="font-semibold text-gray-900">
                  Version History
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  All previously created terms versions.
                </p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-10">
              <Loader2 className="h-6 w-6 animate-spin text-[#0b3558]" />
            </div>
          ) : versions.length === 0 ? (
            <div className="p-10 text-center text-sm text-gray-500">
              No versions found.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {versions.map((version) => {
                const isPreviewing =
                  previewId === version.id;

                return (
                  <div key={version.id}>
                    <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                          <FileText className="h-5 w-5 text-gray-500" />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-gray-900">
                              {version.title}
                            </h3>

                            <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-bold text-gray-600">
                              v{version.version}
                            </span>

                            {version.status === "active" && (
                              <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                                Active
                              </span>
                            )}
                          </div>

                          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="h-3.5 w-3.5" />

                            Created{" "}
                            {formatDate(
                              version.createdAt
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setPreviewId(
                            isPreviewing
                              ? null
                              : version.id
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {isPreviewing ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            Hide
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            Preview
                          </>
                        )}
                      </button>
                    </div>

                    {isPreviewing && (
                      <div className="border-t border-gray-100 bg-gray-50 px-6 py-5">
                        <TermsPreview version={version} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* ==========================================
          CREATE VERSION MODAL
      ========================================== */}

      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal header */}

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-[#0b3558]">
                  Create New Terms Version
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Version{" "}
                  <span className="font-semibold">
                    {getNextVersion()}
                  </span>
                </p>
              </div>

              <button
                onClick={closeEditor}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal body */}

            <div className="flex-1 overflow-y-auto p-6">
              {error && (
                <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                  <p className="text-sm text-red-700">
                    {error}
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {/* TITLE */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Terms Title
                  </label>

                  <input
                    type="text"
                    value={title}
                    onChange={(e) =>
                      setTitle(e.target.value)
                    }
                    placeholder="e.g. Flight Ticket Terms & Conditions"
                    className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none transition focus:border-[#0b3558] focus:ring-2 focus:ring-[#0b3558]/10"
                  />
                </div>

                {/* LANGUAGE EDITORS */}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* ENGLISH */}

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-semibold text-gray-700">
                        English Terms
                      </label>

                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                        English
                      </span>
                    </div>

                    <textarea
                      value={englishText}
                      onChange={(e) =>
                        setEnglishText(
                          e.target.value
                        )
                      }
                      placeholder={`Enter the English terms and conditions...

Example:

1. Ticket is non-refundable.
2. Date changes are subject to airline policy.
3. Passenger must carry valid travel documents.
4. Check-in must be completed within the airline's required time.
5. The passenger is responsible for checking all travel details.`}
                      rows={22}
                      className="w-full resize-y rounded-lg border border-gray-200 p-4 text-sm leading-7 outline-none transition focus:border-[#0b3558] focus:ring-2 focus:ring-[#0b3558]/10"
                    />
                  </div>

                  {/* NEPALI */}

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-semibold text-gray-700">
                        Nepali Terms
                      </label>

                      <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700">
                        नेपाली
                      </span>
                    </div>

                    <textarea
                      value={nepaliText}
                      onChange={(e) =>
                        setNepaliText(
                          e.target.value
                        )
                      }
                      placeholder={`यहाँ नेपाली नियम तथा सर्तहरू लेख्नुहोस्...

उदाहरण:

१. टिकट फिर्ता गर्न मिल्ने छैन।
२. मिति परिवर्तन एयरलाइन्सको नियमअनुसार हुनेछ।
३. यात्रुले आवश्यक यात्रा कागजात साथमा राख्नुपर्नेछ।
४. यात्रुले एयरलाइन्सले तोकेको समयभित्र चेक-इन गर्नुपर्नेछ।`}
                      rows={22}
                      className="w-full resize-y rounded-lg border border-gray-200 p-4 text-sm leading-7 outline-none transition focus:border-[#0b3558] focus:ring-2 focus:ring-[#0b3558]/10"
                    />
                  </div>
                </div>

                {/* INFO */}

                <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                  <div>
                    <p className="text-sm font-semibold text-amber-900">
                      Versioning
                    </p>

                    <p className="mt-1 text-sm leading-6 text-amber-800">
                      A new version will be created instead of
                      modifying an existing version. Existing
                      customer agreements will continue to use
                      their original English and Nepali terms.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal footer */}

            <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                onClick={closeEditor}
                disabled={saving}
                className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={createVersion}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0b3558] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#092c4a] disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}

                {saving
                  ? "Creating..."
                  : `Create Version ${getNextVersion()}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================
   TERMS PREVIEW
========================================== */

function TermsPreview({
  version,
}: {
  version: TermsVersion;
}) {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Preview header */}

      <div className="border-b border-gray-200 bg-[#0b3558] px-5 py-4 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold">
              {version.title}
            </h3>

            <p className="mt-1 text-xs text-gray-300">
              Terms & Conditions · Version{" "}
              {version.version}
            </p>
          </div>

          {version.status === "active" && (
            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-200">
              Active Version
            </span>
          )}
        </div>
      </div>

      {/* Preview content */}

      <div className="grid grid-cols-1 gap-0 divide-y lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        {/* English */}

        <div className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
              English
            </span>
          </div>

          <div className="max-h-[400px] overflow-y-auto whitespace-pre-wrap text-sm leading-7 text-gray-700">
            {version.englishText}
          </div>
        </div>

        {/* Nepali */}

        <div className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-md bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700">
              नेपाली
            </span>
          </div>

          <div className="max-h-[400px] overflow-y-auto whitespace-pre-wrap text-sm leading-7 text-gray-700">
            {version.nepaliText}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   DATE FORMAT
========================================== */

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface TermsVersion {
  id: number;
  version: string;
  title: string;
  content: string;
  status: string;
}

export default function NewTermsAgreementPage() {
  const router = useRouter();

  const [versions, setVersions] = useState<TermsVersion[]>([]);

  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    sectorRoute: "",
    journeyType: "TWO_WAY",
    termsVersionId: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingVersions, setLoadingVersions] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVersions();
  }, []);

  async function fetchVersions() {
    try {
      const res = await fetch("/api//terms-agreement/terms-versions");

      if (!res.ok) {
        throw new Error("Failed to fetch versions");
      }

      const data = await res.json();

      setVersions(data);

      if (data.length > 0) {
        const activeVersion = data.find(
          (version: TermsVersion) =>
            version.status === "active"
        );

        setForm((prev) => ({
          ...prev,
          termsVersionId: String(
            activeVersion?.id ?? data[0].id
          ),
        }));
      }
    } catch (error) {
      console.error(error);
      setError("Failed to load terms versions.");
    } finally {
      setLoadingVersions(false);
    }
  }

  function updateField(
    field: string,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    if (!form.termsVersionId) {
      setError("Please select a terms version.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/terms-agreement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phoneNumber: form.phoneNumber,
          sectorRoute: form.sectorRoute,
          journeyType: form.journeyType,
          termsVersionId: Number(
            form.termsVersionId
          ),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Failed to create agreement"
        );
      }

      router.push(
        `/dashboard/terms-agreement/${data.id}`
      );
    } catch (error: any) {
      setError(
        error.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Create Terms Agreement
        </h1>

        <p className="text-gray-500 mt-1">
          Enter the passenger and booking details.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label className="block mb-2 font-medium">
            Passenger Name
          </label>

          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              updateField("name", e.target.value)
            }
            required
            className="w-full rounded-lg border px-4 py-3"
            placeholder="Passenger name"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Phone Number
          </label>

          <input
            type="tel"
            value={form.phoneNumber}
            onChange={(e) =>
              updateField(
                "phoneNumber",
                e.target.value
              )
            }
            required
            className="w-full rounded-lg border px-4 py-3"
            placeholder="Phone number"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Sector / Route
          </label>

          <input
            type="text"
            value={form.sectorRoute}
            onChange={(e) =>
              updateField(
                "sectorRoute",
                e.target.value
              )
            }
            required
            className="w-full rounded-lg border px-4 py-3"
            placeholder="e.g. KTM - LHR"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Journey Type
          </label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="journeyType"
                value="TWO_WAY"
                checked={
                  form.journeyType === "TWO_WAY"
                }
                onChange={(e) =>
                  updateField(
                    "journeyType",
                    e.target.value
                  )
                }
              />

              Return / Two Way
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="journeyType"
                value="ONE_WAY"
                checked={
                  form.journeyType === "ONE_WAY"
                }
                onChange={(e) =>
                  updateField(
                    "journeyType",
                    e.target.value
                  )
                }
              />

              One Way
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Terms & Conditions Version
          </label>

          {loadingVersions ? (
            <p className="text-gray-500">
              Loading versions...
            </p>
          ) : (
            <select
              value={form.termsVersionId}
              onChange={(e) =>
                updateField(
                  "termsVersionId",
                  e.target.value
                )
              }
              required
              className="w-full rounded-lg border px-4 py-3"
            >
              <option value="">
                Select terms version
              </option>

              {versions.map((version) => (
                <option
                  key={version.id}
                  value={version.id}
                >
                  {version.version} —{" "}
                  {version.title}
                  {version.status === "active"
                    ? " (Active)"
                    : ""}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard/terms-agreement"
              )
            }
            className="rounded-lg border px-5 py-3"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-3 text-white disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Agreement"}
          </button>
        </div>
      </form>
    </div>
  );
}
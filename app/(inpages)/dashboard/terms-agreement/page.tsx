"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  CheckCircle2,
  Clock3,
  RefreshCw,
  FileText,
  Users,
  Check,
  X,
} from "lucide-react";
import Link from "next/link";
import { TermsAgreement } from "@prisma/client";
import LoadingRows from "./TermsRowCard";
import EmptyState from "./TermsEmptyCard";
import AgreementRow from "./AgreementRowCard";
import DeleteModal from "./DeleteModal";
import StatCard from "./TermStatsCard";

type JourneyType = "ONE_WAY" | "TWO_WAY";



export default function TermsAgreementPage() {
  const [agreements, setAgreements] = useState<TermsAgreement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [journeyFilter, setJourneyFilter] = useState<"ALL" | JourneyType>(
    "ALL"
  );
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "ACCEPTED" | "PENDING"
  >("ALL");

  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAgreements = async () => {
    try {
      setRefreshing(true);

      const response = await fetch("/api/terms-agreement", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch agreements");
      }

      const data = await response.json();

      // Supports either:
      // { agreements: [...] }
      // or directly [...]
      setAgreements(data.agreements ?? data);
    } catch (error) {
      console.error("Error fetching agreements:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAgreements();
  }, []);

  const filteredAgreements = useMemo(() => {
    const query = search.trim().toLowerCase();

    return agreements.filter((agreement) => {
      const matchesSearch =
        !query ||
        agreement.name.toLowerCase().includes(query) ||
        agreement.phoneNumber.toLowerCase().includes(query) ||
        agreement.sectorRoute.toLowerCase().includes(query);

      const matchesJourney =
        journeyFilter === "ALL" ||
        agreement.journeyType === journeyFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACCEPTED" && agreement.acceptTerms) ||
        (statusFilter === "PENDING" && !agreement.acceptTerms);

      return matchesSearch && matchesJourney && matchesStatus;
    });
  }, [agreements, search, journeyFilter, statusFilter]);

  const acceptedCount = agreements.filter(
    (agreement) => agreement.acceptTerms
  ).length;

  const pendingCount = agreements.filter(
    (agreement) => !agreement.acceptTerms
  ).length;

  const copyCustomerLink = async (id: number) => {
    const url = `${window.location.origin}/terms-agreement/${id}`;

    try {
      await navigator.clipboard.writeText(url);
      alert("Customer link copied!");
    } catch {
      console.error("Failed to copy link");
    }

    setOpenMenu(null);
  };

  const deleteAgreement = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      const response = await fetch(`/api/terms-agreement/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete agreement");
      }

      setAgreements((current) =>
        current.filter((agreement) => agreement.id !== deleteId)
      );

      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting agreement:", error);
      alert("Failed to delete agreement.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="px-6 py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-[#0b3558]" />

                <h1 className="text-2xl font-bold text-[#0b3558]">
                  Terms Agreements
                </h1>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                Manage passenger terms and conditions agreements.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchAgreements}
                disabled={refreshing}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    refreshing ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </button>

              <Link
                href="/dashboard/terms-agreement/new"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0b3558] px-4 text-sm font-semibold text-white transition hover:bg-[#092c4a]"
              >
                <Plus className="h-4 w-4" />
                New Agreement
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Statistics */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Agreements"
            value={agreements.length}
            icon={<FileText className="h-5 w-5" />}
          />

          <StatCard
            title="Accepted"
            value={acceptedCount}
            icon={<CheckCircle2 className="h-5 w-5" />}
          />

          <StatCard
            title="Pending"
            value={pendingCount}
            icon={<Clock3 className="h-5 w-5" />}
          />

          <StatCard
            title="Two Way"
            value={
              agreements.filter(
                (agreement) => agreement.journeyType === "TWO_WAY"
              ).length
            }
            icon={<Users className="h-5 w-5" />}
          />
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Filters */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, phone or route..."
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-[#0b3558] focus:bg-white focus:ring-2 focus:ring-[#0b3558]/10"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/dashboard/terms-agreement/terms-and-conditions/"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#0b3558] px-4 text-sm font-semibold text-white transition hover:bg-[#092c4a]"
              >
                <Plus className="h-4 w-4" />
                New Term
              </Link>
                {/* Journey filter */}
                <select
                  value={journeyFilter}
                  onChange={(e) =>
                    setJourneyFilter(
                      e.target.value as "ALL" | JourneyType
                    )
                  }
                  className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#0b3558]"
                >
                  
              
                  <option value="ALL">All Journeys</option>
                  <option value="ONE_WAY">One Way</option>
                  <option value="TWO_WAY">Two Way</option>
                </select>

                {/* Status filter */}
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value as
                        | "ALL"
                        | "ACCEPTED"
                        | "PENDING"
                    )
                  }
                  className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#0b3558]"
                >
                  <option value="ALL">All Status</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="PENDING">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Passenger
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Phone
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Sector / Route
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Journey
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Date
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <LoadingRows />
                ) : filteredAgreements.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <EmptyState search={search} />
                    </td>
                  </tr>
                ) : (
                  filteredAgreements.map((agreement) => (
                    <AgreementRow
                      key={agreement.id}
                      agreement={agreement}
                      openMenu={openMenu}
                      setOpenMenu={setOpenMenu}
                      onCopy={copyCustomerLink}
                      onDelete={setDeleteId}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {!loading && filteredAgreements.length > 0 && (
            <div className="border-t border-gray-200 px-5 py-3">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                  {filteredAgreements.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                  {agreements.length}
                </span>{" "}
                agreements
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {deleteId !== null && (
        <DeleteModal
          loading={deleting}
          onCancel={() => setDeleteId(null)}
          onConfirm={deleteAgreement}
        />
      )}
    </div>
  );
}








import { TermsAgreement } from "@prisma/client";
import {  MoreVertical,
  Copy,
  ExternalLink,
  Trash2,
  Eye,
  CheckCircle2,
  Clock3,} from 'lucide-react'
import Link from "next/link";

function AgreementRow({
  agreement,
  openMenu,
  setOpenMenu,
  onCopy,
  onDelete,
}: {
  agreement: TermsAgreement;
  openMenu: number | null;
  setOpenMenu: (id: number | null) => void;
  onCopy: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const formattedDate = agreement.date
    ? new Date(agreement.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <tr className="transition hover:bg-gray-50">
      {/* Passenger */}
      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-gray-900">
            {agreement.name}
          </p>

          <p className="mt-0.5 text-xs text-gray-400">
            Agreement #{agreement.id}
          </p>
        </div>
      </td>

      {/* Phone */}
      <td className="px-5 py-4 text-sm text-gray-600">
        {agreement.phoneNumber}
      </td>

      {/* Route */}
      <td className="px-5 py-4">
        <p className="max-w-[230px] truncate text-sm font-medium text-gray-800">
          {agreement.sectorRoute}
        </p>
      </td>

      {/* Journey */}
      <td className="px-5 py-4">
        {agreement.journeyType === "TWO_WAY" ? (
          <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
            Two Way
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
            One Way
          </span>
        )}
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        {agreement.acceptTerms ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Accepted
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">
            <Clock3 className="h-3.5 w-3.5" />
            Pending
          </span>
        )}
      </td>

      {/* Date */}
      <td className="px-5 py-4 text-sm text-gray-600">
        {formattedDate}
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="relative flex justify-end">
          <button
            onClick={() =>
              setOpenMenu(
                openMenu === agreement.id ? null : agreement.id
              )
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {openMenu === agreement.id && (
            <div className="absolute right-0 top-9 z-20 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              <Link
                href={`/dashboard/terms-agreement/${agreement.id}`}
                onClick={() => setOpenMenu(null)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Eye className="h-4 w-4" />
                View Agreement
              </Link>

              <Link
                href={`/terms-agreement/${agreement.id}`}
                target="_blank"
                onClick={() => setOpenMenu(null)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <ExternalLink className="h-4 w-4" />
                Open Customer Form
              </Link>

              <button
                onClick={() => onCopy(agreement.id)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                <Copy className="h-4 w-4" />
                Copy Customer Link
              </button>

              <div className="my-1 border-t border-gray-100" />

              <button
                onClick={() => {
                  setOpenMenu(null);
                  onDelete(agreement.id);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
export default AgreementRow;
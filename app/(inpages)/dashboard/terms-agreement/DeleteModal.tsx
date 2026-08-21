import { Trash2, X } from "lucide-react";

function DeleteModal({
  loading,
  onCancel,
  onConfirm,
}: {
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>

            <button
              onClick={onCancel}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <h2 className="mt-4 text-lg font-bold text-gray-900">
            Delete agreement?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            This action cannot be undone. The agreement and its
            customer information will be permanently removed.
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onCancel}
              disabled={loading}
              className="h-10 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="h-10 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete Agreement"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeleteModal;
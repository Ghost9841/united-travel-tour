import { FileText } from "lucide-react";

function EmptyState({ search }: { search: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <FileText className="h-6 w-6 text-gray-400" />
      </div>

      <h3 className="mt-4 font-semibold text-gray-900">
        No agreements found
      </h3>

      <p className="mt-1 max-w-sm text-sm text-gray-500">
        {search
          ? "Try changing your search or filters."
          : "Create your first terms agreement to get started."}
      </p>
    </div>
  );
}
export default EmptyState;
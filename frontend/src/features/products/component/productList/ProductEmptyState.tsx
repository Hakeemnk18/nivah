import { PackageSearch } from "lucide-react";

interface EmptyProductPros {
  onReset: () => void
}
export default function ProductEmptyState({ onReset }: EmptyProductPros) {


  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-xl text-center">

        {/* Icon Container */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#111] shadow-lg border border-[#2a2a2a]">
          <PackageSearch className="h-10 w-10 text-[#d4af37]" />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-white">
          No products found
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-md mx-auto">
          We couldn’t find any products matching your current filters.
          Try adjusting your search or explore all available items.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onReset}
            className="px-6 py-2 rounded-md bg-[#d4af37] text-black font-medium hover:opacity-90 transition"
          >
            View All Products
          </button>

          <button
            onClick={onReset}
            className="px-6 py-2 rounded-md border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
          >
            Reset Filters
          </button>
        </div>

      </div>
    </div>
  );
}

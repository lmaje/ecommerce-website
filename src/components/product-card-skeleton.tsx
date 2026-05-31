export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col animate-pulse">
      {/* Image area — matches h-44 of ProductCard */}
      <div className="h-44 bg-gray-100" />
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Name */}
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
        <div className="h-4 bg-gray-200 rounded-full w-1/2" />
        {/* Weight pills */}
        <div className="flex gap-1">
          <div className="h-5 w-10 bg-gray-200 rounded-full" />
          <div className="h-5 w-12 bg-gray-200 rounded-full" />
        </div>
        {/* Price + button row */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
          <div className="h-7 w-24 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

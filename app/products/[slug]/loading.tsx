export default function ProductDetailLoading() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 h-4 w-64 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Gambar skeleton */}
        <div className="aspect-square animate-pulse rounded-lg bg-gray-200" />

        {/* Info skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
          <div className="h-9 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-40 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />

          <div className="border-t pt-4">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="h-10 animate-pulse rounded bg-gray-200" />
              <div className="h-10 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="mt-4 h-20 animate-pulse rounded bg-gray-200" />
            <div className="mt-6 h-12 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
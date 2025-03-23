import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function MangaSkeletonLoader() {
  return (
    <div className="flex w-full flex-col min-h-[80vh] gap-6">
      <div className="container md:grid w-full grid-cols-1 gap-4 md:grid-cols-4">
        {/* Mobile Filters Skeleton */}
        <div lang="ar" className="mb-8 flex w-full items-start justify-between md:hidden">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>

        {/* Desktop Filters Skeleton */}
        <section lang="ar" className="col-span-1 hidden w-full flex-col items-start justify-start gap-4 md:flex">
          <div className="flex w-full items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-5" />
          </div>

          {/* Search Input Skeleton */}
          <Skeleton className="h-10 w-full" />

          <div className="flex w-full flex-col gap-6">
            <div className="grid w-full grid-cols-2 gap-4">
              {/* Type Filters Skeleton */}
              <div className="flex flex-col items-start justify-start gap-4">
                <Skeleton className="h-5 w-20" />
                <div className="grid gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </div>
              {/* Status Filters Skeleton */}
              <div className="flex flex-col items-start justify-start gap-4">
                <Skeleton className="h-5 w-20" />
                <div className="grid gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rating Filter Skeleton */}
            <div className="flex flex-col items-start justify-start gap-4">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-full" />
            </div>

            {/* Genre Filters Skeleton */}
            <div className="flex flex-col items-start justify-start gap-4">
              <Skeleton className="h-5 w-24" />
              <ScrollArea className="h-60 w-full">
                <div className="grid grid-cols-3 gap-3">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </section>

        {/* Main Content Area Skeleton */}
        <div className="col-span-3 flex min-h-[50rem] w-full flex-col items-start justify-between">
          <section className="w-full">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
              {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="h-[300px] rounded-lg" />
              ))}
            </div>
          </section>
          <div className="mb-4 flex w-full items-end justify-start">
            <Skeleton className="h-10 w-64" />
          </div>
        </div>
      </div>
    </div>
  )
}

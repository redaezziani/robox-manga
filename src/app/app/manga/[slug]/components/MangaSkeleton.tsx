import { Skeleton } from "@/components/ui/skeleton"

export default function MangaDetailsSkeleton() {
  return (
    <div className="mt-4 flex w-full flex-col items-start justify-start gap-10 overflow-x-hidden md:flex-row">
      <div className="relative aspect-[2/3] w-full max-w-60 overflow-hidden rounded-lg">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="space-y-4">
          <div>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="mt-2 h-4 w-1/2" />
          </div>

          <div className="flex flex-wrap gap-2 max-w-lg">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-6 w-16" />
            ))}
          </div>

          <section className="w-full grid grid-cols-2 md:grid-cols-1 gap-4 items-start justify-start content-start">
            <div className="space-y-2">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </div>

            <div className="flex w-full justify-start -mt-1 items-start flex-col gap-2">
              <div>
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div>
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </section>

          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-1" />
            <Skeleton className="h-4 w-3/4 mt-1" />
          </div>
        </div>
        
        <div className="w-full space-y-4">
          <Skeleton className="h-7 w-32" />
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


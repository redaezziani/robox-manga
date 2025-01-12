const SkeletonCard = () => {
    return (
        <div className="flex flex-col gap-3 h-[360px] w-full animate-pulse">
            <div className="w-full h-[260px] bg-gray-200 rounded-lg" />
            <div className="space-y-3">
                <div className="h-4 bg-gray-300 border border-gray-400/35 rounded w-3/4" />
                <div className="h-4 bg-gray-300 border border-gray-400/35 rounded w-1/2" />
            </div>
        </div>
    )
}

export default SkeletonCard

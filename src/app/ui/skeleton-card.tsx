const SkeletonCard = () => {
  return (
    <div className="flex h-[360px] w-full animate-pulse flex-col gap-3">
      <div className="h-[260px] w-full rounded-lg bg-gray-200" />
      <div className="space-y-3">
        <div className="h-4 w-3/4 rounded border border-gray-400/35 bg-gray-300" />
        <div className="h-4 w-1/2 rounded border border-gray-400/35 bg-gray-300" />
      </div>
    </div>
  );
};

export default SkeletonCard;

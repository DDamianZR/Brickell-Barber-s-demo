interface SkeletonProps {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "full";
}

const roundedMap = {
  sm: "rounded",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-full",
};

export function Skeleton({ className = "", rounded = "md" }: SkeletonProps) {
  return (
    <div className={`animate-shimmer ${roundedMap[rounded]} ${className}`} />
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-[var(--surface)] rounded-3xl overflow-hidden border border-[var(--border)]">
      <Skeleton className="h-48 w-full" rounded="sm" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-6 w-20" rounded="full" />
          <Skeleton className="h-6 w-16" rounded="full" />
        </div>
      </div>
    </div>
  );
}

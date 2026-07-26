import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card";
}

const variantClasses = {
  text: "h-4 w-full rounded",
  circular: "rounded-full",
  rectangular: "rounded-lg",
  card: "rounded-xl h-48",
};

function Skeleton({
  className,
  variant = "text",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
Skeleton.displayName = "Skeleton";

export { Skeleton };

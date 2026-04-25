import { cn } from "@/lib/utils";

const ProgressBar = ({ value, className }: { value: number; className?: string }) => (
  <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)} aria-hidden="true">
    <div className="h-full rounded-full bg-primary-gradient transition-all duration-500" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
  </div>
);

export default ProgressBar;

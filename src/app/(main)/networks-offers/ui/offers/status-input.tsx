import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function StatusDot({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="8"
      fill="currentColor"
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}

interface StatusInputProps {
  status: string;
}

const statuses = [
  { value: "Active", label: "Active", color: "text-emerald-600" },
  { value: "Public", label: "Public", color: "text-blue-500" },
  { value: "Apply_to_run", label: "Apply to Run", color: "text-amber-500" },
  { value: "Cancelled", label: "Cancelled", color: "text-red-500" },
];

export default function StatusInput({ status }: StatusInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="select-status">Status</Label>
      <Select
      defaultValue={status}
      value={status}>
        <SelectTrigger
          id="select-status"
          className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0"
        >
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent
          className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2"
        >
          {statuses.map((statusItem) => (
            <SelectItem key={statusItem.value} value={statusItem.value}>
              <span className="flex items-center gap-2">
                <StatusDot className={statusItem.color} />
                <span className="truncate">{statusItem.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

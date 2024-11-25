import { Input } from "@/components/ui/input";

export default function CommandsInput() {
  return (
    <div
      className="space-y-2 w-96"
      style={{ "--ring": "234 89% 74%" } as React.CSSProperties}
    >
      <Input  placeholder="search command ..." type="text" />
    </div>
  );
}

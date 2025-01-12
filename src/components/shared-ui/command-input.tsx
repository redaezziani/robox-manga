import { Input } from '@/components/ui/input';

export default function CommandsInput() {
  return (
    <div className="w-96 space-y-2">
      <Input placeholder="search command ..." type="text" />
    </div>
  );
}

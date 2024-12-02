"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import {  useState } from "react";
import {
  Button,
  Group,
  Input,
  Label,
  NumberField,
} from "react-aria-components";

export default function PayoutInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (payout: number) => void;
}) {
    const [localValue, setLocalValue] = useState(value);

    const handleChange = (newValue: number) => {
      setLocalValue(newValue);
      onChange(newValue); 
    };
  return (
    <NumberField
      defaultValue={localValue}
      formatOptions={{
        style: "currency",
        currency: "USD",
        currencySign: "accounting",
      }}
      onChange={(e) => handleChange(e)}
    >
      <div className="space-y-2 max-w-full">
        <Label htmlFor="Payout" className="text-sm font-medium text-foreground">
          Payout
        </Label>
        <Group className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20">
          <Input
            id="Payout"
            className="flex-1 bg-background px-3 py-2 tabular-nums text-foreground focus:outline-none"
          />
          <div className="flex h-[calc(100%+2px)] flex-col">
            <Button
              slot="increment"
              className="-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronUp size={12} strokeWidth={2} aria-hidden="true" />
            </Button>
            <Button
              slot="decrement"
              className="-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronDown size={12} strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>
        </Group>
      </div>
    </NumberField>
  );
}

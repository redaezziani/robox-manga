"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Platform = {
  id: string;
  name: string;
  type: string;
  website: string;
};

interface PlatformsProps {
  onPlatformSelect?: (platform: string) => void;
  platforms: Platform[];
}
export default function Platforms({
  platforms,
  onPlatformSelect,
}: PlatformsProps) {


   const handlePlatformSelect = (platform: string) => {
    if (onPlatformSelect) {
          onPlatformSelect(platform);
    }
   };
  return (
    <RadioGroup
      onValueChange={(value) => {
        handlePlatformSelect(value);
      }
    }
      className="gap-2 flex justify-start items-start flex-row"
    >
      {platforms.map((platform) => (
        <div
        key={platform.id}
        className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
          <RadioGroupItem
            value={platform.id}
            id={`radio-08-${platform.id}`}
            aria-describedby={`radio-08-${platform.id}-description`}
            className="order-1 after:absolute after:inset-0"
          />
          <div className="grid grow gap-2">
            <Label htmlFor={`radio-08-${platform.id}`}>
              {platform.name}{" "}
              <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                ({platform.type})
              </span>
            </Label>
            <p
              id={`radio-08-${platform.id}-description`}
              className="text-xs text-muted-foreground"
            >
              {platform.website}
            </p>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}

'use client';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Minus } from "lucide-react";
import { useId } from "react";
import { useTheme } from "next-themes";

const items = [
    { value: "light", label: "فاتح", image: "/ui-light.png" },
    { value: "dark", label: "داكن", image: "/ui-dark.png" },
    { value: "system", label: "النظام", image: "/ui-system.png" },
];

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const id = useId();
    
    return (
        <fieldset className="space-y-4" dir="rtl">
            <legend className="text-sm font-medium leading-none text-foreground">اختر المظهر</legend>
            <RadioGroup 
                className="flex flex-row-reverse gap-3" 
                value={theme} 
                onValueChange={setTheme}
            >
                {items.map((item) => (
                    <label key={`${id}-${item.value}`}>
                        <RadioGroupItem
                            id={`${id}-${item.value}`}
                            value={item.value}
                            className="peer sr-only after:absolute after:inset-0"
                        />
                        <img
                            src={item.image}
                            alt={item.label}
                            width={88}
                            height={70}
                            className="relative cursor-pointer overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 outline-offset-2 transition-colors peer-[:focus-visible]:outline peer-[:focus-visible]:outline-2 peer-[:focus-visible]:outline-ring/70 peer-data-[disabled]:cursor-not-allowed peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent peer-data-[disabled]:opacity-50"
                        />
                        <span className="group mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
                            <Check
                                size={16}
                                strokeWidth={2}
                                className="peer-data-[state=unchecked]:group-[]:hidden"
                                aria-hidden="true"
                            />
                            <Minus
                                size={16}
                                strokeWidth={2}
                                className="peer-data-[state=checked]:group-[]:hidden"
                                aria-hidden="true"
                            />
                            <span className="text-xs font-medium">{item.label}</span>
                        </span>
                    </label>
                ))}
            </RadioGroup>
        </fieldset>
    );
}

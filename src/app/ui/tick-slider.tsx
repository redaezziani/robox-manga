import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface TickSliderProps {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  onChange: (value: number[]) => void;
  labelText: string;
  className?: string;
  direction?: 'rtl' | 'ltr';
}

export function TickSlider({
  min,
  max,
  step,
  defaultValue,
  onChange,
  labelText,
  className,
  direction = 'ltr',
}: TickSliderProps) {
  const ticks = [...Array(max - min + 1)].map((_, i) => min + i);

  return (
    <div className={cn('space-y-4', className)} dir={direction}>
      <div>
        <Slider
          defaultValue={[defaultValue]}
          min={min}
          max={max}
          step={step}
          className="[&>:last-child>span]:rounded"
          onValueChange={onChange}
          aria-label={labelText}
        />
        <span
          className="text-muted-foreground mt-3 flex w-full items-center justify-between px-2.5 text-xs font-medium"
          aria-hidden="true"
        >
          {ticks.map((tick) => (
            <span key={tick} className="flex w-0 flex-col items-center justify-center gap-2">
              <span className="bg-muted-foreground/70 h-1 w-px" />
              <span>{tick}</span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

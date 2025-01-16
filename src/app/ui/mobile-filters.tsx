'use client';

import { RotateCcw, SlidersHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { TickSlider } from './tick-slider';

interface MobileFiltersProps {
  genres: string[];
  statuses: string[];
  types: string[];
  selectedGenres: string[];
  selectedStatuses: string[];
  selectedTypes: string[];
  onGenreChange: (genre: string, checked: boolean) => void;
  onStatusChange: (status: string, checked: boolean) => void;
  onTypeChange: (type: string, checked: boolean) => void;
  onRatingChange: (value: number[]) => void;
  onResetFilters: () => void;
}

export function MobileFilters({
  genres,
  statuses,
  types,
  selectedGenres,
  selectedStatuses,
  selectedTypes,
  onGenreChange,
  onStatusChange,
  onTypeChange,
  onRatingChange,
  onResetFilters,
}: MobileFiltersProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <SlidersHorizontal className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full overflow-y-auto sm:w-[340px]" lang="ar">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>بحث وتصفية المانجا</span>
            {(selectedGenres.length > 0 ||
              selectedStatuses.length > 0 ||
              selectedTypes.length > 0) && (
              <button onClick={onResetFilters} className="text-accent-foreground text-sm">
                <RotateCcw className="size-4" />
              </button>
            )}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-6">
          {/* Types */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">النوع</h3>
            <div className="grid grid-cols-2 gap-2">
              {types.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mobile-type-${type}`}
                    checked={selectedTypes.includes(type)}
                    onCheckedChange={(checked) => onTypeChange(type, checked as boolean)}
                  />
                  <Label htmlFor={`mobile-type-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">الحالة</h3>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mobile-status-${status}`}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={(checked) => onStatusChange(status, checked as boolean)}
                  />
                  <Label htmlFor={`mobile-status-${status}`}>{status}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">التقييم</h3>
            <TickSlider
              min={1}
              max={5}
              step={1}
              defaultValue={1}
              onChange={onRatingChange}
              labelText=""
              className="w-full"
            />
          </div>

          {/* Genres */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">التصنيفات</h3>
            <div className="grid grid-cols-2 gap-2">
              {genres.map((genre) => (
                <div key={genre} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mobile-genre-${genre}`}
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={(checked) => onGenreChange(genre, checked as boolean)}
                  />
                  <Label htmlFor={`mobile-genre-${genre}`}>{genre}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

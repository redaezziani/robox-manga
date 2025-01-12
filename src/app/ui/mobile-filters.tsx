'use client'

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { TickSlider } from "./tick-slider"
import { RotateCcw } from "lucide-react"

interface MobileFiltersProps {
    genres: string[]
    statuses: string[]
    types: string[]
    selectedGenres: string[]
    selectedStatuses: string[]
    selectedTypes: string[]
    onGenreChange: (genre: string, checked: boolean) => void
    onStatusChange: (status: string, checked: boolean) => void
    onTypeChange: (type: string, checked: boolean) => void
    onRatingChange: (value: number[]) => void
    onResetFilters: () => void
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
    onResetFilters
}: MobileFiltersProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-[340px] overflow-y-auto" lang="ar">
                <SheetHeader>
                    <SheetTitle className="flex justify-between items-center">
                        <span>بحث وتصفية المانجا</span>
                        {(selectedGenres.length > 0 || selectedStatuses.length > 0 || selectedTypes.length > 0) && (
                            <button
                                onClick={onResetFilters}
                                className="text-sm text-accent-foreground"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                        )}
                    </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-4">
                    {/* Types */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium">النوع</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {types.map((type) => (
                                <div key={type} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`mobile-type-${type}`}
                                        checked={selectedTypes.includes(type)}
                                        onCheckedChange={(checked) =>
                                            onTypeChange(type, checked as boolean)
                                        }
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
                                        onCheckedChange={(checked) =>
                                            onStatusChange(status, checked as boolean)
                                        }
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
                                        onCheckedChange={(checked) =>
                                            onGenreChange(genre, checked as boolean)
                                        }
                                    />
                                    <Label htmlFor={`mobile-genre-${genre}`}>{genre}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

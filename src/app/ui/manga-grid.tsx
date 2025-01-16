'use client';
import React, { useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import MangaCard from './card';
import { MobileFilters } from './mobile-filters';
import { TickSlider } from './tick-slider';

import { Manga } from '@/types/manga';

import { CustomPagination } from '@/app/ui/custom-pagination';

interface MangaGridProps {
  mangas: Manga[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  genres: string[];
  statuses: string[];
  types: string[];
  onFilterChange: (filters: {
    genres?: string[];
    status?: string[];
    types?: string[];
    minRating?: number;
  }) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

export default function MangaGrid({
  mangas,
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
  genres = [],
  statuses = [],
  types = [],
  onFilterChange,
  searchQuery,
  onSearch,
}: MangaGridProps) {
  useEffect(() => {
    console.log('MangaGrid received types:', types);
  }, [types]);

  console.log(types);
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatuses = checked
      ? [...selectedStatuses, status]
      : selectedStatuses.filter((s) => s !== status);
    setSelectedStatuses(newStatuses);
    onFilterChange({
      status: newStatuses,
      genres: selectedGenres,
      types: selectedTypes,
    });
  };

  const handleGenreChange = (genre: string, checked: boolean) => {
    const newGenres = checked
      ? [...selectedGenres, genre]
      : selectedGenres.filter((g) => g !== genre);
    setSelectedGenres(newGenres);
    onFilterChange({
      status: selectedStatuses,
      genres: newGenres,
      types: selectedTypes,
    });
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked ? [...selectedTypes, type] : selectedTypes.filter((t) => t !== type);
    setSelectedTypes(newTypes);
    onFilterChange({
      status: selectedStatuses,
      genres: selectedGenres,
      types: newTypes,
    });
  };

  const handleRatingChange = (value: number[]) => {
    // Handle rating change
    onFilterChange({
      status: selectedStatuses,
      genres: selectedGenres,
      types: selectedTypes,
      minRating: value[0], // Use the first value from the array
    });
  };

  // Don't reset filters when search is cleared
  useEffect(() => {
    if (searchQuery) {
      setSelectedGenres([]);
      setSelectedStatuses([]);
      setSelectedTypes([]);
    }
  }, [searchQuery]);

  // Sync current filters with parent state
  useEffect(() => {
    onFilterChange({
      genres: selectedGenres,
      status: selectedStatuses,
      types: selectedTypes,
    });
  }, [selectedGenres, selectedStatuses, selectedTypes]);

  // Add reset filters function
  const resetFilters = () => {
    setSelectedGenres([]);
    setSelectedStatuses([]);
    setSelectedTypes([]);
  };

  // Add clearSearch function
  const clearSearch = () => {
    onSearch('');
    // Don't reset filters here
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="container  grid w-full  grid-cols-1 gap-4 md:grid-cols-4">
        <div lang="ar" className=" mb-4   flex w-full items-end justify-between md:hidden">
          <h3 className="text-lg font-semibold text-gray-600">فلترة المانجا</h3>
          <MobileFilters
            genres={genres}
            statuses={statuses}
            types={types}
            selectedGenres={selectedGenres}
            selectedStatuses={selectedStatuses}
            selectedTypes={selectedTypes}
            onGenreChange={handleGenreChange}
            onStatusChange={handleStatusChange}
            onTypeChange={handleTypeChange}
            onRatingChange={handleRatingChange}
            onResetFilters={resetFilters}
          />
        </div>

        <section
          lang="ar"
          className="col-span-1 hidden w-full flex-col items-start justify-start gap-4 md:flex"
        >
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-gray-600">بحث وتصفية المانجا</p>
            {(selectedGenres.length > 0 ||
              selectedStatuses.length > 0 ||
              selectedTypes.length > 0) && (
              <button onClick={resetFilters} className="text-accent-foreground size-5  text-sm ">
                <RotateCcw className="size-4" />
              </button>
            )}
          </div>

          {/* Add Search Input */}
          <div className="relative mb-4 w-full">
            <input
              type="text"
              placeholder="ابحث عن المانجا..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="border-input bg-background w-full rounded-md border p-2 pl-8"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex w-full flex-col gap-6">
            <div className="grid  w-full grid-cols-2 gap-4">
              {/* Type Filters */}
              <div className="flex flex-col items-start justify-start gap-4">
                <h3>النوع</h3>
                <div className="grid gap-3">
                  {Array.isArray(types) && types.length > 0 ? (
                    types.map((type) => (
                      <div key={type} className="flex items-center gap-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                        />
                        <Label htmlFor={`type-${type}`}>{type}</Label>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">لا توجد أنواع متاحة</p>
                  )}
                </div>
              </div>
              {/* Status Filters */}
              <div className="flex flex-col items-start justify-start gap-4">
                <h3>الحالة</h3>
                <div className="grid gap-3">
                  {statuses.map((status) => (
                    <div key={status} className="flex items-center gap-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={selectedStatuses.includes(status)}
                        onCheckedChange={(checked) =>
                          handleStatusChange(status, checked as boolean)
                        }
                      />
                      <Label htmlFor={`status-${status}`}>{status}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="flex flex-col items-start justify-start gap-4">
              <h3>التقييم</h3>
              <TickSlider
                min={1}
                max={5}
                step={1}
                defaultValue={1}
                onChange={handleRatingChange}
                labelText=""
                className="w-full"
              />
            </div>

            {/* Genre Filters */}
            <div className="flex flex-col items-start justify-start gap-4">
              <h3>التصنيفات</h3>
              <div className="grid grid-cols-3 gap-3 ">
                {genres.map((genre) => (
                  <div key={genre} className="flex items-center gap-2">
                    <Checkbox
                      id={`genre-${genre}`}
                      checked={selectedGenres.includes(genre)}
                      onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
                    />
                    <Label htmlFor={`genre-${genre}`}>{genre}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="col-span-3 flex min-h-[50rem] w-full flex-col items-start justify-between">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4 lg:grid-cols-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-muted h-[300px] animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <>
              <section className="w-full">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-6">
                  <AnimatePresence mode="popLayout">
                    {mangas.map((manga) => (
                      <MangaCard key={manga.id} data={manga} />
                    ))}
                  </AnimatePresence>
                </div>
              </section>
              <div className="mb-4 flex w-full items-end justify-start">
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                  paginationItemsToDisplay={5}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

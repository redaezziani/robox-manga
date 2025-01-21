'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGenresSWR } from '../store/data';

interface GenreSelectProps {
  onGenreChange: (genre: string) => void;
  selectedGenre: string;
}

export function GenreSelect({ onGenreChange, selectedGenre }: GenreSelectProps) {
  const { genres, isLoading } = useGenresSWR();

  if (isLoading) {
    return <div>Loading genres...</div>;
  }

  return (
    <Select value={selectedGenre} onValueChange={onGenreChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="اختر نوع المانجا" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>الأنواع</SelectLabel>
          {genres.map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

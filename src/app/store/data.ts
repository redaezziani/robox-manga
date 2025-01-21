import axios from 'axios';
import useSWR from 'swr';
import { Manga, MangaResponse } from '@/types/manga';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function usePopularMangaSWR() {
  const { data, error, isLoading } = useSWR<Manga[]>(
    'http://localhost:8000/api/manga/popular',
    fetcher
  );

  return {
    popularMangas: data || [],
    isLoading,
    error
  };
}

export function useLatestMangaSWR() {
  const { data, error, isLoading } = useSWR<Manga[]>(
    'http://localhost:8000/api/manga/latest',
    fetcher
  );

  return {
    latestMangas: data || [],
    isLoading,
    error
  };
}

export function useGenresSWR() {
  const { data, error, isLoading } = useSWR<string[]>(
    'http://localhost:8000/api/manga/genres',
    fetcher
  );

  return {
    genres: data || [],
    isLoading,
    error
  };
}

export function useMangaByGenreSWR(genre: string, page: number = 1, limit: number = 10) {
  const { data, error, isLoading } = useSWR(
    genre ? `http://localhost:8000/api/manga/genre/${encodeURIComponent(genre)}?page=${page}&limit=${limit}` : null,
    fetcher
  );

  return {
    mangasByGenre: data?.data.items || [],
    meta: data?.data.meta,
    isLoading,
    error
  };
}

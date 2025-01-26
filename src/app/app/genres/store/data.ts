import axios from 'axios';
import useSWR from 'swr';
import { Manga } from '@/types/manga';

interface MangaResponse {
  success: boolean;
  data: {
    items: Manga[];
    meta: {
      currentPage: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  };
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useMangaByGenreSWR(genre: string, page: number = 1, limit: number = 10) {
  const { data, error, isLoading } = useSWR<MangaResponse>(
    genre ? `http://localhost:8000/api/manga/genre/${encodeURIComponent(genre)}?page=${page}&limit=${limit}` : null,
    fetcher
  );

  return {
    mangas: data?.data.items || [],
    meta: data?.data.meta,
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

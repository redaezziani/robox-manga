import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Manga, MangaResponse } from '@/types/manga';

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export function usePopularMangaSWR() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['popularManga'],
    queryFn: () => fetcher('http://localhost:8000/api/manga/popular')
  });

  return {
    popularMangas: data || [],
    isLoading,
    error
  };
}

export function useLatestMangaSWR() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['latestManga'],
    queryFn: () => fetcher('http://localhost:8000/api/manga/latest')
  });

  return {
    latestMangas: data || [],
    isLoading,
    error
  };
}

export function useGenresSWR() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: () => fetcher('http://localhost:8000/api/manga/genres')
  });

  return {
    genres: data || [],
    isLoading,
    error
  };
}

export function useMangaByGenreSWR(genre: string, page: number = 1, limit: number = 10) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['mangaByGenre', genre, page, limit],
    queryFn: () => fetcher(`http://localhost:8000/api/manga/genre/${encodeURIComponent(genre)}?page=${page}&limit=${limit}`),
    enabled: !!genre
  });

  return {
    mangasByGenre: data?.data.items || [],
    meta: data?.data.meta,
    isLoading,
    error
  };
}

import axios from 'axios';
import useSWR from 'swr';
import { MangaResponse } from '@/types/manga';

const fetcher = async (url: string) => {
  const response = await axios.get<MangaResponse>(url);
  return response.data.data;
};

// SWR hook for manga details
export function useMangaDetailsSWR(slug: string) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/api/manga/info/${slug}`,
    fetcher
  );

  return {
    manga: data,
    chapters: data?.chapters || [],
    isLoading,
    error
  };
}

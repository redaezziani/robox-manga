import axios from 'axios';
import useSWR from 'swr';
import { MangaResponse } from '@/types/manga';

interface ChapterResponse {
  data: {
    mangaName: string;
    chapterName: string;
    chapterNumber: number;
    pages: string[];
  };
}

const fetcher = async (url: string) => {
  const response = await axios.get(url);
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

// SWR hook for chapter pages
export function useChapterPagesSWR(mangaSlug: string, chapterNumber: string) {
  const { data, error, isLoading } = useSWR<ChapterResponse['data']>(
    `http://localhost:8000/api/manga/manga/${mangaSlug}/chapter/${chapterNumber}`,
    fetcher
  );

  return {
    chapter: data,
    isLoading,
    error
  };
}

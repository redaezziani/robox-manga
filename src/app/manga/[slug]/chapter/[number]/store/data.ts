import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
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
  const response = await axiosInstance.get(url);
  return response.data.data;
};

export function useMangaDetailsSWR(slug: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['mangaDetails', slug],
    queryFn: () => fetcher(`/manga/info/${slug}`)
  });

  return {
    manga: data,
    chapters: data?.chapters || [],
    isLoading,
    error
  };
}

export function useChapterPagesSWR(mangaSlug: string, chapterNumber: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['chapterPages', mangaSlug, chapterNumber],
    queryFn: () => fetcher(`/manga/manga/${mangaSlug}/chapter/${chapterNumber}`)
  });

  return {
    chapter: data,
    isLoading,
    error
  };
}

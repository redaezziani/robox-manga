import { axiosInstance } from '@/lib/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MangaResponse } from '@/types/manga';
import { getCookies } from '@/lib/cookies';
import { useEffect } from 'react';

interface ChapterResponse {
  data: {
    mangaName: string;
    mangaId: string;
    chapterName: string;
    chapterNumber: number;
    chapterId: string;
    pages: string[];
  };
}

const fetcher = async (url: string) => {
  const response = await axiosInstance.get(url);
  return response.data.data;
};

const createKeepReading = async (data: {
  mangaId: string;
  chapterId: string;
  page: number;
}) => {
  const token = await getCookies();
  return axiosInstance.post('/manga/keep-reading', data, {
    headers: {
      Authorization: `Bearer ${token?.value}`
    }
  });
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

  const { mutate: keepReading } = useMutation({
    mutationFn: (page: number) =>
      createKeepReading({
        mangaId: data?.mangaId || '',
        chapterId: data?.chapterId || '',
        page
      })
  });

  useEffect(() => {
    if (data?.chapterId && data?.pages) {
      keepReading(data.pages.length);
    }
  }, [data, keepReading]);

  return {
    chapter: data,
    isLoading,
    error,
  };
}

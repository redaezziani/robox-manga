import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Root } from '@/types/manga';

const fetcher = async (url: string) => {
  const response = await axiosInstance.get<Root>(`http://192.168.31.181:8000/api/manga/info/${url}`);
  return {
    mangaDetails: response.data.data.mangaDetails,
    similarManga: response.data.data.similarManga
  };
};

export function useMangaDetailsSWR(slug: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['manga', slug],
    queryFn: () => fetcher(slug)
  });

  return { 
    manga: data?.mangaDetails, 
    similarManga: data?.similarManga,
    error, 
    isLoading 
  };
}

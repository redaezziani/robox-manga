import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { MangaResponse } from '@/types/manga';

const fetcher = async (url: string) => {
  const response = await axiosInstance.get<MangaResponse>(url);
  return response.data.data;
};

export function useMangaDetailsSWR(slug: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['manga', slug],
    queryFn: () => fetcher(`/manga/${slug}`) // Using axiosInstance with baseURL
  });

  return { manga: data, error, isLoading };
}

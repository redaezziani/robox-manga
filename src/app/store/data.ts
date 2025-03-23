import { axiosInstance } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { Manga, MangaResponse } from '@/types/manga';
import { getCookies } from '@/lib/cookies';

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export function usePopularMangaSWR() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['popularManga'],
    queryFn: () => fetcher('https://redaezziani.com/api/manga/popular')
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
    queryFn: () => fetcher('https://redaezziani.com/api/manga/latest')
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
    queryFn: () => fetcher('https://redaezziani.com/api/manga/genres')
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
    queryFn: () => fetcher(`https://redaezziani.com/api/manga/genre/${encodeURIComponent(genre)}?page=${page}&limit=${limit}`),
    enabled: !!genre
  });

  return {
    mangasByGenre: data?.data.items || [],
    meta: data?.data.meta,
    isLoading,
    error
  };
}


interface KeepReadingResponse {
    data: {
      items: Array<{
        manga: {
          id: string;
          title: string;
          cover: string;
          slug: string;
        };
        chapter: {
          id: string;
          number: number;
          name: string;
        };
        page: number;
        updatedAt: string;
      }>;
      meta?: {
        currentPage: number;
        lastPage: number;
        total: number;
      };
    };
}
  
  export function useKeepReadingSWR() {
    const { data, error, isLoading } = useQuery({
      queryKey: ['keepReading'],
      queryFn: async () => {
        const token = await getCookies();
        if (!token?.value) return [];
        console.log('Fetching keep reading...');
        console.log(token.value);
        const response = await axiosInstance.get<KeepReadingResponse>('/manga/keep-reading', {
          headers: {
            Authorization: `Bearer ${token.value}`
          }
        });
        
        return response.data.data.items;
      }
    });
  
    return {
      keepReading: data,
      isLoading,
      error 
    };
  }
import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';
import { useQuery } from '@tanstack/react-query';
import { Manga } from '@/types/manga';

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

interface MangaQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    genres?: string[];
    status?: string[];
    types?: string[];
}

interface MangaStore {
    originalMangas: Manga[];
    filteredMangas: Manga[];
    genres: string[];
    statuses: string[];
    types: string[];
    searchQuery: string;
    isLoading: boolean;
    error: string | null;
    totalPages: number;
    currentPage: number;
    fetchAllMangas: (params: MangaQueryParams) => void;
    setSearchQuery: (query: string) => void;
    handleSearch: (query: string) => void;
}

const useMangaStore = create<MangaStore>((set, get) => ({
    originalMangas: [],
    filteredMangas: [],
    genres: [],
    statuses: [],
    types: [],
    searchQuery: '',
    isLoading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,

    fetchAllMangas: async (params: MangaQueryParams = {}) => {
        set({ isLoading: true, error: null });

        const queryParams = new URLSearchParams();
        params.page && queryParams.append('page', params.page.toString());
        params.limit && queryParams.append('limit', params.limit.toString());
        params.search && queryParams.append('search', params.search);
        params.genres?.forEach((genre) => queryParams.append('genres', genre));
        params.status?.forEach((status) => queryParams.append('status', status));
        params.types?.forEach((type) => queryParams.append('types', type));

        try {
            const response = await axiosInstance.get(`/manga/all?${queryParams}`);
            const data = response.data.data;
            set({
                originalMangas: data.items,
                filteredMangas: data.items,
                totalPages: data.meta.totalPages,
                currentPage: data.meta.currentPage,
                isLoading: false,
            });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    setSearchQuery: (query: string) => set({ searchQuery: query }),

    handleSearch: (query: string) => {
        set({ searchQuery: query });
        get().fetchAllMangas({ search: query, page: 1, limit: 12 });
    },
}));

export function useGenresSWR() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: () => fetcher('/manga/genres')
  });

  return { data, error, isLoading };
}

export function useStatusesSWR() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['statuses'],
    queryFn: () => fetcher('/manga/status')
  });

  return { data, error, isLoading };
}

export function useTypesSWR() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['types'],
    queryFn: () => fetcher('/manga/types')
  });

  return { data, error, isLoading };
}

export default useMangaStore;

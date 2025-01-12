import { create } from 'zustand'
import axios from 'axios'
import { Manga } from '@/types/manga'

interface MangaQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    genres?: string[];
    status?: string[];
    minRating?: number;
    themes?: string[];
    types?: string[];
}

interface MangaStore {
    originalMangas: Manga[]
    filteredMangas: Manga[]
    popularMangas: Manga[]
    latestMangas: Manga[]
    isLoading: boolean
    searchQuery: string
    error: string | null
    currentFilters?: {
        genres?: string[];
        status?: string[];
        types?: string[];
    }
    loadingStates: {
        allMangas: boolean
        popularMangas: boolean
        latestMangas: boolean
        singleManga: boolean
        searchMangas: boolean
        filters: boolean
    }
    totalPages: number
    currentPage: number
    genres: string[]
    statuses: string[]
    types: string[]
    manga: Manga | null
    fetchManga: (id: string) => Promise<void>

    fetchAllMangas: (params: MangaQueryParams) => Promise<void>
    fetchSingleManga: (id: string) => Promise<Manga | null>
    fetchPopularMangas: () => Promise<void>
    fetchLatestMangas: () => Promise<void>
    fetchMangasByGenre: (genre: string, page?: number, limit?: number) => Promise<void>
    searchAutocomplete: (search: string) => Promise<string[]>
    fetchGenres: () => Promise<void>
    fetchStatuses: () => Promise<void>
    fetchTypes: () => Promise<void>
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    setSearchQuery: (query: string) => void
    handleSearch: (query: string) => Promise<void>
}

const useMangaStore = create<MangaStore>((set, get) => ({
    originalMangas: [],
    filteredMangas: [],
    popularMangas: [],
    latestMangas: [],
    isLoading: false,
    searchQuery: '',
    error: null,
    loadingStates: {
        allMangas: false,
        popularMangas: false,
        latestMangas: false,
        singleManga: false,
        searchMangas: false,
        filters: false
    },
    totalPages: 1,
    currentPage: 1,
    genres: [],
    statuses: [],
    types: [],
    currentFilters: {
        genres: [],
        status: [],
        types: []
    },
    manga: null,

    fetchAllMangas: async (params: MangaQueryParams = {}) => {
            try {
                set(state => ({
                    loadingStates: { ...state.loadingStates, allMangas: true },
                    error: null,
                    currentPage: params.page || 1
                }))

                // Convert arrays to repeated query params
                const queryParams = new URLSearchParams();
                params.page && queryParams.append('page', params.page.toString());
                params.limit && queryParams.append('limit', params.limit.toString());
                params.search && queryParams.append('search', params.search);
                params.minRating && queryParams.append('minRating', params.minRating.toString());

                // Handle arrays by adding multiple entries
                params.genres?.forEach(genre => queryParams.append('genres', genre));
                params.status?.forEach(status => queryParams.append('status', status));
                params.types?.forEach(type => queryParams.append('types', type));

                const response = await axios.get(`http://localhost:8000/api/manga/all?${queryParams}`);
                set(state => ({
                    originalMangas: response.data.data.items,
                    filteredMangas: response.data.data.items,
                    totalPages: response.data.data.meta.totalPages,
                    currentPage: response.data.data.meta.currentPage,
                    loadingStates: { ...state.loadingStates, allMangas: false }
                }))
            } catch (error) {
                set(state => ({
                    error: error instanceof Error ? error.message : 'Failed to fetch mangas',
                    loadingStates: { ...state.loadingStates, allMangas: false }
                }))
            }
        },

        fetchSingleManga: async (id: string) => {
            try {
                set(state => ({
                    loadingStates: { ...state.loadingStates, singleManga: true },
                    error: null
                }))
                const response = await axios.get(`http://localhost:8000/api/manga/info/${id}`)
                set(state => ({
                    loadingStates: { ...state.loadingStates, singleManga: false }
                }))
                return response.data.data
            } catch (error) {
                set(state => ({
                    error: error instanceof Error ? error.message : 'Failed to fetch manga',
                    loadingStates: { ...state.loadingStates, singleManga: false }
                }))
                return null
            }
        },

        fetchPopularMangas: async () => {
            try {
                set(state => ({
                    loadingStates: { ...state.loadingStates, popularMangas: true },
                    error: null
                }))
                // made a fake delay to show the loading state
                await new Promise((resolve) => setTimeout(resolve, 1000))
                const response = await axios.get(`http://localhost:8000/api/manga/popular`)
                set(state => ({
                    popularMangas: response.data,
                    loadingStates: { ...state.loadingStates, popularMangas: false }
                }))

            } catch (error) {
                set(state => ({
                    error: error instanceof Error ? error.message : 'Failed to fetch popular mangas',
                    loadingStates: { ...state.loadingStates, popularMangas: false }
                }))
            }
        },

        fetchLatestMangas: async () => {
            try {
                set(state => ({
                    loadingStates: { ...state.loadingStates, latestMangas: true },
                    error: null
                }))
                const response = await axios.get(`http://localhost:8000/api/manga/latest`)
                set(state => ({
                    latestMangas: response.data,
                    loadingStates: { ...state.loadingStates, latestMangas: false }
                }))
            } catch (error) {
                set(state => ({
                    error: error instanceof Error ? error.message : 'Failed to fetch latest mangas',
                    loadingStates: { ...state.loadingStates, latestMangas: false }
                }))
            }
        },

        fetchMangasByGenre: async (genre: string, page = 1, limit = 10) => {
            try {
                set({ isLoading: true, error: null })
                const response = await axios.get(`http://localhost:8000/api/manga/genre/${genre}`, {
                    params: { page, limit }
                })
                set({
                    filteredMangas: response.data,
                    isLoading: false
                })
            } catch (error) {
                set({
                    error: error instanceof Error ? error.message : 'Failed to fetch mangas by genre',
                    isLoading: false
                })
            }
        },

        searchAutocomplete: async (search: string) => {
            try {
                const response = await axios.get(`http://localhost:8000/api/manga/search/autocomplete`, {
                    params: { search }
                })
                return response.data
            } catch (error) {
                set({
                    error: error instanceof Error ? error.message : 'Failed to fetch autocomplete results'
                })
                return []
            }
        },

        fetchGenres: async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/manga/genres')
                set({ genres: response.data })
            } catch (error) {
                set({ error: error instanceof Error ? error.message : 'Failed to fetch genres' })
            }
        },

        fetchStatuses: async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/manga/status')
                set({ statuses: response.data })
            } catch (error) {
                set({ error: error instanceof Error ? error.message : 'Failed to fetch statuses' })
            }
        },

        fetchTypes: async () => {
            try {
                set(state => ({
                    loadingStates: { ...state.loadingStates, filters: true }
                }));
                const response = await axios.get('http://localhost:8000/api/manga/types')
                console.log("types", response.data)
                set({ types: response.data })
            } finally {
                set(state => ({
                    loadingStates: { ...state.loadingStates, filters: false }
                }));
            }
            types: [] // Initialize with empty array on error
        },

        fetchManga: async (id: string) => {
            try {
                set(state => ({
                    loadingStates: { ...state.loadingStates, singleManga: true },
                    error: null
                }))
                const response = await axios.get(`http://localhost:8000/api/manga/info/${id}`)
                set(state => ({
                    manga: response.data.data,
                    loadingStates: { ...state.loadingStates, singleManga: false }
                }))
            } catch (error) {
                set(state => ({
                    error: error instanceof Error ? error.message : 'Failed to fetch manga',
                    loadingStates: { ...state.loadingStates, singleManga: false },
                    manga: null
                }))
            }
        },

        setLoading: (loading: boolean) => set({ isLoading: loading }),
        setError: (error: string | null) => set({ error }),

        setSearchQuery: (query: string) => set({ searchQuery: query }),

        handleSearch: async (query: string) => {
            const state = get();
            set(state => ({
                searchQuery: query,
                loadingStates: { ...state.loadingStates, allMangas: true }
            }));

            try {
                // If query is empty and no filters are active, fetch all manga without params
                if (!query && !state.currentFilters?.genres?.length &&
                    !state.currentFilters?.status?.length &&
                    !state.currentFilters?.types?.length) {
                    await state.fetchAllMangas({
                        page: 1,
                        limit: 12
                    });
                    return;
                }

                await state.fetchAllMangas({
                    page: 1,
                    limit: 12,
                    search: query,
                    ...(query ? {} : state.currentFilters) // Only include filters if no search query
                });
            } finally {
                set(state => ({
                    loadingStates: { ...state.loadingStates, allMangas: false }
                }));
            }
        },
    }))

export default useMangaStore
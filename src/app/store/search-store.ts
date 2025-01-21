import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';
import { Manga } from '@/types/manga';

interface SearchStore {
  filteredMangas: Manga[];
  loadingStates: {
    allMangas: boolean;
  };
  fetchAllMangas: (params: { search: string }) => Promise<void>;
}

const useSearchStore = create<SearchStore>((set) => ({
  filteredMangas: [],
  loadingStates: {
    allMangas: false
  },
  fetchAllMangas: async (params) => {
    set(state => ({
      loadingStates: { ...state.loadingStates, allMangas: true }
    }));

    try {
      const response = await axiosInstance.get(`/manga/all?search=${params.search}`);
      set({
        filteredMangas: response.data.data.items,
        loadingStates: { allMangas: false }
      });
    } catch (error) {
      set({ loadingStates: { allMangas: false } });
    }
  }
}));

export default useSearchStore;

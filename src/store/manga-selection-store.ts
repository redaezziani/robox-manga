import { create } from 'zustand'
import { Manga } from "@/types/manga";

interface SelectedManga extends Manga {} // This will include all Manga properties

interface MangaSelectionStore {
  selectedManga: SelectedManga[];
  addManga: (manga: SelectedManga) => void;
  removeManga: (id: string) => void
  clearSelection: () => void
  getByPlatform: (platform: string) => SelectedManga[]
}

export const useMangaSelectionStore = create<MangaSelectionStore>((set, get) => ({
  selectedManga: [],
  addManga: (manga) => 
    set((state) => ({
      selectedManga: [...state.selectedManga, manga]
    })),
  removeManga: (id) =>
    set((state) => ({
      selectedManga: state.selectedManga.filter((manga) => manga.id !== id)
    })),
  clearSelection: () => set({ selectedManga: [] }),
  getByPlatform: (platform) => 
    get().selectedManga.filter((manga) => manga.platform === platform)
}))

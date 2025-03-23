export interface Chapter {
  id: string;
  title: string;
  slug: string;
  number: number;
  releaseDate: string;
  mangaId: string;
  pages?: ChapterPage[];
  views?: number;
  status?: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
}

export interface ChapterPage {
  id: string;
  pageNumber: number;
  imageUrl: string;
  chapterId: string;
  thumbnail?: string;
}

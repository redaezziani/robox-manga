export interface Manga {
  id: string;
  title: string;
  slug: string;
  rating: number;
  coverThumbnail: string;
  cover: string;
  otherTitles: string[];
  description: string;
  authors: string[];
  artists: string[];
  platform: string;
  type: string;
  releaseDate: string;
  status: string;
  genres: string[];
  views: number;
  createdAt: string;
  updatedAt: string;
  // Add chapters property
  chapters?: Array<{
    id: string;
    title: string;
    slug: string;
    number: number;
    releaseDate: string;
    mangaId: string;
  }>;
}

export interface Chapter {
  id: string;
  title: string;
  slug: string;
  number: number;
  releaseDate: string;
  mangaId: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export type MangaResponse = ApiResponse<Manga>;

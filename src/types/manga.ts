export interface Manga {
  id: string
  title: string
  slug: string
  rating: number
  otherTitles: string[]
  description: string
  cover: string
  authors: string[]
  artists: string[]
  type: string
  releaseDate: string
  status: string
  genres: string[]
  chapters: Chapter[]
}

export interface Chapter {
  id: string
  title: string
  slug: string
  number: number
  releaseDate: string
  mangaId: string
}

'use client'
import { useEffect } from 'react'
import { notFound } from 'next/navigation'
import { use } from 'react'
import MangaDetails from './components/manga-details'
import DetailsPath from './components/details-path'
import { Loader2 } from 'lucide-react'
import useMangaStore from '@/zustand/data/store'

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const { manga, loadingStates, error, fetchManga } = useMangaStore()

  useEffect(() => {
    fetchManga(resolvedParams.slug)
  }, [resolvedParams.slug, fetchManga])

  if (error) {
    notFound()
  }

  if (loadingStates.singleManga) {
    return (
      <div lang='ar' className="flex h-[50vh] items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className='animate-spin' />
          <span>جاري التحميل...</span>
        </div>
      </div>
    )
  }

  if (!manga) {
    return null
  }

  return (
    <div lang='ar' className="container mx-auto px-4 py-8">
      <section className="flex mt-6 mb-6 flex-col items-start justify-start">
       
        <h2 lang="ar" className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-50">
          تفاصيل المانجا
        </h2>
        <p lang="ar" className="text-sm text-gray-500 dark:text-gray-300">
          استكشف تفاصيل هذه المانجا، بما في ذلك الفصول المتاحة والتقييمات والمعلومات الأساسية
        </p>
      </section>
      <DetailsPath title={manga.otherTitles.length > 0 && manga.otherTitles[0]!==" - " ? manga.otherTitles[0] : manga.title} />
      <MangaDetails chapters={manga.chapters} manga={manga} />
    </div>
  )
}

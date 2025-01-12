'use client'
import Link from 'next/link'
import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Chapter } from '@/types/manga'

interface ChaptersListProps {
  chapters: Chapter[]
}

export default function ChaptersList({ chapters }: ChaptersListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>رقم الفصل</TableHead>
            <TableHead>العنوان</TableHead>
            <TableHead>تاريخ النشر</TableHead>
            <TableHead className="text-right">قراءة</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chapters.map((chapter) => (
            <TableRow key={chapter.id}>
              <TableCell>الفصل {chapter.number}</TableCell>
              <TableCell>{chapter.title}</TableCell>
              <TableCell>
                {format(new Date(chapter.releaseDate), 'PP', { locale: ar })}
              </TableCell>
              <TableCell className="text-right py-1.5">
                <Button asChild variant="ghost">
                  <Link href={`/home/manga/chapter/${chapter.slug}`}>
                    قراءة
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

'use client';
import Link from 'next/link';

import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Chapter } from '@/types/manga';

interface ChaptersListProps {
  chapters: Chapter[];
  mangaId: string;
}

export default function ChaptersList({ chapters, mangaId }: ChaptersListProps) {
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
              <TableCell>{format(new Date(chapter.releaseDate), 'PP', { locale: ar })}</TableCell>
              <TableCell className="py-1.5 text-right">
                <Button asChild variant="ghost">
                  <Link href={`/manga/${mangaId}/chapter/${chapter.number}`}>قراءة</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

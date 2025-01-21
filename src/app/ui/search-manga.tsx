'use client';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';


import { ScrollArea } from '@/components/ui/scroll-area';
import useSearchStore from '../store/search-store';

export default function SearchManga() {
  const [searchQuery, setSearchQuery] = useState('');
  const { fetchAllMangas, filteredMangas, loadingStates } = useSearchStore();

  const debouncedSearch = useCallback(
    useDebounce(async (query: string) => {
      if (query.trim()) {
        await fetchAllMangas({ search: query });
      }
    }, 500),
    []
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      debouncedSearch(query);
    },
    [debouncedSearch]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Search
          size={18}
          className="hover:text-primary cursor-pointer transition-colors"
          aria-label="بحث عن المانجا"
        />
      </DialogTrigger>
      <DialogContent lang="ar" className="flex  min-h-screen flex-col md:!min-h-80 md:max-w-xl">
        <DialogHeader>
          <div className="mt-4 flex">
            <DialogTitle>بحث عن المانجا</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          <div className="relative">
            <Input
              value={searchQuery}
              onChange={handleSearch}
              className="peer pe-9 text-right"
              placeholder="ابحث عن المانجا..."
              autoComplete="off"
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3">
              {loadingStates.allMangas ? (
                <div className="border-primary size-4 animate-spin rounded-full border-2 border-t-transparent" />
              ) : (
                <Search size={16} strokeWidth={2} aria-hidden="true" />
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filteredMangas.length > 0 && (
                <ScrollArea
                dir='rtl'
                className=' h-[600px] md:max-h-[400px] '
                >
              <motion.div
                className="mt-4 grid  grid-cols-2  "
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {filteredMangas.map((manga) => (
                  <motion.div key={manga.id} variants={itemVariants} layout>
                    <Link
                      href={`/manga/${manga.id}`}
                      className="hover:bg-accent block rounded-md p-2"
                    >
                      <div className="flex items-center justify-end gap-3">
                        {manga.cover && (
                          <motion.div
                            className="relative h-16 w-12 shrink-0"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Image
                              src={manga.cover}
                              alt={manga.title}
                              fill
                              className="rounded object-cover"
                              sizes="48px"
                            />
                          </motion.div>
                        )}
                        <div className="flex-1 text-right">
                          <p className="line-clamp-1 font-medium">{manga.title}</p>
                          {manga.authors.length > 0 && (
                            <p className="text-muted-foreground line-clamp-1 text-sm">
                              تأليف {manga.authors[0]}
                            </p>
                          )}
                          {manga.status && (
                            <p className="text-muted-foreground text-xs">{manga.status}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              </ScrollArea>
            )}
          </AnimatePresence>
        </div>

        <DialogFooter className=" flex   w-full items-end justify-end border-t  pt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground flex w-full items-end justify-end gap-2 text-sm"
          >
            <span className="text-muted-foreground !flex gap-2 ">
              <p>اضغط</p>
              <Badge variant={'outline'}>ESC</Badge>
              <p>للإغلاق</p>
            </span>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

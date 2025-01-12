"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState, useCallback } from "react";
import useMangaStore from "@/zustand/data/store";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function SearchManga() {
    const [searchQuery, setSearchQuery] = useState("");
    const { fetchAllMangas, filteredMangas, loadingStates } = useMangaStore();

    const debouncedSearch = useCallback(
        useDebounce(async (query: string) => {
            if (query.trim()) {
                await fetchAllMangas(1, 10, query);
            }
        }, 500),
        []
    );

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    }, [debouncedSearch]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Search
                    size={24}
                    className="cursor-pointer hover:text-primary transition-colors"
                    aria-label="بحث عن المانجا"
                />
            </DialogTrigger>
            <DialogContent lang="ar" className="md:max-w-xl  min-h-screen md:!min-h-80 flex flex-col">
                <DialogHeader>
                    <div className="flex mt-4">
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
                        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80">
                            {loadingStates.allMangas ? (
                                <div className="animate-spin h-4 w-4 border-2 border-primary rounded-full border-t-transparent" />
                            ) : (
                                <Search size={16} strokeWidth={2} aria-hidden="true" />
                            )}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {filteredMangas.length > 0 && (
                            <motion.div
                                className="mt-4 h-[600px] md:max-h-[400px] grid grid-cols-2 overflow-y-auto"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            >
                                {filteredMangas.map((manga) => (
                                    <motion.div
                                        key={manga.id}
                                        variants={itemVariants}
                                        layout
                                    >
                                        <Link
                                            href={`/manga/${manga.id}`}
                                            className="block p-2 hover:bg-accent rounded-md"
                                        >
                                            <div className="flex items-center gap-3 justify-end">
                                                {manga.cover && (
                                                    <motion.div
                                                        className="relative h-16 w-12 flex-shrink-0"
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        <Image
                                                            src={manga.cover}
                                                            alt={manga.title}
                                                            fill
                                                            className="object-cover rounded"
                                                            sizes="48px"
                                                        />
                                                    </motion.div>
                                                )}
                                                <div className="flex-1 text-right">
                                                    <p className="font-medium line-clamp-1">{manga.title}</p>
                                                    {manga.authors.length > 0 && (
                                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                                            تأليف {manga.authors[0]}
                                                        </p>
                                                    )}
                                                    {manga.status && (
                                                        <p className="text-xs text-muted-foreground">
                                                            {manga.status}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <DialogFooter className=" w-full   flex justify-end items-end pt-4  border-t">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-end justify-end w-full gap-2 text-sm text-muted-foreground"
                    >
                        <span
                        className="text-muted-foreground gap-2 !flex "
                        ><p >اضغط</p>
                            <Badge
                            variant={"outline"}
                            >
                                ESC
                            </Badge> 
                            <p>
                            للإغلاق
                            </p>
                            </span>
                    </motion.div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

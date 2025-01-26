import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useMangaSelectionStore } from "@/store/manga-selection-store"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface MangaChapterConfig {
    mangaId: string;
    isRange: boolean;
    singleChapter?: number;
    startChapter?: number;
    endChapter?: number;
}

interface BatchChapterForm {
    mangaConfigs: Record<string, MangaChapterConfig>;
}

interface ShowToastParams {
    title: string
    description: string
    type: 'success' | 'error'
}

const showToast = ({ title, description, type }: ShowToastParams) => {
    toast[type](title, { description })
}

export function BatchChapterSheet() {
    const [open, setOpen] = useState(false);
    const { selectedManga, clearSelection } = useMangaSelectionStore();
    const [mangaConfigs, setMangaConfigs] = useState<Record<string, MangaChapterConfig>>({});
    const [imageError, setImageError] = useState<Record<string, boolean>>({});

    // Initialize configs for selected manga
    const initializeMangaConfigs = () => {
        const configs: Record<string, MangaChapterConfig> = {};
        selectedManga.forEach(manga => {
            if (!mangaConfigs[manga.id]) {
                configs[manga.id] = {
                    mangaId: manga.id,
                    isRange: false,
                    singleChapter: 1
                };
            } else {
                configs[manga.id] = mangaConfigs[manga.id];
            }
        });
        setMangaConfigs(configs);
    };

    const onSubmit = async () => {
        try {
            const promises = Object.values(mangaConfigs).map(config => {
                if (config.isRange && config.startChapter && config.endChapter) {
                    return Array.from(
                        { length: config.endChapter - config.startChapter + 1 },
                        (_, i) => i + config.startChapter
                    ).map(chapterNumber =>
                        fetch(
                            `http://localhost:8000/api/manga/chapter?mangaId=${config.mangaId}&chapterNumber=${chapterNumber}`,
                            {
                                method: 'POST',
                                headers: { 'accept': '*/*' },
                            }
                        )
                    );
                } else if (!config.isRange && config.singleChapter) {
                    return [
                        fetch(
                            `http://localhost:8000/api/manga/chapter?mangaId=${config.mangaId}&chapterNumber=${config.singleChapter}`,
                            {
                                method: 'POST',
                                headers: { 'accept': '*/*' },
                            }
                        )
                    ];
                }
                return [];
            }).flat();

            await Promise.all(promises);

            toast.success("تم إضافة الفصول بنجاح", {
                description: `تمت إضافة ${promises.length} فصل`
            });

            setOpen(false);
            clearSelection();
        } catch (error) {
            toast.error("خطأ في إضافة الفصول", {
                description: "حدث خطأ أثناء محاولة إضافة الفصول"
            });
        }
    };

    return (
        <Sheet open={open} onOpenChange={(newOpen) => {
            setOpen(newOpen);
            if (newOpen) initializeMangaConfigs();
        }}>
            <SheetTrigger asChild>
                <Button variant="outline" disabled={selectedManga.length === 0}>
                    إضافة فصول للمحدد ({selectedManga.length})
                </Button>
            </SheetTrigger>
            <SheetContent className="   overflow-y-auto" >
                <SheetHeader>
                    <SheetTitle>إضافة فصول متعددة</SheetTitle>
                </SheetHeader>
                <ScrollArea
                dir="rtl"
                className="h-[calc(100vh-200px)] mt-4">
                    <div className=" w-full  grid gap-2  justify-start items-start place-content-start place-items-start grid-cols-2">
                        {selectedManga.map((manga) => (
                            <Card
                            
                            key={manga.id} className="p-4 ">
                                <div className="space-y-4">
                                    {/* Manga Header */}
                                    <div className="flex gap-4">
                                        {/* Manga Image */}
                                        <div className="relative h-[120px] border border-border w-[90px] overflow-hidden rounded-md">
                                            {!imageError[manga.id] ? (
                                                <Image
                                                    src={manga.coverThumbnail || manga.cover || '/placeholder.png'}
                                                    alt={manga.title}
                                                    fill
                                                    className="object-cover"
                                                    onError={() => setImageError(prev => ({ ...prev, [manga.id]: true }))}
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-muted">
                                                    <span className="text-xs text-muted-foreground">No image</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Manga Info */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="font-medium text-lg">{manga.title}</h4>
                                                    <p className="text-sm text-muted-foreground">{manga.otherTitles?.[0]}</p>
                                                </div>
                                                <Badge variant={'outline'}>{manga.platform}</Badge>
                                            </div>

                                            <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <p className="text-muted-foreground">النوع</p>
                                                    <p>{manga.type || 'غير محدد'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground">المؤلف</p>
                                                    <p>{manga.authors?.[0] || 'غير محدد'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground">الحالة</p>
                                                    <p>{manga.status}</p>
                                                </div>
                                            </div>

                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {manga.genres?.map((genre) => (
                                                    <Badge key={genre} variant="secondary" className="text-xs">
                                                        {genre}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chapter Controls */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor={`range-${manga.id}`} className="font-medium">
                                                نوع الإضافة
                                            </Label>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-muted-foreground">فصل واحد</span>
                                                <Switch
                                                    id={`range-${manga.id}`}
                                                    checked={mangaConfigs[manga.id]?.isRange}
                                                    onCheckedChange={(checked) => {
                                                        setMangaConfigs(prev => ({
                                                            ...prev,
                                                            [manga.id]: {
                                                                ...prev[manga.id],
                                                                isRange: checked,
                                                            }
                                                        }));
                                                    }}
                                                />
                                                <span className="text-sm text-muted-foreground">نطاق</span>
                                            </div>
                                        </div>

                                        {mangaConfigs[manga.id]?.isRange ? (
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>من فصل</Label>
                                                    <Input
                                                        type="number"
                                                        min={1}
                                                        value={mangaConfigs[manga.id]?.startChapter || 1}
                                                        onChange={(e) => {
                                                            setMangaConfigs(prev => ({
                                                                ...prev,
                                                                [manga.id]: {
                                                                    ...prev[manga.id],
                                                                    startChapter: Number(e.target.value)
                                                                }
                                                            }));
                                                        }}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>إلى فصل</Label>
                                                    <Input
                                                        type="number"
                                                        min={1}
                                                        value={mangaConfigs[manga.id]?.endChapter || 1}
                                                        onChange={(e) => {
                                                            setMangaConfigs(prev => ({
                                                                ...prev,
                                                                [manga.id]: {
                                                                    ...prev[manga.id],
                                                                    endChapter: Number(e.target.value)
                                                                }
                                                            }));
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <Label>رقم الفصل</Label>
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    value={mangaConfigs[manga.id]?.singleChapter || 1}
                                                    onChange={(e) => {
                                                        setMangaConfigs(prev => ({
                                                            ...prev,
                                                            [manga.id]: {
                                                                ...prev[manga.id],
                                                                singleChapter: Number(e.target.value)
                                                            }
                                                        }));
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
                <div className="mt-4">
                    <Button onClick={onSubmit} className="">
                        إضافة الفصول
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}

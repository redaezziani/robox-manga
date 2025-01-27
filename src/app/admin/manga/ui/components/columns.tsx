import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Manga } from "@/types/manga";
import { useMangaSelectionStore } from "@/store/manga-selection-store";
import Image from "next/image";

export const columns: ColumnDef<Manga>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      const { addManga, removeManga, selectedManga } = useMangaSelectionStore();
      const isSelected = selectedManga.some((manga) => manga.id === row.original.id);

      return (
        <div className="px-2">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => {
              if (checked) {
                // Pass the entire manga object
                addManga(row.original);
              } else {
                removeManga(row.original.id);
              }
            }}
            aria-label="Select row"
          />
        </div>
      );
    },
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "العنوان",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <div className="h-8 w-8 relative overflow-hidden rounded">
          <Image
            src={row.original.coverThumbnail || '/placeholder.png'}
            alt={row.original.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-medium line-clamp-1">{row.original.title}</span>
          <span className="text-xs text-muted-foreground truncate max-w-[200px]">
            {row.original.authors.join(', ')}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "الوصف",
    cell: ({ row }) => (
      <div className="flex overflow-hidden flex-col line-clamp-1 truncate">
        <span className="line-clamp-1 truncate">
          {row.original.description || 'لا يوجد وصف'}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "النوع",
    cell: ({ row }) => row.original.type || 'غير محدد',
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'مستمرة' ? 'default' : 'secondary'}>
        {row.original.status || 'غير محدد'}
      </Badge>
    ),
  },
  {
    accessorKey: "chapters",
    header: "عدد الفصول",
    cell: ({ row }) => row.original.chapters?.length || 0,
  },
  {
    accessorKey: "views",
    header: "المشاهدات",
    cell: ({ row }) => (row.original.views || 0).toLocaleString('ar-EG'),
  },
  {
    accessorKey: "genres",
    header: "التصنيفات",
    cell: ({ row }) => (
    <div className="flex flex-wrap gap-1">
      {row.original.genres.slice(0, 2).map((genre) => (
        <Badge key={genre} variant="secondary" className="text-xs">
          {genre}
        </Badge>
      ))}
    </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <span className="text-right">تاريخ الإضافة</span>,
    cell: ({ row }) => {
      const date = row.original.createdAt ? 
        new Date(row.original.createdAt).toLocaleDateString('ar-EG') : 
        'غير محدد';
      return date;
    },
  },
 
];

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Filter, SearchIcon, Columns3 } from "lucide-react";
import type { Table } from "@tanstack/react-table";
import type { Manga } from "@/types/manga";
import { AddMangaDialog } from "../dialogs/add-manga-dialog";
import { BatchChapterSheet } from "../sheets/batch-chapter-sheet";

interface TableFiltersProps {
  table: Table<Manga>;
  uniqueStatusValues: string[];
  selectedStatuses: string[];
  handleStatusChange: (checked: boolean, value: string) => void;
}

export function TableFilters({ 
  table, 
  uniqueStatusValues,
  selectedStatuses,
  handleStatusChange 
}: TableFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Input
            className="min-w-60 pr-9 text-right"
            value={(table.getColumn("title")?.getFilterValue() ?? "") as string}
            onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)}
            placeholder="ابحث عن مانجا..."
          />
          <SearchIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Status Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter className="ml-2" size={16} />
              الحالة
              {selectedStatuses.length > 0 && (
                <Badge variant="secondary" className="mr-2">
                  {selectedStatuses.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[200px]">
            <div className="space-y-2">
              {uniqueStatusValues.map((status) => (
                <div key={status} className="flex items-center">
                  <Checkbox
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={(checked) => handleStatusChange(!!checked, status)}
                  />
                  <span className="mr-2">{status}</span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Column Visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Columns3 className="ml-2" size={16} />
              العرض
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>إخفاء/إظهار الأعمدة</DropdownMenuLabel>
            {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id === 'title' ? 'العنوان' :
                 column.id === 'type' ? 'النوع' :
                 column.id === 'status' ? 'الحالة' :
                 column.id === 'chapters' ? 'الفصول' :
                 column.id === 'views' ? 'المشاهدات' :
                 column.id === 'createdAt' ? 'تاريخ الإضافة' : column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <AddMangaDialog />
        <BatchChapterSheet />
      </div>
    </div>
  );
}

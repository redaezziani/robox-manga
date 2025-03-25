import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, type Table as TableType } from "@tanstack/react-table";
import type { Manga } from "@/types/manga";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface MangaTableProps {
  table: TableType<Manga>;
}

export function MangaTable({ table }: MangaTableProps) {
  const [isSorting, setIsSorting] = useState(false);
  
  const sortingState = table.getState().sorting;
  
  useEffect(() => {
    setIsSorting(true);
    const timer = setTimeout(() => setIsSorting(false), 300);
    return () => clearTimeout(timer);
  }, [sortingState]);
  
  return (
    <div className="overflow-y-auto rounded-lg border border-border bg-background">
      <Table className="table-fixed">
        <TableHeader className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent text-gray-500">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ width: `${header.getSize()}px` }}
                  className="h-11"
                >
                  {header.isPlaceholder ? null : header.column.getCanSort() ? (
                    <div
                      className={cn(
                        header.column.getCanSort() &&
                          "flex h-full cursor-pointer select-none items-center justify-between gap-2",
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                      onKeyDown={(e) => {
                        if (
                          header.column.getCanSort() &&
                          (e.key === "Enter" || e.key === " ")
                        ) {
                          e.preventDefault();
                          header.column.getToggleSortingHandler()?.(e);
                        }
                      }}
                      tabIndex={header.column.getCanSort() ? 0 : undefined}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: (
                          <ChevronUp
                            className="shrink-0 opacity-60"
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        ),
                        desc: (
                          <ChevronDown
                            className="shrink-0 opacity-60"
                            size={16}
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  ) : (
                    flexRender(header.column.columnDef.header, header.getContext())
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className={cn("transition-all duration-300", isSorting ? "opacity-70 blur-[0.5px]" : "")}>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow 
                key={row.id} 
                data-state={row.getIsSelected() && "selected"}
                className="transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="last:py-0 transition-all">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                لا توجد نتائج.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
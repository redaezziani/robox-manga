import * as React from "react";
import {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  Table as TableType,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilterIcon, MoveLeft, SearchIcon } from "lucide-react";

export type DataItem = Record<string, any>;

interface DataTableProps {
  data: DataItem[];
  columns: ColumnDef<DataItem>[];
  loading?: boolean;
  total?: number;
  element?: React.ReactNode;
}

export function DataTable({
  data,
  columns,
  loading = false,
  total = 0,
  element,
}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    {}
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full rounded-lg bg-background">
      {/* Header: Search & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-300/15 p-2 lowercase md:py-4">
        <div className="relative flex w-full max-w-xs items-start justify-center">
          <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-slate-400 dark:text-slate-50" />
          <Input
            placeholder="Search..."
            value={
              (table
                .getColumn(columns[2]?.accessorKey)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(columns[2]?.accessorKey)
                ?.setFilterValue(event.target.value)
            }
            className="w-full border-slate-400/35 bg-white"
          />
        </div>
        <div className="flex items-center flex-wrap justify-between gap-4">
          {element}
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-md" asChild>
              <Button
                variant={"outline"}
                className="flex items-center justify-center gap-2 border-dashed border-slate-400/35 px-2 text-slate-600"
              >
                <FilterIcon />
                Filter Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="border-t">
        <Table className="min-h-48 rounded-lg">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className={`truncate bg-slate-300/15 text-sm font-semibold capitalize text-slate-900 dark:text-slate-50 ${
                      header.column.id === "id" ? "hidden" : ""
                    }`}
                    key={header.id}
                  >
                    <div className="flex gap-2 text-slate-500 dark:text-slate-50">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className={`h-10 capitalize ${
                        cell.column.id === "id" ? "hidden" : ""
                      }`}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="absolute flex w-full touch-none items-center justify-center gap-2 p-5 text-slate-400 hover:bg-transparent">
                <p>no data</p>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 p-2 py-4">
        <Pagination table={table} />
      </div>
    </div>
  );
}

const Pagination = ({ table }: { table: TableType<any> }) => {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    if (pageCount <= 4) {
      for (let i = 0; i < pageCount; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);
      if (currentPage < 3) {
        for (let i = 1; i < 3; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(pageCount - 1);
      } else if (currentPage >= 3 && currentPage < pageCount - 3) {
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(pageCount - 1);
      } else {
        pages.push("...");
        for (let i = pageCount - 3; i < pageCount - 1; i++) {
          pages.push(i);
        }
        pages.push(pageCount - 1);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <MoveLeft />
      </Button>
      {getVisiblePages().map((page, index) =>
        typeof page === "string" ? (
          <span key={index}>...</span>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? "solid" : "outline"}
            size="sm"
            onClick={() => table.setPageIndex(page)}
          >
            {page + 1}
          </Button>
        )
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <MoveLeft className="rotate-180" />
      </Button>
    </div>
  );
};

export type { ColumnDef }
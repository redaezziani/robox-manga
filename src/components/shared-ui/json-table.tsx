import { useState, useMemo } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  RowData,
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

// Generic type for table data
export type DataItem<T extends RowData> = T;

// Configuration types for customization
export interface TableConfig {
  enableSearch?: boolean;
  enableColumnFilters?: boolean;
  enablePagination?: boolean;
  enableSorting?: boolean;
  pageSize?: number;
  searchPlaceholder?: string;
  noDataMessage?: string;
  customStyles?: {
    table?: string;
    header?: string;
    row?: string;
    cell?: string;
    pagination?: string;
  };
}

// Search configuration
export interface SearchConfig {
  searchableColumns?: string[];
  customSearchFunction?: (
    row: any,
    columnId: string,
    filterValue: string
  ) => boolean;
}

interface DataTableProps<T extends RowData> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  total?: number;
  tableConfig?: TableConfig;
  searchConfig?: SearchConfig;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  onRowClick?: (row: T) => void;
  renderCustomCell?: (row: T, columnId: string) => React.ReactNode;
}

export function DataTable<T extends RowData>({
  data,
  columns,
  loading = false,
  total = 0,
  tableConfig = {},
  searchConfig = {},
  headerContent,
  footerContent,
  onRowClick,
  renderCustomCell,
}: DataTableProps<T>) {
  const {
    enableSearch = true,
    enableColumnFilters = true,
    enablePagination = true,
    enableSorting = true,
    pageSize = 10,
    searchPlaceholder = "Search...",
    noDataMessage = "No data available",
    customStyles = {},
  } = tableConfig;

  const { searchableColumns = [], customSearchFunction } = searchConfig;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  // Custom filter function
  const fuzzyFilter = (row: any, columnId: string, filterValue: string) => {
    if (customSearchFunction) {
      return customSearchFunction(row, columnId, filterValue);
    }

    const value = row.getValue(columnId);
    return String(value)
      .toLowerCase()
      .includes(String(filterValue).toLowerCase());
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    enableSorting,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  // Memoized searchable columns
  const searchableColumnIds = useMemo(() => {
    return searchableColumns.length > 0
      ? searchableColumns
      //@ts-ignore
      : columns.map((col) => col.accessorKey as string);
  }, [searchableColumns, columns]);

  return (
    <div className="w-full rounded-lg bg-background">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-300/15 p-2 md:py-4">
        {enableSearch && (
          <div className="relative flex w-full max-w-xs items-start justify-center">
            <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-slate-400 dark:text-slate-50" />
            <Input
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full border-slate-400/35 bg-background"
            />
          </div>
        )}

        <div className="flex items-center flex-wrap justify-between gap-4">
          {headerContent}
          {enableColumnFilters && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <FilterIcon size={16} />
                  Column Visibility
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
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
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className={`border-t ${customStyles.table || ""}`}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className={customStyles.header}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`bg-slate-300/15 text-sm font-semibold capitalize`}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-2 ${
                          enableSorting && header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
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
                  className={`${customStyles.row || ""} ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={customStyles.cell || ""}
                    >
                      {renderCustomCell
                        ? renderCustomCell(row.original, cell.column.id)
                        : flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {loading ? "Loading..." : noDataMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Section */}
        {enablePagination && (
          <div className="flex items-center justify-end p-4">
            <Pagination table={table} className={customStyles?.pagination} />
          </div>
        )}
      </div>
  );
}
interface PaginationProps {
  table: TableType<any>;
  className?: string;
}

const Pagination = ({ table, className }: PaginationProps) => {
  const currentPage = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  // Generate array of page numbers
  const getPageNumbers = () => {
    const totalPages = Math.min(6, pageCount); // Limit to 6 pages as in your example
    return Array.from({ length: totalPages }, (_, i) => i);
  };

  return (
    <fieldset className="space-y-4">
      <RadioGroup
        className="flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5"
        value={currentPage.toString()}
        onValueChange={(value) => table.setPageIndex(parseInt(value))}
      >
        {getPageNumbers().map((number) => (
          <label
            key={number}
            className="relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border border-input text-center text-sm font-medium outline-offset-2 transition-colors first:rounded-s-lg last:rounded-e-lg has-[[data-state=checked]]:z-10 has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
          >
            <RadioGroupItem
              id={`page-${number}`}
              value={number.toString()}
              className="sr-only after:absolute after:inset-0"
            />
            {number + 1}
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
};
// Pagination Component
interface PaginationProps {
  table: TableType<any>;
  className?: string;
}

export type { ColumnDef };

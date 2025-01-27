import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";

interface TablePaginationProps<TData> {
    table: Table<TData>;
}

const getPageRange = (currentPage: number, totalPages: number) => {
    const range: number[] = [];
    const maxPages = 5;
    let start = Math.max(0, currentPage - Math.floor(maxPages / 2));
    let end = Math.min(totalPages - 1, start + maxPages - 1);

    if (end - start + 1 < maxPages) {
        start = Math.max(0, end - maxPages + 1);
    }

    for (let i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
};

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
    const currentPage = table.getState().pagination.pageIndex;
    const totalPages = table.getPageCount();
    const pageRange = getPageRange(currentPage, totalPages);

    return (
        <div className="flex w-full  items-center justify-end gap-8">
            {/* Results per page */}
            <div className="flex 
       items-center gap-3 ">
                <Label htmlFor="perPage" className="text-sm w-32">
                    النتائج لكل صفحة
                </Label>
                <Select
                    value={table.getState().pagination.pageSize.toString()}
                    onValueChange={(value) => {
                        table.setPageSize(Number(value));
                    }}
                >
                    <SelectTrigger id="perPage" className="w-[70px]">
                        <SelectValue placeholder="اختر" />
                    </SelectTrigger>
                    <SelectContent>
                        {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                            <SelectItem key={pageSize} value={pageSize.toString()}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Page number information */}
            <div className="flex grow justify-end whitespace-nowrap text-sm text-muted-foreground">
                <p className="text-sm text-muted-foreground" dir="ltr">
                    {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                    {Math.min(
                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                        table.getFilteredRowModel().rows.length
                    )}{" "}
                    من {table.getFilteredRowModel().rows.length}
                </p>
            </div>

            <Pagination className="flex items-center justify-end" dir="rtl">
                <PaginationContent>
                    <PaginationItem>
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                            className="h-8 w-8 rounded-lg"
                        >
                            <ChevronLast className="h-4 w-4" />
                        </Button>
                    </PaginationItem>
                    <PaginationItem>
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="h-8 w-8 rounded-lg"
                        >
                            <ChevronRight className="h-4 w-4" />

                        </Button>
                    </PaginationItem>

                    {pageRange.map((pageIndex) => (
                        <PaginationItem key={pageIndex}>
                            <Button
                                variant={pageIndex === currentPage ? "default" : "outline"}
                                onClick={() => table.setPageIndex(pageIndex)}
                                className="h-8 w-8 rounded-lg"
                            >
                                {pageIndex + 1}
                            </Button>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="h-8 w-8 rounded-lg"
                        >
                            <ChevronLeft className="h-4 w-4" />

                        </Button>
                    </PaginationItem>
                    <PaginationItem>
                        <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-lg"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronFirst className="h-4 w-4" />


                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>
    );
}

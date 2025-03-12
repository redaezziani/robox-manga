"use client";

import { useState, useId, useMemo, useRef } from "react";
import { useQuery } from '@tanstack/react-query';
import { MangaTable } from "./components/manga-table";
import { TableFilters } from "./components/table-filters";
import { columns } from "./components/columns";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getFacetedUniqueValues,
    type ColumnFiltersState,
    type VisibilityState,
    type PaginationState,
    type SortingState
} from "@tanstack/react-table";
import type { Manga } from '@/types/manga';
import { TablePagination } from "./components/table-pagination";

export default function MangaList() {
    const id = useId();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 9
    });
    const inputRef = useRef<HTMLInputElement>(null);

    const [sorting, setSorting] = useState<SortingState>([
        {
            id: "title",
            desc: false,
        },
    ]);

    const { data, isLoading } = useQuery({
        queryKey: ['manga', pagination, sorting, columnFilters],
        queryFn: async () => {
            const searchParams = new URLSearchParams();
            searchParams.set('page', (pagination.pageIndex + 1).toString());
            searchParams.set('limit', pagination.pageSize.toString());

            if (columnFilters.length) {
                const searchFilter = columnFilters.find(f => f.id === 'title');
                if (searchFilter) searchParams.set('search', searchFilter.value as string);

                const statusFilter = columnFilters.find(f => f.id === 'status');
                if (statusFilter) searchParams.set('status', statusFilter.value as string);
            }

            const response = await fetch(`http://localhost:8000/api/manga/all?${searchParams}`);
            return response.json();
        },
    });

    const table = useReactTable<Manga>({
        data: data?.data?.items ?? [],
        columns,
        pageCount: data?.data?.meta?.totalPages ?? -1,
        state: {
            sorting,
            pagination,
            columnFilters,
            columnVisibility,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableSortingRemoval: false,
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
    });

    // Get unique status values
    const uniqueStatusValues = useMemo(() => {
        const statusColumn = table.getColumn("status");
        if (!statusColumn) return [];
        const values = Array.from(statusColumn.getFacetedUniqueValues().keys());
        return values.sort();
    }, [table.getColumn("status")?.getFacetedUniqueValues()]);

    const selectedStatuses = useMemo(() => {
        const filterValue = table.getColumn("status")?.getFilterValue() as string[];
        return filterValue ?? [];
    }, [table.getColumn("status")?.getFilterValue()]);

    const handleStatusChange = (checked: boolean, value: string) => {
        const filterValue = table.getColumn("status")?.getFilterValue() as string[];
        const newFilterValue = filterValue ? [...filterValue] : [];

        if (checked) {
            newFilterValue.push(value);
        } else {
            const index = newFilterValue.indexOf(value);
            if (index > -1) {
                newFilterValue.splice(index, 1);
            }
        }

        table.getColumn("status")?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-4" dir="rtl">
            <TableFilters
                table={table}
                uniqueStatusValues={uniqueStatusValues}
                selectedStatuses={selectedStatuses}
                handleStatusChange={handleStatusChange}
            />
            <MangaTable table={table} />
            <TablePagination table={table} />
        </div>
    );
}

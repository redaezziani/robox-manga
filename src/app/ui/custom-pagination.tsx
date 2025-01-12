"use client";

import { usePagination } from "@/hooks/use-pagination";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  paginationItemsToDisplay?: number;
}

export function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
  paginationItemsToDisplay = 5,
}: CustomPaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  });

  if (totalPages <= 1) return null;

  return(
    <div
    className=" flex w-full  items-end justify-end  "
    >
    <Pagination
    className=" w-full flex items-end justify-end"
    dir="rtl">
      <PaginationContent className="flex flex-row-reverse gap-2">
        {/* Last Page */}
        <PaginationItem className="inline-block">
          <PaginationLink
            className="min-w-[40px] h-[40px] flex items-center justify-center rounded-md cursor-pointer hover:bg-accent aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            onClick={() => onPageChange(totalPages)}
            aria-disabled={currentPage === totalPages}
          >
            <ChevronFirst className="h-4 w-4 " />
          </PaginationLink>
        </PaginationItem>

        {/* Next Page */}
        <PaginationItem>
          <PaginationLink
            className="min-w-[40px] h-[40px] flex items-center justify-center rounded-md cursor-pointer hover:bg-accent aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            onClick={() => onPageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis className="min-w-[40px] h-[40px] flex items-center justify-center" />
          </PaginationItem>
        )}

        {pages.toReversed().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              className={`min-w-[35px] h-[35px] flex items-center justify-center rounded-md cursor-pointer hover:bg-accent ${
                page === currentPage ? 'bg-accent text-accent-foreground' : ''
              }`}
              onClick={() => onPageChange(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis className="min-w-[35px] h-[35px] flex items-center justify-center" />
          </PaginationItem>
        )}

        {/* Previous Page */}
        <PaginationItem>
          <PaginationLink
            className="min-w-[35px] h-[35px] flex items-center justify-center rounded-md cursor-pointer hover:bg-accent aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            onClick={() => onPageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        {/* First Page */}
        <PaginationItem className="inline-block">
          <PaginationLink
            className="min-w-[40px] h-[40px] flex items-center justify-center rounded-md cursor-pointer hover:bg-accent aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            onClick={() => onPageChange(1)}
            aria-disabled={currentPage === 1}
          >
            <ChevronLast className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </div>
  )
}
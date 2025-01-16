'use client';

import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';

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

  return (
    <div className=" flex w-full  items-end justify-end  ">
      <Pagination className=" flex w-full items-end justify-end" dir="rtl">
        <PaginationContent className="flex flex-row-reverse gap-2">
          {/* Last Page */}
          <PaginationItem className="inline-block">
            <PaginationLink
              className="hover:bg-accent flex h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-md aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
              onClick={() => onPageChange(totalPages)}
              aria-disabled={currentPage === totalPages}
            >
              <ChevronFirst className="size-4 " />
            </PaginationLink>
          </PaginationItem>

          {/* Next Page */}
          <PaginationItem>
            <PaginationLink
              className="hover:bg-accent flex h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-md aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
              onClick={() => onPageChange(currentPage + 1)}
              aria-disabled={currentPage === totalPages}
            >
              <ChevronLeft className="size-4" />
            </PaginationLink>
          </PaginationItem>

          {showRightEllipsis && (
            <PaginationItem>
              <PaginationEllipsis className="flex h-[40px] min-w-[40px] items-center justify-center" />
            </PaginationItem>
          )}

          {pages.toReversed().map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                className={`hover:bg-accent flex h-[35px] min-w-[35px] cursor-pointer items-center justify-center rounded-md ${
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
              <PaginationEllipsis className="flex h-[35px] min-w-[35px] items-center justify-center" />
            </PaginationItem>
          )}

          {/* Previous Page */}
          <PaginationItem>
            <PaginationLink
              className="hover:bg-accent flex h-[35px] min-w-[35px] cursor-pointer items-center justify-center rounded-md aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
              onClick={() => onPageChange(currentPage - 1)}
              aria-disabled={currentPage === 1}
            >
              <ChevronRight className="size-4" />
            </PaginationLink>
          </PaginationItem>

          {/* First Page */}
          <PaginationItem className="inline-block">
            <PaginationLink
              className="hover:bg-accent flex h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-md aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
              onClick={() => onPageChange(1)}
              aria-disabled={currentPage === 1}
            >
              <ChevronLast className="size-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

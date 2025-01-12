// usePagination.ts
interface UsePaginationProps {
    totalPages: number;
    currentPage: number;
    paginationItemsToDisplay?: number;
  }
  
  export function usePagination({
    totalPages,
    currentPage,
    paginationItemsToDisplay = 5,
  }: UsePaginationProps) {
    const generatePages = () => {
      if (!totalPages || totalPages <= 0) return [];
      
      if (totalPages <= paginationItemsToDisplay) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const pages: number[] = [];
      const halfDisplay = Math.floor(paginationItemsToDisplay / 2);
      
      let startPage = Math.max(currentPage - halfDisplay, 1);
      let endPage = Math.min(startPage + paginationItemsToDisplay - 1, totalPages);
  
      if (endPage - startPage + 1 < paginationItemsToDisplay) {
        startPage = Math.max(endPage - paginationItemsToDisplay + 1, 1);
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
  
      return pages;
    };

    if (!totalPages || totalPages <= 0) {
      return {
        pages: [],
        showLeftEllipsis: false,
        showRightEllipsis: false,
      };
    }
  
    return {
      pages: generatePages(),
      showLeftEllipsis: currentPage > 3,
      showRightEllipsis: currentPage < totalPages - 2,
    };
  }
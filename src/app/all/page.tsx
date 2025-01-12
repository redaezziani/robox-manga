'use client'
import React, { useEffect } from 'react'
import MainPageLayout from '@/components/shared-ui/layouts/main-page-layout'
import useMangaStore from '@/zustand/data/store'
import MangaGrid from '../ui/manga-grid'

interface Filters {
  genres: string[];
  status: string[];
  types: string[];
}

// Add debounce utility at the top of the file
function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

const AllMangaPage = () => {
    const { 
      filteredMangas, 
      loadingStates, 
      fetchAllMangas,
      fetchGenres,
      fetchStatuses,
      fetchTypes,
      genres,
      statuses,
      types,
      currentPage, 
      totalPages,
      searchQuery,
      handleSearch,
      setSearchQuery,
    } = useMangaStore()

    const ITEMS_PER_PAGE = 12;
    const [currentFilters, setCurrentFilters] = React.useState<Filters>({
        genres: [],
        status: [],
        types: []
    });

    useEffect(() => {
        const initializeData = async () => {
            console.log("Starting data initialization...");
            await Promise.all([
                fetchTypes(),
                fetchGenres(),
                fetchStatuses(),
            ]);
            console.log("Finished loading filters");
            fetchAllMangas({ page: 1, limit: ITEMS_PER_PAGE });
        };

        initializeData();
    }, []);

    // Log current state for debugging
    useEffect(() => {
        console.log("Current types:", types);
    }, [types]);

    const handleFilterChange = (filters: Partial<Filters>) => {
        const newFilters = {
            genres: filters.genres || currentFilters.genres,
            status: filters.status || currentFilters.status,
            types: filters.types || currentFilters.types
        };
        setCurrentFilters(newFilters);
        
        fetchAllMangas({
            page: 1,
            limit: ITEMS_PER_PAGE,
            ...(searchQuery ? { search: searchQuery } : {}),
            ...newFilters
        });
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        fetchAllMangas({
            page,
            limit: ITEMS_PER_PAGE,
            ...currentFilters
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Add debounced search handler
    const debouncedSearch = React.useCallback(
        debounce((query: string) => {
            handleSearch(query);
        }, 500),
        []
    );

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        if (!query) {
            // Only reset filters if there's no active search
            if (currentFilters.genres.length === 0 && 
                currentFilters.status.length === 0 && 
                currentFilters.types.length === 0) {
                fetchAllMangas({ page: 1, limit: ITEMS_PER_PAGE });
            } else {
                // If filters are active, keep them
                fetchAllMangas({
                    page: 1,
                    limit: ITEMS_PER_PAGE,
                    ...currentFilters
                });
            }
        } else {
            debouncedSearch(query);
        }
    };

    return (
        <MainPageLayout>
            <div className="flex container mx-auto mt-10 flex-col gap-2 relative px-4 w-full">
                <section className=" flex mt-6 mb-6 flex-col items-start justify-start">
                    <h3 lang="ar" className="text-lg font-semibold text-gray-600">
                        عالمك المفضل للمانجا العربية
                    </h3>
                    <p lang="ar" className="text-sm text-gray-500 dark:text-gray-300">
                        انضم إلينا في رحلة استكشاف عالم المانجا الساحر
                    </p>
                </section>

                <MangaGrid
                    mangas={filteredMangas}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    isLoading={loadingStates.allMangas}
                    genres={genres}
                    statuses={statuses}
                    types={types}
                    onFilterChange={handleFilterChange}
                    searchQuery={searchQuery}
                    onSearch={handleSearchChange}
                />
            </div>
        </MainPageLayout>
    )
}

export default AllMangaPage

'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import useMangaStore, { useGenresSWR, useStatusesSWR, useTypesSWR } from '../store/data';
import MangaGrid from '../../ui/manga-grid';
import MangaSkeletonLoader from './MangaSkeleton';

interface Filters {
    genres: string[];
    status: string[];
    types: string[];
}

const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

const ITEMS_PER_PAGE = 18;

const MangaClientWrapper = () => {
    const initialFilters = useMemo(() => ({
        genres: [],
        status: [],
        types: [],
    }), []);

    const [currentFilters, setCurrentFilters] = useState<Filters>(initialFilters);

    const {
        filteredMangas,
        fetchAllMangas,
        searchQuery,
        handleSearch,
        setSearchQuery,
        currentPage,
        totalPages,
        isLoading: mangaLoading,
        error: mangaError
    } = useMangaStore();

    const { data: genres, error: genresError, isLoading: genresLoading } = useGenresSWR();
    const { data: statuses, error: statusesError, isLoading: statusesLoading } = useStatusesSWR();
    const { data: types, error: typesError, isLoading: typesLoading } = useTypesSWR();

    // Simplified initial data fetch
    useEffect(() => {
        fetchAllMangas({
            page: 1,
            limit: ITEMS_PER_PAGE,
            ...initialFilters
        });
    }, []);

    const handleFilterChange = useCallback((filters: Partial<Filters>) => {
        const newFilters = {
            genres: filters.genres || currentFilters.genres,
            status: filters.status || currentFilters.status,
            types: filters.types || currentFilters.types,
        };

        setCurrentFilters(newFilters);

        fetchAllMangas({
            page: 1,
            limit: ITEMS_PER_PAGE,
            ...(searchQuery ? { search: searchQuery } : {}),
            ...newFilters,
        });
    }, [currentFilters, searchQuery, fetchAllMangas]);

    const handlePageChange = useCallback((page: number) => {
        if (page < 1 || page > totalPages) return;

        fetchAllMangas({
            page,
            limit: ITEMS_PER_PAGE,
            ...currentFilters,
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [totalPages, currentFilters, fetchAllMangas]);

    const debouncedSearch = useMemo(
        () => debounce((query: string) => {
            handleSearch(query);
        }, 500),
        [handleSearch]
    );

    const handleSearchChange = useCallback((query: string) => {
        setSearchQuery(query);

        if (!query) {
            const hasActiveFilters = Object.values(currentFilters).some(arr => arr.length > 0);

            fetchAllMangas({
                page: 1,
                limit: ITEMS_PER_PAGE,
                ...(hasActiveFilters ? currentFilters : {}),
            });
        } else {
            debouncedSearch(query);
        }
    }, [currentFilters, debouncedSearch, fetchAllMangas, setSearchQuery]);

    if (genresLoading || statusesLoading || typesLoading) {
        return <MangaSkeletonLoader />;
    }

    if (genresError || statusesError || typesError || mangaError) {
        return <div>Error loading data. Please try again later.</div>;
    }

    return (
        <MangaGrid
            mangas={filteredMangas}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            genres={genres}
            statuses={statuses}
            types={types}
            onFilterChange={handleFilterChange}
            searchQuery={searchQuery}
            onSearch={handleSearchChange}
            isLoading={mangaLoading}
        />
    );
};

export default MangaClientWrapper;

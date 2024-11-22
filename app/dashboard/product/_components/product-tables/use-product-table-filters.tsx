'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import supabaseClient from '@/lib/supabaseClient';
import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';

export function useProductTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [categoriesFilter, setCategoriesFilter] = useQueryState(
    'categories',
    searchParams.categories.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Fetch categories from Supabase and process comma-separated values
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabaseClient
        .from('products')
        .select('category');

      if (error) {
        console.error('Error fetching categories:', error.message);
        return;
      }

      // Split categories by commas and normalize (trim whitespace)
      const categories = data
        .flatMap((item) => item.category?.split(',') || []) // Split by comma
        .map((category) => category.trim()) // Remove extra spaces
        .filter(Boolean); // Remove empty values

      // Remove duplicates and map to desired format
      const uniqueCategories = Array.from(new Set(categories)).map(
        (category) => ({
          value: category,
          label: category
        })
      );

      setCategoryOptions(uniqueCategories);
    };

    fetchCategories();
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setCategoriesFilter(null);
    setPage(1);
  }, [setSearchQuery, setCategoriesFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!categoriesFilter;
  }, [searchQuery, categoriesFilter]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    categoriesFilter,
    setCategoriesFilter,
    categoryOptions // Return processed categories
  };
}

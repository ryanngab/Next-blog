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

  const [labelsFilter, setlabelsFilter] = useQueryState(
    'labels',
    searchParams.labels.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const [labelsOptions, setlabelsOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Fetch labels from Supabase and process comma-separated values
  useEffect(() => {
    const fetchlabels = async () => {
      const { data, error } = await supabaseClient
        .from('products')
        .select('labels');

      if (error) {
        console.error('Error fetching labels:', error.message);
        return;
      }

      // Split labels by commas and normalize (trim whitespace)
      const labels = data
        .flatMap((item) => item.labels?.split(',') || []) // Split by comma
        .map((labels) => labels.trim()) // Remove extra spaces
        .filter(Boolean); // Remove empty values

      // Remove duplicates and map to desired format
      const uniquelabels = Array.from(new Set(labels)).map((labels) => ({
        value: labels,
        label: labels
      }));

      setlabelsOptions(uniquelabels);
    };

    fetchlabels();
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setlabelsFilter(null);
    setPage(1);
  }, [setSearchQuery, setlabelsFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!labelsFilter;
  }, [searchQuery, labelsFilter]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    labelsFilter,
    setlabelsFilter,
    labelsOptions // Return processed labels
  };
}

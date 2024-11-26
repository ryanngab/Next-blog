'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import SupabaseClient from '@/lib/supabaseClient';
import ProductTableAction from '@/app/dashboard/product/_components/product-tables/product-table-action';
import PageContainer from '@/components/layout/page-container';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useProductTableFilters } from '@/app/dashboard/product/_components/product-tables/use-product-table-filters';
import SkeletonLoaderCard from '@/components/loaders/SkeletonLoaderCard';
import CardProduct from './CardProduct';

const ITEMS_PER_PAGE = 6; // Jumlah item per halaman

const ProductPage = () => {
  const { labels } = useParams(); // Mengambil parameter kategori dari URL
  const searchParams = useSearchParams(); // Mendapatkan parameter query
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine); // Status koneksi

  const { searchQuery } = useProductTableFilters();

  // Pantau perubahan status koneksi
  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) return;

    const fetchProducts = async () => {
      setLoading(true);
      let query = SupabaseClient.from('products').select('*', {
        count: 'exact'
      });

      // Gabungkan filter kategori dari URL dan parameter query
      const labelsFromQuery = searchParams.get('labels')?.split('.') || []; // Split kategori berdasarkan tanda titik

      const labelsFilters = [];
      if (labels) labelsFilters.push(`labels.ilike.%${labels}%`);
      if (labelsFromQuery.length > 0) {
        labelsFromQuery.forEach((cat) =>
          labelsFilters.push(`labels.ilike.%${cat}%`)
        );
      }

      if (labelsFilters.length > 0) {
        query = query.or(labelsFilters.join(','));
      }

      // Filter pencarian
      if (searchQuery) {
        query = query.or(
          `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
        );
      }

      // Pagination
      query = query.range(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE - 1
      );

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching products:', error.message);
      } else {
        setProducts(data || []);
        setTotalItems(count || 0);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [labels, searchQuery, searchParams, currentPage, isOnline]);

  // Hitung total halaman
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Fungsi untuk mengubah halaman
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <PageContainer scrollable>
      <div className="mx-auto lg:flex lg:gap-6">
        <aside className="mt-8 lg:mt-0 lg:w-1/4">
          <h1 className="mb-3 text-2xl font-bold tracking-tight">Filter</h1>
          <ProductTableAction />
        </aside>

        <div className="lg:w-3/4">
          {isOnline ? (
            loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <SkeletonLoaderCard />
                <SkeletonLoaderCard />
                <SkeletonLoaderCard />
                <SkeletonLoaderCard />
                <SkeletonLoaderCard />
                <SkeletonLoaderCard />
                <SkeletonLoaderCard />
                <SkeletonLoaderCard />
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {products.map((product) => (
                    <CardProduct key={product.id} product={product} />
                  ))}
                </div>
                {totalItems > ITEMS_PER_PAGE && (
                  <div className="mt-6 flex justify-center gap-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={() =>
                              currentPage > 1 &&
                              handlePageChange(currentPage - 1)
                            }
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, index) => (
                          <PaginationItem key={index}>
                            <PaginationLink
                              href="#"
                              isActive={currentPage === index + 1}
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={() =>
                              currentPage < totalPages &&
                              handlePageChange(currentPage + 1)
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <p>No products found for selected labels</p>
            )
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <SkeletonLoaderCard />
              <SkeletonLoaderCard />
              <SkeletonLoaderCard />
              <SkeletonLoaderCard />
              <SkeletonLoaderCard />
              <SkeletonLoaderCard />
              <SkeletonLoaderCard />
              <SkeletonLoaderCard />
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default ProductPage;

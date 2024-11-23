'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SupabaseClient from '@/lib/supabaseClient';
import CardProduct from '@/app/products/_components/CardProduct';
import ProductTableAction from '@/app/dashboard/product/_components/product-tables/product-table-action';
import PageContainer from '@/components/layout/page-container';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useProductTableFilters } from '@/app/dashboard/product/_components/product-tables/use-product-table-filters';
const ITEMS_PER_PAGE = 6; // Jumlah item per halaman

const CategoryPost = () => {
  const { category } = useParams(); // Mengambil parameter kategori dari URL
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const { searchQuery, categoriesFilter } = useProductTableFilters();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const query = SupabaseClient.from('products')
        .select('*')
        .ilike('category', `%${category}%`); // Filter berdasarkan kategori

      // Filter berdasarkan kategori (jika ada)
      if (categoriesFilter) {
        query.ilike('category', `%${categoriesFilter}%`);
      }

      // Filter berdasarkan pencarian (jika ada)
      if (searchQuery) {
        query.or(
          `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`
        );
      }

      // Pagination
      query.range(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE - 1
      );

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching products:', error.message);
      } else {
        setProducts(data || []);
        setTotalItems(count || 0); // Simpan total item
      }
      setLoading(false);
    };

    if (category) fetchProducts();
  }, [, category, searchQuery, categoriesFilter, currentPage]);

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
          {loading ? (
            <p>Loading...</p>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <CardProduct key={product.id} product={product} />
                ))}
              </div>
              {/* Pagination hanya ditampilkan jika totalItems lebih dari ITEMS_PER_PAGE */}
              {totalItems > ITEMS_PER_PAGE && (
                <div className="mt-6 flex justify-center gap-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={() =>
                            currentPage > 1 && handlePageChange(currentPage - 1)
                          }
                        />
                      </PaginationItem>
                      {/* Halaman sebelumnya */}
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
                      {/* Halaman selanjutnya */}
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
            <p>No products found for category "{category}".</p>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default CategoryPost;

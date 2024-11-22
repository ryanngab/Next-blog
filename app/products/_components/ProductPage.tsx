'use client';

import PageContainer from '@/components/layout/page-container';
import React, { useEffect, useState } from 'react';
import CardProduct from './CardProduct';
import ProductTableAction from '@/app/dashboard/product/_components/product-tables/product-table-action';
import { useProductTableFilters } from '@/app/dashboard/product/_components/product-tables/use-product-table-filters';
import supabaseClient from '@/lib/supabaseClient';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

const ITEMS_PER_PAGE = 6; // Jumlah item per halaman

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const { searchQuery, categoriesFilter } = useProductTableFilters();

  // Ambil data produk dari database
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const query = supabaseClient
        .from('products')
        .select('*', { count: 'exact' });

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

    fetchProducts();
  }, [searchQuery, categoriesFilter, currentPage]);

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
        {/* Sidebar untuk filter */}
        <aside className="mt-8 lg:mt-0 lg:w-1/4">
          <h1 className="mb-3 text-2xl font-bold tracking-tight">Filter</h1>
          <ProductTableAction />
        </aside>

        {/* Daftar produk */}
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

              {/* Pagination */}
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
            </>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default ProductPage;

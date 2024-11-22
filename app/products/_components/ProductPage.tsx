import PageContainer from '@/components/layout/page-container';
import React from 'react';
import CardProduct from './CardProduct';
import ProductTableAction from '@/app/dashboard/product/_components/product-tables/product-table-action';

const ProductPage = () => {
  return (
    <PageContainer scrollable>
      <div className="mx-auto lg:flex lg:gap-6">
        <aside className="mt-8 lg:mt-0 lg:w-1/4">
          <h1 className="mb-3 text-2xl font-bold tracking-tight">Filter</h1>
          <ProductTableAction />
        </aside>
        <div className="lg:w-3/4">
          <>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <CardProduct />
            </div>
            <div className="mt-6 flex justify-center">Pagination</div>
          </>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProductPage;

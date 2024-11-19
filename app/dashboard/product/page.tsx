import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/parsers';
import { Suspense } from 'react';
import ProductListingPage from './_components/product-listing';
import ProductTableAction from './_components/product-tables/product-table-action';

// Metadata untuk halaman ini, termasuk judul
export const metadata = {
  title: 'Dashboard: Products'
};

// Tipe untuk properti halaman, termasuk parameter pencarian
type pageProps = {
  searchParams: SearchParams;
};

// Fungsi utama untuk halaman produk
export default async function Page({ searchParams }: pageProps) {
  // Mengizinkan RSC bersarang untuk mengakses parameter pencarian (dalam cara yang aman tipe)
  searchParamsCache.parse(searchParams);

  // Kunci ini digunakan untuk memicu suspense jika ada perubahan pada parameter pencarian (digunakan untuk filter).
  const key = serialize({ ...searchParams });

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Products"
            description="Manage products (Server side table functionalities.)"
          />
          <Link
            href="/dashboard/product/new"
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <ProductTableAction />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <ProductListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}

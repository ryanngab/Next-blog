import PageContainer from '@/components/layout/page-container';
import { supabase } from '@/lib/supabaseClient';
import { Heading } from '@/components/ui/heading';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ProductTableAction from '../product/_components/product-tables/product-table-action';
import { Suspense } from 'react';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { SearchParams } from 'nuqs/parsers';
import { searchParamsCache, serialize } from '@/lib/searchparams';

export const metadata = {
  title: 'Dashboard: Products'
};

type pageProps = {
  searchParams: SearchParams;
};

export default async function ProductsPage({ searchParams }: pageProps) {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, price, product_categories (categories (name))');

  if (error) throw new Error(error.message);

  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });

  return (
    <PageContainer>
      <div>
        <div className="flex items-start justify-between">
          <Heading
            title="Products"
            description="Manage products (Server side table functionalities.)"
          />
          <Link
            href="/dashboard/products/create"
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
          {/* <ProductListingPage /> */}
        </Suspense>

        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <a href={`/dashboard/products/${product.id}`}>
                {product.name} - ${product.price}
                <br />
                Categories:{' '}
                {product.product_categories
                  .map((pc) => pc.categories.name)
                  .join(', ')}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </PageContainer>
  );
}

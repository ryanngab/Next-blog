// productlisting.tsx
import { supabaseProducts } from '@/constants/mock-api'; // Data produk dari mock-api
import { searchParamsCache } from '@/lib/searchparams'; // Untuk cache search params
import { DataTable as ProductTable } from '@/components/ui/table/data-table'; // Komponen tabel UI
import { columns } from './product-tables/columns'; // Kolom tabel

type ProductListingPageProps = {};

// Komponen utama halaman daftar produk
export default async function ProductListingPage({}: ProductListingPageProps) {
  // Memastikan cache diperbarui dengan data terbaru
  await supabaseProducts.initialize();

  // Mengambil search params dari cache
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  // Membuat filter berdasarkan search params
  const filters = {
    page: Number(page) || 1, // Default ke halaman pertama jika tidak ada
    limit: Number(pageLimit) || 10, // Default ke 10 item per halaman
    ...(search && { search }),
    ...(categories && { categories })
  };

  // Mendapatkan data produk berdasarkan filter
  const data = await supabaseProducts.getProducts(filters);

  // Menyiapkan data produk dan total produk
  const totalProducts = data.total_products;
  const products = data.products;

  return (
    <ProductTable
      columns={columns} // Konfigurasi kolom tabel
      data={products} // Data produk untuk ditampilkan
      totalItems={totalProducts} // Total jumlah produk
    />
  );
}

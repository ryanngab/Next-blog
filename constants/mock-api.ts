import supabase from '@/lib/supabaseClient'; // Import client dari lokasi baru
import { matchSorter } from 'match-sorter'; // Untuk fitur pencarian dan penyortiran

// Fungsi delay untuk simulasi loading
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Tipe data untuk produk
export type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  photo_url: string;
  created_at: string;
  updated_at: string;
};

// Menyimpan data produk dan fungsi terkait
export const supabaseProducts = {
  records: [] as Product[], // Cache data produk

  // Inisialisasi data produk dari database Supabase
  async initialize() {
    try {
      const { data, error } = await supabase.from('products').select('*'); // Ambil semua data dari tabel 'products'

      if (error) {
        console.error('Gagal memuat data produk:', error.message);
        throw error; // Lempar error jika terjadi masalah
      }

      this.records = data || []; // Simpan data ke dalam cache
    } catch (error) {
      console.error('Kesalahan inisialisasi:', error);
    }
  },

  // Sinkronisasi data baru yang ditambahkan
  syncNewProduct(newProduct: Product) {
    this.records.push(newProduct); // Tambahkan data baru ke dalam cache
  },

  // Sinkronisasi data yang diperbarui
  syncUpdatedProduct(updatedProduct: Product) {
    const index = this.records.findIndex(
      (product) => product.id === updatedProduct.id
    );
    if (index !== -1) {
      this.records[index] = updatedProduct; // Perbarui data di cache
    }
  },

  // Mengambil semua produk dengan filter kategori dan pencarian opsional
  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    await this.initialize(); // Memastikan data cache terbaru diambil
    let products = [...this.records]; // Salin data dari cache

    // Filter berdasarkan kategori
    if (categories.length > 0) {
      products = products.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Filter berdasarkan pencarian (nama, deskripsi, kategori)
    if (search) {
      products = matchSorter(products, search, {
        keys: ['name', 'description', 'category']
      });
    }

    return products;
  },

  // Mendapatkan data produk dengan fitur paginasi, kategori, dan pencarian
  async getProducts({
    page = 1,
    limit = 10,
    categories,
    search
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000); // Simulasi delay

    const categoriesArray = categories ? categories.split('.') : [];
    const allProducts = await this.getAll({
      categories: categoriesArray,
      search
    });

    const totalProducts = allProducts.length; // Total data produk
    const offset = (page - 1) * limit; // Hitung offset berdasarkan halaman
    const paginatedProducts = allProducts.slice(offset, offset + limit); // Potong data sesuai paginasi

    // Mengembalikan hasil paginasi
    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Data berhasil dimuat',
      total_products: totalProducts,
      offset,
      limit,
      products: paginatedProducts
    };
  },

  // Mendapatkan produk berdasarkan ID
  async getProductById(id: number) {
    await this.initialize(); // Memastikan data cache terbaru diambil
    await delay(1000); // Simulasi delay

    const product = this.records.find((product) => product.id === id); // Cari produk berdasarkan ID

    if (!product) {
      return {
        success: false,
        message: `Produk dengan ID ${id} tidak ditemukan`
      };
    }

    return {
      success: true,
      time: new Date().toISOString(),
      message: `Produk dengan ID ${id} ditemukan`,
      product
    };
  }
};

// Inisialisasi data awal dan real-time listener
(async () => {
  await supabaseProducts.initialize();

  supabase
    .channel('products')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'products' },
      (payload: { new: Product }) => {
        console.log('Produk baru ditambahkan:', payload.new);
        supabaseProducts.syncNewProduct(payload.new);
      }
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'products' },
      (payload: { new: Product }) => {
        console.log('Produk diperbarui:', payload.new);
        supabaseProducts.syncUpdatedProduct(payload.new);
      }
    )
    .subscribe();
})();

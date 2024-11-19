import supabase from '@/lib/supabaseClient'; // Import client dari lokasi baru
import { faker } from '@faker-js/faker';
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

// Define the shape of User data
type Gender = 'male' | 'female';

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude: number;
  latitude: number;
  gender: Gender;
  date_of_birth: string;
  job: string;
  profile_picture: string;
};

// Mock user data store
export const fakeUsers = {
  records: [] as User[], // Holds the list of user objects

  // Initialize with sample data
  initialize() {
    const sampleUsers: User[] = [];
    function generateRandomUserData(id: number): User {
      const genders = ['male', 'female'];
      const jobs = [
        'Software Engineer',
        'Data Scientist',
        'Marketing Manager',
        'Graphic Designer',
        'Sales Manager',
        'Product Manager'
      ];
      const cities = [
        'San Francisco',
        'New York City',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Phoenix',
        'Philadelphia',
        'San Antonio',
        'San Diego',
        'Dallas',
        'San Jose',
        'Austin',
        'Jacksonville'
      ];
      const states = [
        'California',
        'New York',
        'Texas',
        'Florida',
        'Illinois',
        'Pennsylvania',
        'Ohio',
        'Georgia',
        'North Carolina',
        'Michigan'
      ];

      return {
        id,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: `${faker.internet.email()}`,
        phone: `001-${Math.floor(Math.random() * 900) + 100}-${
          Math.floor(Math.random() * 900) + 100
        }-${Math.floor(Math.random() * 10000)}`,
        street: `${Math.floor(
          Math.random() * 1000
        )} ${faker.location.street()}`,
        city: faker.helpers.arrayElement(cities),
        state: faker.helpers.arrayElement(states),
        country: 'USA',
        zipcode: faker.location.zipCode(),
        longitude: faker.location.longitude(),
        latitude: faker.location.latitude(),
        gender: faker.helpers.arrayElement(genders) as Gender,
        date_of_birth: faker.date
          .between({ from: '1980-01-01', to: '2000-01-01' })
          .toISOString()
          .split('T')[0],
        job: faker.helpers.arrayElement(jobs),
        profile_picture: `https://api.slingacademy.com/public/sample-users/${id}.png`
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleUsers.push(generateRandomUserData(i));
    }

    this.records = sampleUsers;
  },

  // Get all users with optional gender filtering and search
  async getAll({
    genders = [],
    search
  }: {
    genders?: string[];
    search?: string;
  }) {
    let users = [...this.records];

    // Filter users based on selected genders
    if (genders.length > 0) {
      users = users.filter((user) => genders.includes(user.gender));
    }

    // Search functionality across multiple fields
    if (search) {
      users = matchSorter(users, search, {
        keys: [
          'first_name',
          'last_name',
          'email',
          'job',
          'city',
          'street',
          'state',
          'country'
        ]
      });
    }

    return users;
  },

  // Get paginated results with optional gender filtering and search
  async getUsers({
    page = 1,
    limit = 10,
    genders,
    search
  }: {
    page?: number;
    limit?: number;
    genders?: string;
    search?: string;
  }) {
    const gendersArray = genders ? genders.split('.') : [];
    console.log('gendersArray', gendersArray);
    const allUsers = await this.getAll({ genders: gendersArray, search });
    const totalUsers = allUsers.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedUsers = allUsers.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_users: totalUsers,
      offset,
      limit,
      users: paginatedUsers
    };
  }
};

// Initialize sample users
fakeUsers.initialize();

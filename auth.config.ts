import { NextAuthConfig } from 'next-auth'; // Mengimpor tipe NextAuthConfig dari next-auth
import CredentialProvider from 'next-auth/providers/credentials'; // Mengimpor penyedia otentikasi berbasis kredensial
import GithubProvider from 'next-auth/providers/github'; // Mengimpor penyedia otentikasi menggunakan GitHub

// Konfigurasi otentikasi
const authConfig = {
  providers: [
    // Konfigurasi untuk penyedia GitHub
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '', // Mengambil clientId dari variabel lingkungan
      clientSecret: process.env.GITHUB_SECRET ?? '' // Mengambil clientSecret dari variabel lingkungan
    }),
    // Konfigurasi untuk penyedia kredensial
    CredentialProvider({
      credentials: {
        email: {
          type: 'email' // Mendefinisikan field email sebagai tipe email
        },
        password: {
          type: 'password' // Mendefinisikan field password sebagai tipe password
        }
      },
      // Fungsi untuk mengotorisasi pengguna
      async authorize(credentials, req) {
        // Membuat objek pengguna berdasarkan kredensial yang diberikan
        const user = {
          id: '1', // ID pengguna (dapat disesuaikan dengan ID yang sebenarnya)
          name: 'John', // Nama pengguna (dapat disesuaikan)
          email: credentials?.email as string // Mengambil email dari kredensial
        };
        if (user) {
          // Jika pengguna berhasil diotorisasi, objek pengguna akan dikembalikan
          return user;
        } else {
          // Jika tidak, mengembalikan null akan menampilkan pesan kesalahan
          return null;

          // Anda juga dapat menolak callback ini dengan Error sehingga pengguna akan diarahkan ke halaman kesalahan dengan pesan kesalahan sebagai parameter kueri
        }
      }
    })
  ],
  // Menentukan halaman kustom untuk proses masuk
  pages: {
    signIn: '/' // Halaman yang digunakan untuk proses masuk
  }
} satisfies NextAuthConfig; // Memastikan bahwa objek ini sesuai dengan tipe NextAuthConfig

// Mengekspor konfigurasi otentikasi agar dapat digunakan di bagian lain aplikasi
export default authConfig;

import { NextAuthConfig } from 'next-auth'; // Mengimpor tipe NextAuthConfig dari next-auth
import CredentialProvider from 'next-auth/providers/credentials'; // Mengimpor penyedia otentikasi berbasis kredensial
import GithubProvider from 'next-auth/providers/github'; // Mengimpor penyedia otentikasi menggunakan GitHub
import supabase from '@/lib/supabaseClient'; // Mengimpor klien Supabase

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
        // Ambil pengguna dari Supabase berdasarkan email
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials?.email)
          .single();

        if (error || !user) {
          // Jika terjadi kesalahan atau pengguna tidak ditemukan
          return null;
        }

        // Verifikasi password (pastikan Anda menggunakan metode hashing yang sesuai)
        if (user.password !== credentials?.password) {
          // Jika password tidak cocok
          return null;
        }

        // Jika pengguna berhasil diotorisasi, objek pengguna akan dikembalikan
        return {
          id: user.id, // ID pengguna dari database
          name: user.name, // Nama pengguna dari database
          email: user.email // Email pengguna dari database
        };
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

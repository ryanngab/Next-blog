// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

// File ini mengatur middleware autentikasi untuk Next.js
// Digunakan untuk melindungi rute-rute tertentu yang membutuhkan autentikasi

// Mengimpor NextAuth untuk menangani autentikasi
import NextAuth from 'next-auth';
// Mengimpor konfigurasi autentikasi dari file terpisah
import authConfig from './auth.config';

// Inisialisasi NextAuth dengan konfigurasi yang telah ditentukan
const { auth } = NextAuth(authConfig);

// Middleware untuk memeriksa status autentikasi
export default auth((req) => {
  // Jika pengguna tidak terautentikasi (req.auth kosong)
  if (!req.auth) {
    // Mengalihkan pengguna ke halaman utama ('/')
    // dengan mengganti pathname saat ini dengan '/'
    const url = req.url.replace(req.nextUrl.pathname, '/');
    return Response.redirect(url);
  }
});

// Konfigurasi matcher menentukan rute mana yang akan dilindungi oleh middleware
// '/dashboard/:path*' berarti semua rute yang dimulai dengan /dashboard akan dilindungi
// :path* menandakan bahwa semua sub-rute di bawah /dashboard juga akan dilindungi
export const config = { matcher: ['/dashboard/:path*'] };

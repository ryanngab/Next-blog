//Api products
import { NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient';

export async function GET() {
  try {
    // Ambil semua data dari tabel "products"
    const { data, error } = await supabase.from('products').select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data.' },
      { status: 500 }
    );
  }
}

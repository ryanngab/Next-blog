import { NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient';

export async function GET() {
  try {
    // Ambil maksimal 5 data terbaru dari tabel "products"
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false }) // Urutkan berdasarkan created_at secara descending
      .limit(5); // Batasi hasil maksimal 5

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

'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const CategoryButtons = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('category'); // Ambil kolom kategori

        if (error) throw error;

        // Pisahkan kategori yang dipisahkan koma dan ambil unik
        const uniqueCategories = Array.from(
          new Set(
            data
              .flatMap((item: any) =>
                item.category
                  ? item.category.split(',').map((cat: string) => cat.trim())
                  : []
              )
              .filter((category) => !!category) // Hilangkan null/undefined/kosong
          )
        );

        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;

  if (categories.length === 0) return <p>No categories found.</p>;

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {categories.map((category, index) => (
        <Link
          key={index}
          href={`/products/categories/${encodeURIComponent(category)}`}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'text-xs md:text-sm'
          )}
          style={{ width: '200px', height: '40px' }}
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default CategoryButtons;

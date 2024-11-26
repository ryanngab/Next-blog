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

const LabelsButtons = () => {
  const [labels, setlabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchlabels = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('labels'); // Ambil kolom kategori

        if (error) throw error;

        // Pisahkan kategori yang dipisahkan koma dan ambil unik
        const uniquelabels = Array.from(
          new Set(
            data
              .flatMap((item: any) =>
                item.labels
                  ? item.labels.split(',').map((cat: string) => cat.trim())
                  : []
              )
              .filter((labels) => !!labels) // Hilangkan null/undefined/kosong
          )
        );

        setlabels(uniquelabels);
      } catch (err) {
        console.error('Error fetching labels:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchlabels();
  }, []);

  if (loading) return <p>Loading labels...</p>;

  if (labels.length === 0) return <p>No labels found.</p>;

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {labels.map((labels, index) => (
        <Link
          key={index}
          href={`/products/labels/${encodeURIComponent(labels)}`}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'text-xs md:text-sm'
          )}
          style={{ width: '200px', height: '40px' }}
        >
          {labels}
        </Link>
      ))}
    </div>
  );
};

export default LabelsButtons;

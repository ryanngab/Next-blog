'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { CommentModal } from '@/components/modal/CommentModal';
import { ShareModal } from '@/components/modal/ShareModal';
import PageContainer from '@/components/layout/page-container';
import TagsProducts from './TagsProducts';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!product) return <p>Product not found!</p>;

  // Ubah kategori produk menjadi array (jika berupa string terpisah koma)
  const categories = product.category
    ? product.category.split(',').map((cat: string) => cat.trim())
    : [];

  return (
    <PageContainer scrollable>
      <div className="container mx-auto px-4 lg:flex lg:gap-6">
        <div className="flex flex-col gap-3 lg:w-3/4">
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center justify-between">
            <div className="mb-4 text-sm text-muted-foreground">
              <span>{product.author}</span> |{' '}
              <span>{new Date(product.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex">
              <ShareModal />
            </div>
          </div>
          <div>
            <img
              src={product.photo_url || 'https://via.placeholder.com/150'}
              alt={product.name}
              className="rounded-lg object-cover"
              loading="lazy"
            />
          </div>
          <p className="mt-2 text-lg">
            ${product.price} / Rp.{(product.price * 15000).toLocaleString()}
          </p>
          <h3 className="mt-2 text-lg font-semibold">Description</h3>
          <div
            dangerouslySetInnerHTML={{ __html: product.description }}
            className="prose"
          />
          <TagsProducts categories={categories} /> {/* Pass categories here */}
          <CommentModal />
        </div>

        <aside className="mt-8 lg:mt-0 lg:w-1/4">
          {/* Future components like PopularBlog */}
        </aside>
      </div>
    </PageContainer>
  );
};

export default ProductDetailPage;

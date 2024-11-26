'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const [product, setProduct] = useState<{
    id: number;
    name: string;
    description: string;
    price: number;
    labels: string;
    photo_url: string;
    created_at: string;
  } | null>(null);

  useEffect(() => {
    // Ambil data produk dari sessionStorage
    const productData = sessionStorage.getItem('selectedProduct');
    if (productData) {
      setProduct(JSON.parse(productData));
    } else {
      // Jika tidak ada data, kembali ke halaman sebelumnya
      router.back();
    }
  }, [router]);

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center text-lg font-semibold">
          Product data not found. Please go back.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img
        src={product.photo_url}
        alt={product.name}
        className="h-auto w-full rounded-lg"
      />
      <p className="mt-4">{product.description}</p>
      <p className="mt-2 text-lg font-semibold">
        ${product.price} / Rp.{(product.price * 15000).toLocaleString()}
      </p>
      <button
        onClick={() => router.back()}
        className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white"
      >
        Back
      </button>
    </div>
  );
};

export default ProductDetail;

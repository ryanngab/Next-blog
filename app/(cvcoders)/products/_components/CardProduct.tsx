'use client';

import React from 'react';
import { Bookmark, Calendar, ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';

interface CardProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    photo_url: string;
    created_at: string;
  };
}

const CardProduct: React.FC<CardProductProps> = ({ product }) => {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        router.push(
          `/products/${product.id}/${encodeURIComponent(
            product.name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-')
          )}`
        )
      }
      className="group relative cursor-pointer overflow-hidden rounded-xl border bg-card text-card-foreground shadow transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative">
        <img
          src={product.photo_url || 'https://via.placeholder.com/150'}
          alt={product.name}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute right-2 top-2 z-10">
          <button
            aria-label="Bookmark"
            className="mr-2 rounded-full bg-white bg-opacity-80 p-2 transition hover:bg-opacity-100"
          >
            <Bookmark className="h-5 w-5 text-gray-800" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold tracking-tight">{product.name}</h3>
        <p className="mt-2 text-sm">
          ${product.price} / Rp.{(product.price * 15000).toLocaleString()}
        </p>
        <p className="mb-4 mt-4 text-sm text-muted-foreground">
          {product.description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Link
              href="#"
              className={cn(buttonVariants(), 'w-full text-xs md:text-sm')}
            >
              Buy Now
              <ShoppingCartIcon className="ms-3 h-5 w-5" />
            </Link>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>{new Date(product.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
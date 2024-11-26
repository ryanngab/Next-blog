'use client';

import React from 'react';
import { Bookmark, Calendar, ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import { ShareModalWithIcon } from '@/components/modal/ShareModalWithIcon';

interface CardProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    labels: string;
    photo_url: string;
    created_at: string;
  };
}
const truncateText = (text: string, maxWords: number): string => {
  const words = text.split(' ');
  return words.length > maxWords
    ? words.slice(0, maxWords).join(' ') + '...'
    : text;
};

const CardProduct: React.FC<CardProductProps> = ({ product }) => {
  const router = useRouter();
  const truncatedDescription = truncateText(product.description, 10);
  return (
    <div
      onClick={() =>
        router.push(
          `/products/${product.id}/${encodeURIComponent(
            product.name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-')
          )}`
        )
      }
      className="cursor-pointer rounded-lg border border-gray-300 p-4 hover:shadow-xl"
    >
      <div className="relative">
        <Image
          src={product.photo_url || 'https://via.placeholder.com/150'}
          alt={product.name}
          className="h-48 w-full rounded-lg object-cover"
          width={200}
          height={200}
          loading="lazy"
        />
        <div className="absolute right-2 top-2 z-10">
          <button
            aria-label="Bookmark"
            className="mr-2 rounded-full bg-white p-2 transition hover:shadow-xl"
          >
            <Bookmark className="h-5 w-5 text-gray-800" />
          </button>
          <ShareModalWithIcon />
        </div>
      </div>
      <div className="flex h-[calc(100%-12rem)] flex-col justify-between">
        <h3 className="text-md mb-2 pt-3 font-semibold">{product.name}</h3>
        <p className="mb-2 text-sm ">
          ${product.price} / Rp.{(product.price * 15000).toLocaleString()}
        </p>
        <p className="mb-2 text-sm text-muted-foreground">
          {truncatedDescription}
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

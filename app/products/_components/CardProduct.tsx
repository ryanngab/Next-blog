import { ShareModalWithIcon } from '@/components/modal/ShareModalWithIcon';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Bookmark, BugPlay, Calendar, ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CardProduct = () => {
  return (
    <>
      <div
        // onClick={() => router.push(`/blog/${post.id}/${encodeURIComponent(post.title)}`)}
        className="group relative cursor-pointer overflow-hidden rounded-xl border bg-card text-card-foreground shadow transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="relative">
          <img
            src="https://via.placeholder.com/150"
            alt=""
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
            <ShareModalWithIcon />
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold tracking-tight">Apple Watch</h3>
          <p className="mt-2 text-sm">$ 249.40 / Rp.200.000.000</p>
          <p className="mb-4 mt-4 text-sm text-muted-foreground">
            3.1GHz 6-core 10th-generation Intel Core i5 processor, Turbo Boost
            up to 4.5GHz
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Link
                href=""
                className={cn(buttonVariants(), 'w-full text-xs md:text-sm')}
              >
                Buy Now
                <ShoppingCartIcon className="ms-3 h-5 w-5" />
              </Link>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>tanggal publiseh</span>{' '}
              {/* Tanggal dengan format yang diinginkan */}
            </div>
          </div>
        </div>
      </div>
      <div
        // onClick={() => router.push(`/blog/${post.id}/${encodeURIComponent(post.title)}`)}
        className="group relative cursor-pointer overflow-hidden rounded-xl border bg-card text-card-foreground shadow transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="relative">
          <img
            src="https://via.placeholder.com/150"
            alt=""
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
            <ShareModalWithIcon />
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold tracking-tight">Apple Watch</h3>
          <p className="mt-2 text-sm">$ 249.40 / Rp.200.000.000</p>
          <p className="mb-4 mt-4 text-sm text-muted-foreground">
            3.1GHz 6-core 10th-generation Intel Core i5 processor, Turbo Boost
            up to 4.5GHz
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Link
                href=""
                className={cn(buttonVariants(), 'w-full text-xs md:text-sm')}
              >
                Buy Now
                <ShoppingCartIcon className="ms-3 h-5 w-5" />
              </Link>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>tanggal publiseh</span>{' '}
              {/* Tanggal dengan format yang diinginkan */}
            </div>
          </div>
        </div>
      </div>
      <div
        // onClick={() => router.push(`/blog/${post.id}/${encodeURIComponent(post.title)}`)}
        className="group relative cursor-pointer overflow-hidden rounded-xl border bg-card text-card-foreground shadow transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="relative">
          <img
            src="https://via.placeholder.com/150"
            alt=""
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
            <ShareModalWithIcon />
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold tracking-tight">Apple Watch</h3>
          <p className="mt-2 text-sm">$ 249.40 / Rp.200.000.000</p>
          <p className="mb-4 mt-4 text-sm text-muted-foreground">
            3.1GHz 6-core 10th-generation Intel Core i5 processor, Turbo Boost
            up to 4.5GHz
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Link
                href=""
                className={cn(buttonVariants(), 'w-full text-xs md:text-sm')}
              >
                Buy Now
                <ShoppingCartIcon className="ms-3 h-5 w-5" />
              </Link>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>tanggal publiseh</span>{' '}
              {/* Tanggal dengan format yang diinginkan */}
            </div>
          </div>
        </div>
      </div>
      <div
        // onClick={() => router.push(`/blog/${post.id}/${encodeURIComponent(post.title)}`)}
        className="group relative cursor-pointer overflow-hidden rounded-xl border bg-card text-card-foreground shadow transition-shadow duration-300 hover:shadow-xl"
      >
        <div className="relative">
          <img
            src="https://via.placeholder.com/150"
            alt=""
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
            <ShareModalWithIcon />
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold tracking-tight">Apple Watch</h3>
          <p className="mt-2 text-sm">$ 249.40 / Rp.200.000.000</p>
          <p className="mb-4 mt-4 text-sm text-muted-foreground">
            3.1GHz 6-core 10th-generation Intel Core i5 processor, Turbo Boost
            up to 4.5GHz
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Link
                href=""
                className={cn(buttonVariants(), 'w-full text-xs md:text-sm')}
              >
                Buy Now
                <ShoppingCartIcon className="ms-3 h-5 w-5" />
              </Link>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>tanggal publiseh</span>{' '}
              {/* Tanggal dengan format yang diinginkan */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProduct;

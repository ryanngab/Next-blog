import { ShareModalWithIcon } from '@/components/modal/ShareModalWithIcon';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PinnedPost = () => {
  return (
    <>
      <h2 className="mb-2 mt-8 text-lg font-semibold">Pinned Post</h2>
      {/* <hr className='mb-2' /> */}
      <div className="group w-full cursor-pointer rounded-xl border bg-card text-card-foreground shadow transition-shadow duration-300 hover:shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              alt=""
              className="h-48 w-full rounded object-cover"
              loading="lazy"
            />
          </div>
          <div className="lg:w-2/3">
            <div className="flex flex-col p-4">
              <h3 className="mb-2 text-lg font-semibold">
                Apple iPhone 16 Pro
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Apple iPhone 11 Pro smartphone. Announced Sep 2019. Features
                5.8″ display Apple A13 Bionic lorem30
              </p>
              <p className="mb-4 text-gray-600">Price:$899</p>
              <div className="mt-auto flex justify-between gap-3">
                <Link
                  href=""
                  className={cn(buttonVariants(), ' text-xs md:text-sm')}
                >
                  Buy Now
                  <ShoppingCartIcon className="ms-3 h-5 w-5" />
                </Link>
                <ShareModalWithIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PinnedPost;

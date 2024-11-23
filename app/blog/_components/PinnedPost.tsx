import { ShareModalWithIcon } from '@/components/modal/ShareModalWithIcon';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface PinnedPostProps {
  post: {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    photo_url: string;
    created_at: string;
  };
}

const PinnedPost: React.FC<PinnedPostProps> = ({ post }) => {
  return (
    <>
      <h2 className="mb-2 mt-8 text-lg font-semibold">Pinned Post</h2>
      {/* <hr className='mb-2' /> */}
      <div className="group w-full cursor-pointer rounded-xl border bg-card text-card-foreground shadow transition-shadow duration-300 hover:shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-1/3">
            <img
              src={post.photo_url || 'https://via.placeholder.com/150'}
              alt={post.name}
              className="h-48 w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="lg:w-2/3">
            <div className="flex flex-col p-4">
              <h3 className="mb-2 text-lg font-semibold">{post.name}</h3>
              <p className="mb-4 text-sm text-gray-600">{post.description}</p>
              <p className="mb-4 text-gray-600">
                ${post.price} / Rp.{(post.price * 15000).toLocaleString()}
              </p>
              <div className="mt-auto flex justify-between gap-3">
                <Link
                  href="sssss"
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

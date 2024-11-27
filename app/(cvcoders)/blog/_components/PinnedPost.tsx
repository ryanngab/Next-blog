'use client';

import SkeletonLoaderPinned from '@/components/loaders/SkeletonLoaderPinned';
import { ShareModalWithIcon } from '@/components/modal/ShareModalWithIcon';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Post {
  id: string;
  name: string;
  description: string;
  price: number;
  photo_url: string;
  pinned: boolean;
  slug: string;
}

const PinnedPost: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pinnedPost, setPinnedPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchSwipperData = async () => {
      try {
        const response = await fetch('/api/products/');
        const data = await response.json();

        if (data.error) {
          console.error(data.error);
        } else {
          const pinnedPosts = data.filter((item: any) => item.pinned);
          setPinnedPost(pinnedPosts[0] || null);
        }
      } catch (error) {
        console.error('Error fetching swipper data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSwipperData();
  }, []);

  if (loading)
    return (
      <div className="text-card-foreground">
        <h2 className="mb-4 text-lg font-semibold">Pinned Post</h2>
        <SkeletonLoaderPinned />
      </div>
    );

  return (
    <>
      <h2 className="mb-2 mt-8 text-lg font-semibold">Pinned Post</h2>
      <div className="rounded-lg border border-gray-300 p-4">
        {pinnedPost && (
          <div key={pinnedPost.id} className="flex flex-col gap-6 lg:flex-row">
            <div className="lg:w-1/3">
              <Image
                src={pinnedPost.photo_url || 'https://via.placeholder.com/150'}
                alt={pinnedPost.name}
                className="h-48 w-full rounded-lg object-cover"
                loading="lazy"
                width={200}
                height={200}
              />
            </div>
            <div className="lg:w-2/3">
              <div className="flex h-full flex-col">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {pinnedPost.name}
                  </h3>
                  <p className="mb-2 text-sm text-gray-600">
                    {pinnedPost.description}
                  </p>
                  <p className="text-gray-600">
                    ${pinnedPost.price} / Rp.
                    {(pinnedPost.price * 15000).toLocaleString()}
                  </p>
                </div>
                <div className="mt-2 flex h-[calc(100%-12rem)] justify-between gap-3">
                  <Link
                    href={`/products/${pinnedPost.id}/${pinnedPost.name.replace(
                      /\s+/g,
                      '-'
                    )}`}
                    className={cn(buttonVariants(), 'text-xs md:text-sm')}
                  >
                    View Details
                  </Link>

                  <ShareModalWithIcon url={`/products/${pinnedPost.slug}`} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PinnedPost;

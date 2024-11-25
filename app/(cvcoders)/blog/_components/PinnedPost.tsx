import SkeletonLoaderPinned from '@/components/loaders/SkeletonLoaderPinned';
import { ShareModalWithIcon } from '@/components/modal/ShareModalWithIcon';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShoppingCartIcon } from 'lucide-react';
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
}

const PinnedPost: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pinnedPost, setPinnedPost] = useState<Post | null>(null); // ubah tipe state

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
      <div className=" text-card-foreground">
        <h2 className="mb-4 text-lg font-semibold">Pinned Post</h2>
        <SkeletonLoaderPinned />
      </div>
    );

  return (
    <>
      <h2 className="mb-2 mt-8 text-lg font-semibold">Pinned Post</h2>
      {/* <hr className='mb-2' /> */}
      <div className="group w-full cursor-pointer rounded-xl border bg-card text-card-foreground shadow transition-shadow duration-300 hover:shadow-xl">
        {pinnedPost && ( // ganti map dengan conditional rendering
          <div key={pinnedPost.id} className="flex flex-col gap-6 lg:flex-row">
            <div className="lg:w-1/3">
              <img
                src={pinnedPost.photo_url || 'https://via.placeholder.com/150'}
                alt={pinnedPost.name}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="lg:w-2/3">
              <div className="flex flex-col p-4">
                <h3 className="mb-2 text-lg font-semibold">
                  {pinnedPost.name}
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  {pinnedPost.description}
                </p>
                <p className="mb-4 text-gray-600">
                  ${pinnedPost.price} / Rp.
                  {(pinnedPost.price * 15000).toLocaleString()}
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
        )}
      </div>
    </>
  );
};

export default PinnedPost;

'use client';

import SkeletonLoaderList from '@/components/loaders/SkeletonLoaderList';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const PopularBlog: React.FC = () => {
  const router = useRouter();
  const [popularPosts, setPopularPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data for popular blogs
  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        const response = await fetch('/api/products/popular');
        const data = await response.json();

        if (!data.error) {
          setPopularPosts(data); // Set data to state
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching popular posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularPosts();
  }, []);

  if (loading)
    return (
      <div className=" text-card-foreground">
        <h2 className="mb-4 text-lg font-semibold">Popular Posts</h2>
        <SkeletonLoaderList />
      </div>
    );
  if (popularPosts.length === 0) return <p>No popular blogs found.</p>;

  return (
    <div className=" text-card-foreground">
      <h2 className="mb-4 text-lg font-semibold">Popular Posts</h2>
      <div className="space-y-4">
        {popularPosts.map((post) => (
          <div key={post.id} className="group flex cursor-pointer gap-3">
            <Image
              src={`${post.photo_url}`}
              alt={post.name}
              className="h-16 w-16 rounded-md object-cover"
              loading="lazy"
              width={200}
              height={200}
            />
            <div
              onClick={() =>
                router.push(
                  `/products/${post.id}/${encodeURIComponent(
                    post.name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-')
                  )}`
                )
              }
            >
              <h3 className="text-base font-medium transition-colors group-hover:text-blue-600">
                {post.name}
              </h3>
              <p className="mt-1 text-xs text-gray-600">{post.description}</p>
              <button className="mt-1 text-xs text-blue-600 transition-colors hover:text-blue-800">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularBlog;

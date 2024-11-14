

import React from 'react';
import { Bookmark } from 'lucide-react';
import { ShareModalWithIcon } from '@/components/modal/ShareModalWithIcon';

interface Post {
  id: number;
  image: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface CardBlogProps {
  posts: Post[];
}

// Fungsi untuk mengekstrak gambar pertama dari konten
const extractFirstImage = (content: string): string | null => {
  const imageRegex = /<img[^>]+src=["'](https?[^"']+)["']/;
  const match = content.match(imageRegex);
  return match ? match[1] : null;
};

const CardBlog: React.FC<CardBlogProps> = ({ posts }) => (
  <>
    {posts.map((post) => {
      const firstImage = extractFirstImage(post.content); // Ambil gambar pertama
      return (
        <div
          key={post.id}
          className="relative overflow-hidden transition-shadow duration-300 border shadow group rounded-xl bg-card text-card-foreground hover:shadow-xl"
        >
          {/* Image with overlay */}
          <div className="relative">
            <img
              src={
                firstImage ||
                "https://santrikoding.com/storage/posts/92e09aed-49fa-4f2d-bdeb-0959d75ebcb1.webp"
              }
              alt={post.title}
              className="object-cover w-full h-48"
              loading="lazy"
            />

            {/* Bookmark button without tooltip */}
            <div className="absolute z-10 right-2 top-2 ">
              <button
                aria-label="Bookmark"
                className="p-2 mr-2 transition bg-white rounded-full bg-opacity-80 hover:bg-opacity-100"
              >
                <Bookmark className="w-5 h-5 text-gray-800" />
              </button>
              <ShareModalWithIcon />
            </div>

            {/* Overlay for "Read Article" text */}
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
              <span className="text-lg font-semibold text-white">
                Read Article
              </span>
            </div>
          </div>

          {/* Text content */}
          <div className="p-6">
            <h3 className="mb-2 text-xl font-semibold">
              {post.title.split(' ').slice(0, 10).join(' ')}
              {post.title.split(' ').length > 10 ? '...' : ''}
            </h3>
            <p className="mb-4 text-gray-600">
              {post.content.replace(/<[^>]+>/g, '').split(' ').slice(0, 10).join(' ') + '...'}
              
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{post.author}</span>
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      );
    })}
  </>
);

export default CardBlog;
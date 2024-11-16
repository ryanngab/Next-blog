import React from 'react';
import { useRouter } from 'next/navigation';
import { Bookmark } from 'lucide-react';
import { ShareModalWithIcon } from '@/components/modal/ShareModalWithIcon';

interface Post {
  id: string;
  image: string;
  title: string;
  content: string;
  author: {
    displayName: string;
    url: string;
    image: string;
  };
  date: string;
}

interface AllCardBlogProps {
  post: Post;
}

const extractFirstImage = (content: string): string | null => {
  const imageRegex = /<img[^>]+src=["'](https?[^"']+)["']/;
  const match = content.match(imageRegex);
  return match ? match[1] : null;
};

const truncateTitle = (title: string, maxWords: number): string => {
  const words = title.split(' ');
  return words.length > maxWords
    ? words.slice(0, maxWords).join(' ') + '...'
    : title;
};

const AllCardBlog: React.FC<AllCardBlogProps> = ({ post }) => {
  const router = useRouter();
  const firstImage = extractFirstImage(post.content);
  const truncatedTitle = truncateTitle(post.title, 10);

  return (
      <div
        onClick={() =>
          router.push(`/blog/${post.id}/${encodeURIComponent(post.title)}`)
        }
        className="relative overflow-hidden transition-shadow duration-300 border shadow cursor-pointer group rounded-xl bg-card text-card-foreground hover:shadow-xl"
      >
        <div className="relative">
          <img
            src={firstImage || post.image || 'https://via.placeholder.com/150'}
            alt={post.title}
            className="object-cover w-full h-48"
            loading="lazy"
          />
          <div className="absolute z-10 right-2 top-2">
            <button
              aria-label="Bookmark"
              className="p-2 mr-2 transition bg-white rounded-full bg-opacity-80 hover:bg-opacity-100"
            >
              <Bookmark className="w-5 h-5 text-gray-800" />
            </button>
            <ShareModalWithIcon />
          </div>
        </div>
        <div className="p-6">
          <h3 className="mb-2 text-lg font-semibold">{truncatedTitle}</h3>{' '}
          {/* Ukuran font untuk title diperkecil */}
          <p className="mb-4 text-sm text-gray-600">
            {' '}
            {/* Ukuran font untuk description diperkecil */}
            {post.content
              .replace(/<[^>]+>/g, '')
              .split(' ')
              .slice(0, 20)
              .join(' ') + '...'}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            {' '}
            {/* Ukuran font untuk tanggal dan author diperkecil */}
            <span>{post.author?.displayName || 'Unknown Author'}</span>
            <span>{post.date}</span>
          </div>
        </div>
      </div>
  );
};

export default AllCardBlog;

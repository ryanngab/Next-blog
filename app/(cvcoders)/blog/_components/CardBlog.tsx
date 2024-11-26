import React from 'react';
import { useRouter } from 'next/navigation';
import { Bookmark, Clock, Calendar } from 'lucide-react'; // Import ikon yang diperlukan
import { ShareModalWithIcon } from '@/components/modal/ShareModalWithIcon';
import Image from 'next/image';

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
  published: string;
}

interface CardBlogProps {
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

// Fungsi untuk memformat tanggal menjadi "Month Day, Year" (November 01, 2024)
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  };
  return date.toLocaleDateString('en-US', options); // Format tanggal: "November 01, 2024"
};

// Fungsi untuk menghitung waktu baca berdasarkan jumlah kata (200 kata per menit)
const calculateReadingTime = (content: string): string => {
  const wordCount = content.replace(/<[^>]+>/g, '').split(' ').length; // Menghitung jumlah kata
  const readingTime = Math.ceil(wordCount / 200); // Rata-rata 200 kata per menit
  return `${readingTime} minute read`;
};

const CardBlog: React.FC<CardBlogProps> = ({ post }) => {
  const router = useRouter();
  const firstImage = extractFirstImage(post.content);
  const truncatedTitle = truncateTitle(post.title, 10);
  const readingTime = calculateReadingTime(post.content); // Hitung waktu baca

  return (
    <div
      onClick={() =>
        router.push(
          `/blog/${post.id}/${encodeURIComponent(
            post.title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-')
          )}`
        )
      }
      className="cursor-pointer rounded-lg border border-gray-300 p-4 transition duration-300 hover:bg-gray-100"
    >
      <div className="relative">
        <Image
          src={firstImage || post.image || 'https://via.placeholder.com/150'}
          alt={post.title}
          width={200}
          height={200}
          className="h-48 w-full rounded-lg object-cover"
          loading="lazy"
        />
        <div className="absolute right-2 top-2 z-10">
          <button
            aria-label="Bookmark"
            className="mr-2 rounded-full bg-white p-2 transition hover:bg-gray-100 hover:shadow-xl"
          >
            <Bookmark className="h-5 w-5 text-gray-800" />
          </button>
          <ShareModalWithIcon />
        </div>
      </div>
      <div className="flex h-[calc(100%-12rem)] flex-col justify-between">
        <h3 className="text-md mb-4 pt-3 font-semibold">{truncatedTitle}</h3>

        {/* <p className="mb-4 text-sm text-gray-600">
          {post.content
            .replace(/<[^>]+>/g, '')
            .split(' ')
            .slice(0, 20)
            .join(' ') + '...'}
        </p> */}
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>{formatDate(post.published)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{readingTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBlog;

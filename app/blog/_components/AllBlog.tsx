// components/blog/BlogPage.tsx
'use client';

import React, { useState } from 'react';

import PageContainer from '@/components/layout/page-container';

import CardBlog from './CardBlog';

const AllBlog: React.FC = () => {
  const allblogdata = [
    {
      id: 1,
      image: 'images.unsplash.com/photo-1499750310107-5fef28a66643',
      title: 'Modern Web Development',
      author: 'John Smith',
      date: 'March 15, 2024',
      content: 'Exploring the latest trends...'
    },
    {
      id: 2,
      image: 'images.unsplash.com/photo-1498050108023-c5249f4df085',
      title: 'Understanding React Hooks',
      author: 'Emma Wilson',
      date: 'March 14, 2024',
      content: 'Deep dive into React Hooks...'
    },
    {
      id: 3,
      image: 'images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      title: 'Future of UI Design',
      author: 'Michael Brown',
      date: 'March 13, 2024',
      content: 'Examining upcoming trends...'
    },
    {
      id: 4,
      image: 'images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      title: 'Future of UI Design',
      author: 'Michael Brown',
      date: 'March 13, 2024',
      content: 'Examining upcoming trends...'
    },
    {
      id: 5,
      image: 'images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      title: 'Future of UI Design',
      author: 'Michael Brown',
      date: 'March 13, 2024',
      content: 'Examining upcoming trends...'
    },
    {
      id: 6,
      image: 'images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      title: 'Future of UI Design',
      author: 'Michael Brown',
      date: 'March 13, 2024',
      content: 'Examining upcoming trends...'
    },
    {
      id: 7,
      image: 'images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      title: 'Future of UI Design',
      author: 'Michael Brown',
      date: 'March 13, 2024',
      content: 'Examining upcoming trends...'
    },
    {
      id: 8,
      image: 'images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      title: 'Future of UI Design',
      author: 'Michael Brown',
      date: 'March 13, 2024',
      content: 'Examining upcoming trends...'
    },
    {
      id: 9,
      image: 'images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      title: 'Future of UI Design',
      author: 'Michael Brown',
      date: 'March 13, 2024',
      content: 'Examining upcoming trends...'
    },
    {
      id: 10,
      image: 'images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      title: 'Future of UI Design',
      author: 'Michael Brown',
      date: 'March 13, 2024',
      content: 'Examining upcoming trends...'
    },
    {
      id: 11,
      image: 'images.unsplash.com/photo-1499750310107-5fef28a66643',
      title: 'Modern Web Development',
      author: 'John Smith',
      date: 'March 15, 2024',
      content: 'Exploring the latest trends...'
    },
    {
      id: 12,
      image: 'images.unsplash.com/photo-1498050108023-c5249f4df085',
      title: 'Understanding React Hooks',
      author: 'Emma Wilson',
      date: 'March 14, 2024',
      content: 'Deep dive into React Hooks...'
    },
    {
      id: 13,
      image: 'images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      title: 'Future of UI Design',
      author: 'Michael Brown',
      date: 'March 13, 2024',
      content: 'Examining upcoming trends...'
    },
    {
      id: 14,
      image: 'images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      title: 'Future of UI Design',
      author: 'Michael Brown',
      date: 'March 13, 2024',
      content: 'Examining upcoming trends...'
    },
    {
      id: 15,
      image: 'images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      title: 'Future of UI Design',
      author: 'Michael Brown',
      date: 'March 13, 2024',
      content: 'Examining upcoming trends...'
    },
    {
      id: 16,
      image: 'images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      title: 'Future of UI Design',
      author: 'Michael Brown',
      date: 'March 13, 2024',
      content: 'Examining upcoming trends...'
    },
    {
      id: 17,
      image: 'images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      title: 'Future of UI Design',
      author: 'Michael Brown',
      date: 'March 13, 2024',
      content: 'Examining upcoming trends...'
    },
    {
      id: 18,
      image: 'images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      title: 'Future of UI Design',
      author: 'Michael Brown',
      date: 'March 13, 2024',
      content: 'Examining upcoming trends...'
    }
    // Tambahkan lebih banyak data jika diperlukan
  ];

  // State untuk mengontrol jumlah data yang ditampilkan
  const [visiblePosts, setVisiblePosts] = useState(8);

  // Fungsi untuk menambah data yang ditampilkan
  const handleReadMore = () => {
    setVisiblePosts((prevVisible) => prevVisible + 9);
  };

  return (
    <PageContainer scrollable>
      <div className="container px-4 py-8 mx-auto lg:flex lg:gap-8">
        <div className="flex flex-wrap gap-6">
          <CardBlog posts={allblogdata.slice(0, visiblePosts)} />
        </div>
      </div>
        {visiblePosts < allblogdata.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleReadMore}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Read More
            </button>
          </div>
        )}
    </PageContainer>
  );
};

export default AllBlog;

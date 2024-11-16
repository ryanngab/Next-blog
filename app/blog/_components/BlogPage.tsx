'use client';
import React, { useState, useEffect } from 'react';
import SwipperBlog from './SwipperBlog';
import CardBlog from './CardBlog';
import PopularBlog from './PopularBlog';
import PageContainer from '@/components/layout/page-container';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const pageSize = 6;

  const swipperData = [
    {
      id: 1,
      image: 'images.unsplash.com/photo-1499750310107-5fef28a66643',
      title: 'Modern Web Development',
      author: 'John Smith',
      date: 'March 15, 2024',
      content: 'Exploring the latest trends in web development...'
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
      content: 'Examining upcoming trends in UI design...'
    },
    {
      id: 4,
      image: 'images.unsplash.com/photo-1504639725590-34d0984388bd',
      title: 'Cybersecurity Essentials',
      author: 'Alice Johnson',
      date: 'March 12, 2024',
      content: 'Learn the basics of protecting your digital assets...'
    }
  ];

  const popularPosts = [
    {
      id: 1,
      image: 'images.unsplash.com/photo-1515378791036-0648a3ef77b2',
      title: 'Top Programming Languages 2024',
      excerpt: 'Discover the most in-demand programming languages this year.'
    },
    {
      id: 2,
      image: 'images.unsplash.com/photo-1531403009284-440f080d1e12',
      title: 'Machine Learning Basics',
      excerpt: 'Get started with the fundamentals of machine learning.'
    },
    {
      id: 3,
      image: 'images.unsplash.com/photo-1504639725590-34d0984388bd',
      title: 'Cybersecurity Essentials',
      excerpt: 'Learn the basics of protecting your digital assets.'
    }
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/blog/posts?page=${currentPage}&pageSize=${pageSize}`
        );
        const data = await response.json();

        if (data.error) {
          console.error(data.error);
        } else {
          setPosts(data.posts);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <PageContainer scrollable>
      <div className="container mx-auto lg:flex lg:gap-6">
        <div className="lg:w-3/4">
          <SwipperBlog carouselData={swipperData} />
          {!loading ? (
            <>
              <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <CardBlog key={post.id} post={post} />
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Pagination>
                  <PaginationContent>
                    {/* Previous Button */}
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          onClick={() => handlePageChange(i + 1)}
                          className={
                            currentPage === i + 1
                              ? 'bg-purple-500'
                              : 'bg-purple-300'
                          }
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    {/* Ellipsis for skipped pages */}
                    {totalPages > 5 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    {/* Next Button */}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <aside className="mt-8 lg:mt-0 lg:w-1/4">
          <PopularBlog posts={popularPosts} />
        </aside>
      </div>
    </PageContainer>
  );
};

export default BlogPage;

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
import ButtonCategory from './ButtonCategory';
import PinnedPost from './PinnedPost';

export const metadata = {
  title: 'CVCODERS: Blog'
};

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  // const [popularPosts, setPopularPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const pageSize = 6;
  const [swipperData, setSwipperData] = useState<any[]>([]);
  const [pinnedPost, setPinnedPost] = useState<any | null>(null);

  // // Fetch Popular Blog
  // useEffect(() => {
  //   const fetchPopularPosts = async () => {
  //     try {
  //       const response = await fetch(`/api/products/popular`); // API sekarang hanya mengembalikan 5 data terbaru
  //       const data = await response.json();

  //       if (!data.error) {
  //         setPopularPosts(data); // Data langsung diset tanpa filter ulang
  //       } else {
  //         console.error(data.error);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching popular posts:', error);
  //     }
  //   };

  //   fetchPopularPosts();
  // }, []);

  // Fetch Pinned Post & Swipper Data
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

          const swipperPosts = data.filter((item: any) => item.swipper);
          setSwipperData(swipperPosts);
        }
      } catch (error) {
        console.error('Error fetching swipper data:', error);
      }
    };

    fetchSwipperData();
  }, []);

  // Fetch Blog Posts
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
      <div className="mx-auto lg:flex lg:gap-6">
        <div className="lg:w-3/4">
          <SwipperBlog carouselData={swipperData} />
          {pinnedPost && <PinnedPost post={pinnedPost} />}
          {!loading ? (
            <>
              <h2 className="mb-2 mt-8 text-lg font-semibold">Blog Post</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <CardBlog key={post.id} post={post} />
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        isActive={currentPage > 1}
                      />
                    </PaginationItem>
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
                    {totalPages > 5 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        isActive={currentPage < totalPages}
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
          <PopularBlog />
          <ButtonCategory />
        </aside>
      </div>
    </PageContainer>
  );
};

export default BlogPage;

'use client';
import React, { useState, useEffect } from 'react';
import CardBlog from './CardBlog';
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
  const pageSize = 8;

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
      <div className="container mx-auto flex flex-col lg:flex lg:gap-6">
        {!loading ? (
          <>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {posts.map((post) => (
                <CardBlog key={post.id} post={post} />
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  {/* Previous Button */}
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      isActive={currentPage > 1}
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
    </PageContainer>
  );
};

export default BlogPage;

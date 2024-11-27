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
import Buttonlabels from './Buttonlabels';
import SkeletonLoaderCard from '@/components/loaders/SkeletonLoaderCard';
import SkeletonLoaderImg from '@/components/loaders/SkeletonLoaderImg';
import SkeletonLoaderPinned from '@/components/loaders/SkeletonLoaderPinned';
import SkeletonLoaderList from '@/components/loaders/SkeletonLoaderList';
import PinnedPost from './PinnedPost';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine); // Status koneksi awal
  const pageSize = 6;

  // Update koneksi status
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
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

    if (isOnline) fetchPosts();
  }, [currentPage, isOnline]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <PageContainer scrollable>
      <div className="mx-auto lg:flex lg:gap-6">
        <div className="lg:w-3/4">
          {isOnline ? (
            <>
              <SwipperBlog />
              <PinnedPost />
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
                <div className="text-card-foreground">
                  <h2 className="mb-4 text-lg font-semibold">Blog Post</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <SkeletonLoaderCard />
                    <SkeletonLoaderCard />
                    <SkeletonLoaderCard />
                    <SkeletonLoaderCard />
                    <SkeletonLoaderCard />
                    <SkeletonLoaderCard />
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <SkeletonLoaderImg />
              <div className="mt-3 text-card-foreground">
                <h2 className="mb-4 text-lg font-semibold">Pinned Post</h2>
                <SkeletonLoaderPinned />
              </div>

              <div className="text-card-foreground">
                <h2 className="mb-4 mt-8 text-lg font-semibold">
                  Koneksi Terputus
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <SkeletonLoaderCard />
                </div>
              </div>
            </>
          )}
        </div>
        <aside className="mt-8 lg:mt-0 lg:w-1/4">
          {isOnline ? (
            <>
              <PopularBlog />
              <Buttonlabels />
            </>
          ) : (
            <SkeletonLoaderList />
          )}
        </aside>
      </div>
    </PageContainer>
  );
};

export default BlogPage;

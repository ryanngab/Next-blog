'use client';

import { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { useParams } from 'next/navigation';
import { CommentModal } from '@/components/modal/CommentModal';
import './read.css';
import TagsBlog from './TagsBlog';
import PopularBlog from './PopularBlog';
import { ShareModal } from '@/components/modal/ShareModal';
import SkeleteonLoaderText from '@/components/loaders/SkeleteonLoaderText';

const BlogDetailPage = () => {
  const params = useParams();
  const { id } = params; // Ambil ID dari URL
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post)
    return (
      <div className="container mx-auto px-4 lg:flex lg:gap-6">
        <div className="flex flex-col gap-3 lg:w-3/4">
          <SkeleteonLoaderText />
        </div>
      </div>
    );
  return (
    <PageContainer scrollable>
      <div className="container mx-auto px-4 lg:flex lg:gap-6">
        <div className="flex flex-col gap-3 lg:w-3/4">
          <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
          <div className="flex items-center justify-between">
            <div className="mb-4 text-sm text-muted-foreground">
              <span>{post.author}</span> | <span>{post.date}</span>
            </div>
            <div className="flex">
              <ShareModal />
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="prose"
          />
          <TagsBlog />
          <CommentModal
            // Ganti dengan shortname Disqus Anda
            disqusConfig={{
              url: `http://localhost:3000/blog/${post.id}`,
              identifier: post.id,
              title: post.title
            }}
          />
        </div>

        <aside className="mt-8 lg:mt-0 lg:w-1/4">
          <PopularBlog />
        </aside>
      </div>
    </PageContainer>
  );
};

export default BlogDetailPage;

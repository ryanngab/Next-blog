'use client';
import { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { useParams } from 'next/navigation';
import { CommentModal } from '@/components/modal/CommentModal';
import './read.css';
import TagsBlog from './TagsBlog';
import ShareBlog from './ShareBlog';
import PopularBlog from './PopularBlog';
import { ShareModalWithIcon } from '@/components/modal/ShareModalWithIcon';
import { ShareModal } from '@/components/modal/ShareModal';

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

  if (!post) return <div>Loading...</div>;
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
  return (
    <PageContainer scrollable>
      <div className="container mx-auto px-4 lg:flex lg:gap-6">
        <div className="flex flex-col gap-3 lg:w-3/4">
          <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
          <div className="flex items-center justify-between">
            <div className="mb-4 text-sm text-muted-foreground">
              <span>{post.author}</span> | <span>{post.date}</span>
            </div>
            <div className="">
              <ShareModal />
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="prose"
          />

          <TagsBlog />
          <CommentModal />
        </div>

        <aside className="mt-8 lg:mt-0 lg:w-1/4">
          <PopularBlog posts={popularPosts} />
        </aside>
      </div>
    </PageContainer>
  );
};

export default BlogDetailPage;

'use client';
import { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { useParams } from 'next/navigation';

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

  return (
    <PageContainer scrollable>

    <div className="container px-4 mx-auto">
      <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
      <div className="mb-4 text-sm text-gray-500">
        <span>{post.author}</span> | <span>{post.date}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose" />
    </div>

    </PageContainer>
  );
};

export default BlogDetailPage;

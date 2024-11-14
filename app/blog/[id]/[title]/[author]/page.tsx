// pages/blog/[id]/[title]/[author].tsx
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface Post {
  id: number;
  image: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface BlogDetailProps {
  initialPostData: Post | null;
}

const BlogDetail: NextPage<BlogDetailProps> = ({ initialPostData }) => {
  const [post, setPost] = useState<Post | null>(initialPostData);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // If initial data is not available, fetch data from API
    if (!post) {
      fetch(`/api/blog/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data))
        .catch((err) => console.error(err));
    }
  }, [id, post]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container p-4 mx-auto">
      <div className="mb-4">
        <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
        <div className="mb-4 text-gray-500">
          <span>By {post.author}</span> • <span>{post.date}</span>
        </div>
      </div>
      <div className="mb-4">
        <img src={post.image} alt={post.title} className="w-full rounded" />
      </div>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </div>
  );
};

// Fetch initial post data server-side for SEO and faster load
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const initialPostData = await res.ok ? await res.json() : null;

  return {
    props: { initialPostData },
  };
};

export default BlogDetail;

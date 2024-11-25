import React from 'react';
import BlogDetailPage from '../../_components/DetailBlogPage';

export async function generateMetadata({
  params
}: {
  params: { id: string; title: string };
}) {
  const { title } = params;

  return {
    title: `Blog: ${decodeURIComponent(title.replace(/-/g, ' '))}`
  };
}

const Page = ({ params }: { params: { id: string; title: string } }) => {
  return <BlogDetailPage />;
};

export default Page;

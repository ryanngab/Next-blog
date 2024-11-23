import React from 'react';
import ProductDetail from '../../_components/ProductDetail';

export async function generateMetadata({
  params
}: {
  params: { id: string; name: string };
}) {
  const { name } = params;

  return {
    title: `Product: ${decodeURIComponent(name.replace(/-/g, ' '))}`
  };
}

const Page = ({ params }: { params: { id: string; name: string } }) => {
  return <ProductDetail />;
};

export default Page;

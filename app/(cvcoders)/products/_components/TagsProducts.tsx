import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface TagsProductsProps {
  labels: string[]; // Array kategori produk
}

const TagsProducts: React.FC<TagsProductsProps> = ({ labels }) => {
  return (
    <div className="mb-3 mt-3 flex flex-wrap gap-2">
      <p className="font-bold">Tags</p>
      <div className="flex flex-wrap gap-3">
        {labels.map((labels, index) => (
          <Link
            key={index}
            href={`/products/labels/${encodeURIComponent(labels)}`}
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            {labels}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsProducts;

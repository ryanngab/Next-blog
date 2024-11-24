import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface TagsProductsProps {
  categories: string[]; // Array kategori produk
}

const TagsProducts: React.FC<TagsProductsProps> = ({ categories }) => {
  return (
    <div className="mb-3 mt-3 flex flex-wrap gap-2">
      <p className="font-bold">Tags</p>
      <div className="flex flex-wrap gap-3">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/products/categories/${encodeURIComponent(category)}`}
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsProducts;

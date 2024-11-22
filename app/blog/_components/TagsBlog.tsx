import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

const TagsBlog = () => {
  return (
    <>
      <div className="mb-3 flex flex-wrap gap-2">
        <p className="font-bold">Tags </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">Ini Category</Button>
          <Link
            href="/dashboard/product/new"
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            Category
          </Link>
        </div>
      </div>
    </>
  );
};

export default TagsBlog;

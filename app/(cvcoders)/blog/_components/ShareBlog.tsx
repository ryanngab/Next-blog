import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Facebook, Link2, Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ShareBlog = () => {
  return (
    <div className="mb-3 flex flex-wrap gap-2">
      <p className="font-bold">Share</p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/dashboard/product/new"
          className={cn(buttonVariants(), 'text-xs md:text-sm')}
        >
          <Twitter className="h-4 w-4" />
        </Link>
        <Link
          href="/dashboard/product/new"
          className={cn(buttonVariants(), 'text-xs md:text-sm')}
        >
          <Facebook className="h-4 w-4" />
        </Link>
        <Link
          href="/dashboard/product/new"
          className={cn(buttonVariants(), 'text-xs md:text-sm')}
        >
          Salin Link
          <Link2 className="ms-3 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default ShareBlog;

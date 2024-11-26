import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Buttonlabels = () => {
  return (
    <>
      <h2 className="mb-2 mt-8 text-lg font-semibold">labels</h2>
      {/* <hr className='mb-2' /> */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline">＋ Add New Todo</Button>
        <Link
          href="/dashboard/product/new"
          className={cn(buttonVariants(), 'text-xs md:text-sm ')}
          style={{ width: '150px' }}
        >
          <Plus className="mr-2 h-4 w-4" />
          labels
        </Link>
        <Link
          href="/dashboard/product/new"
          className={cn(buttonVariants(), 'text-xs md:text-sm')}
          style={{ width: '150px' }}
        >
          <Plus className="mr-2 h-4 w-4" />
          labels
        </Link>
        <Link
          href="/dashboard/product/new"
          className={cn(buttonVariants(), 'text-xs md:text-sm')}
          style={{ width: '150px' }}
        >
          <Plus className="mr-2 h-4 w-4" />
          labels
        </Link>
      </div>
      <p className="mt-2 text-sm">View All (7+)</p>
    </>
  );
};

export default Buttonlabels;

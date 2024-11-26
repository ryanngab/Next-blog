import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const LabelsButton = () => {
  return (
    <div className="mt-5 flex flex-wrap gap-3 ">
      <Link
        href="/dashboard/product/new"
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'text-xs md:text-sm'
        )}
        style={{ width: '200px', height: '40px' }}
      >
        <Plus className="mr-2 h-4 w-4" />
        labels
      </Link>
    </div>
  );
};

export default LabelsButton;

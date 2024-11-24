import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { DiscussionEmbed } from 'disqus-react';
import { MessageCircle } from 'lucide-react';

interface CommentModalProps {
  disqusConfig: {
    url: string;
    identifier: string;
    title: string;
  };
}

export function CommentModal({ disqusConfig }: CommentModalProps) {
  const disqusShortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME;

  if (!disqusShortname) {
    console.error(
      'Disqus shortname is not defined in the environment variables'
    );
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            buttonVariants(),
            'w-full text-xs font-bold md:text-sm  '
          )}
          style={{ height: '50px' }}
        >
          Join Discussion
          <MessageCircle className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        <div>
          {/* Integrasi Disqus */}
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

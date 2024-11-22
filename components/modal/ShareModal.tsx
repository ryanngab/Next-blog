import { Copy, Facebook, Share2 } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function ShareModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2 ">
          <Share2 className="mr-3 h-5 w-5" /> Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share to other apps</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-col items-center">
            <Link
              href="/dashboard/product/new"
              className={cn(
                buttonVariants(),
                'rounded-full text-xs md:text-sm'
              )}
              style={{ width: '50px', height: '50px' }}
            >
              <Facebook />
            </Link>
            <span className="text-sm " style={{ fontSize: '12px' }}>
              Facebook
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Link
              href="/dashboard/product/new"
              className={cn(
                buttonVariants(),
                'rounded-full text-xs md:text-sm'
              )}
              style={{ width: '50px', height: '50px' }}
            >
              <Facebook />
            </Link>
            <span className="text-sm " style={{ fontSize: '12px' }}>
              Whatsapp
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Link
              href="/dashboard/product/new"
              className={cn(
                buttonVariants(),
                'rounded-full text-xs md:text-sm'
              )}
              style={{ width: '50px', height: '50px' }}
            >
              <Facebook />
            </Link>
            <span className="text-sm " style={{ fontSize: '12px' }}>
              Twiter
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Link
              href="/dashboard/product/new"
              className={cn(
                buttonVariants(),
                'rounded-full text-xs md:text-sm'
              )}
              style={{ width: '50px', height: '50px' }}
            >
              <Facebook />
            </Link>
            <span className="text-sm " style={{ fontSize: '12px' }}>
              Telegram
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Link
              href="/dashboard/product/new"
              className={cn(
                buttonVariants(),
                'rounded-full text-xs md:text-sm'
              )}
              style={{ width: '50px', height: '50px' }}
            >
              <Facebook />
            </Link>
            <span className="text-sm " style={{ fontSize: '12px' }}>
              Pinterest
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Link
              href="/dashboard/product/new"
              className={cn(
                buttonVariants(),
                'rounded-full text-xs md:text-sm'
              )}
              style={{ width: '50px', height: '50px' }}
            >
              <Facebook />
            </Link>
            <span className="text-sm " style={{ fontSize: '12px' }}>
              Linkedin
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Link
              href="/dashboard/product/new"
              className={cn(
                buttonVariants(),
                'rounded-full text-xs md:text-sm'
              )}
              style={{ width: '50px', height: '50px' }}
            >
              <Facebook />
            </Link>
            <span className="text-sm " style={{ fontSize: '12px' }}>
              Email
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Link
              href="/dashboard/product/new"
              className={cn(
                buttonVariants(),
                'rounded-full text-xs md:text-sm'
              )}
              style={{ width: '50px', height: '50px' }}
            >
              <Facebook />
            </Link>
            <span className="text-sm " style={{ fontSize: '12px' }}>
              Facebook
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Link
              href="/dashboard/product/new"
              className={cn(
                buttonVariants(),
                'rounded-full text-xs md:text-sm'
              )}
              style={{ width: '50px', height: '50px' }}
            >
              <Facebook />
            </Link>
            <span className="text-sm " style={{ fontSize: '12px' }}>
              Facebook
            </span>
          </div>
        </div>
        <DialogHeader>
          <DialogTitle>Or Copy Link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="rounded-full p-2"
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4 text-gray-800" />
          </Button>
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

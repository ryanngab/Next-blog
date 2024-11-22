'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { InstagramLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Instagram, TwitterIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  message: z.string().min(1, { message: 'Enter a valid message' }),
  name: z.string().min(1, { message: 'Enter a valid name' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function ContactForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    email: 'demo@gmail.com',
    name: 'riyan',
    message: 'hello'
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    startTransition(() => {
      signIn('credentials', {
        email: data.email,
        name: data.name,
        message: data.message,
        callbackUrl: callbackUrl ?? '/dashboard'
      });
      toast.success('Signed In Successfully!');
    });
  };

  return (
    <>
      <div className="w-full max-w-2xl rounded-lg">
        <div className="mb-6">
          <h2 className="mb-2 text-sm font-semibold">
            Temukan saya di media sosial
          </h2>
          <div className="flex space-x-2">
            <a
              href="#"
              className="flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-white"
            >
              <InstagramLogoIcon className="" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-white"
            >
              <Instagram className="" />
            </a>
            <a
              href="#"
              className="flex items-center justify-center rounded-md bg-green-500 px-4 py-2 text-white"
            >
              <TwitterIcon className="" />
            </a>
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-semibold">
            Atau kirimkan pesan kepada saya
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your name..."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email..."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
            <Button
              disabled={loading}
              className="ml-auto mt-2 w-full"
              type="submit"
            >
              Enter
            </Button>
          </Form>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </>
  );
}

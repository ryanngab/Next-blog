'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import GithubSignInButton from './github-auth-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { forgotPasswordAction } from '@/app/actions';
import Link from 'next/link';

export default function LoginPage() {
  const form = useForm();
  return (
    <>
      <Form {...form}>
        <form className="w-full space-y-2">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input id="email" type="email" required {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <p className="text text-sm text-foreground">
            Already have an account?{' '}
            <Link
              className="font-medium text-primary underline"
              href="/sign-in"
            >
              Sign in
            </Link>
          </p>
          <Button
            formAction={forgotPasswordAction}
            className="ml-auto w-full"
            type="submit"
          >
            Sign up
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GithubSignInButton />
    </>
  );
}

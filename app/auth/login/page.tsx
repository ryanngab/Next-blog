'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import GithubSignInButton from '../_components/github-auth-button';
import { login, signup } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input id="password" type="password" required {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button formAction={login} className="ml-auto w-full" type="submit">
            Login
          </Button>
          <Button formAction={signup} className="ml-auto w-full" type="submit">
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

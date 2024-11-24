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
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import supabase from '@/lib/supabaseClient';
import bcrypt from 'bcryptjs';
import * as z from 'zod';
import GithubSignInButton from './github-auth-button';

const formSchema = z
  .object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm Password must be at least 6 characters' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const [loading, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const checkPasswordStrength = (password: string) => {
    if (password.length < 6) {
      setPasswordStrength('Too short');
    } else if (password.length < 8) {
      setPasswordStrength('Weak');
    } else if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
      setPasswordStrength('Strong');
    } else {
      setPasswordStrength('Medium');
    }
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      checkPasswordStrength(value.password ?? '');
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  };

  const extractNameFromEmail = (email: string): string => {
    const namePart = email.split('@')[0];
    return namePart
      .split('.')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const resendVerificationEmail = async (email: string) => {
    const { error } = await supabase.auth.resend({ email });
    if (error) {
      toast.error('Failed to resend verification email. Please try again.');
    } else {
      toast.success('Verification email resent. Please check your inbox.');
    }
  };

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      // Cek apakah email sudah terdaftar
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('email')
        .eq('email', data.email)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        toast.error('Failed to check email. Please try again later.');
        return;
      }

      if (existingUser) {
        toast.error('Email already registered. Please log in.');
        return;
      }

      // Autentikasi user ke Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      });

      if (authError) {
        toast.error('Authentication failed. Please try again.');
        return;
      }

      // Jika email belum diverifikasi
      if (authData?.user?.confirmed_at === null) {
        toast.success(
          'Registration successful! Please verify your email before logging in.'
        );
        return;
      }

      // Simpan data user ke tabel
      const hashedPassword = await hashPassword(data.password);
      const name = extractNameFromEmail(data.email);

      const { error: insertError } = await supabase.from('users').insert({
        email: data.email,
        password: hashedPassword,
        name,
        is_admin: false
      });

      if (insertError) {
        toast.error('Failed to register. Please try again later.');
        return;
      }

      toast.success('Registration complete. Welcome!');
      window.location.href = '/';
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password..."
                      disabled={loading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
                <div className="text-sm text-gray-500">{passwordStrength}</div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your password..."
                      disabled={loading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Continue With Email
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

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
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import { socialMediaLinks } from '@/constants/data';

// Skema validasi yang disesuaikan
const formSchema = (sendMethod: 'email' | 'whatsapp') =>
  z.object({
    email:
      sendMethod === 'email'
        ? z.string().email({ message: 'Enter a valid email address' })
        : z.string().optional(),
    message: z.string().min(1, { message: 'Enter a valid message' }),
    name: z.string().min(1, { message: 'Enter a valid name' }),
    subject:
      sendMethod === 'email'
        ? z.string().min(1, { message: 'Enter a valid subject' })
        : z.string().optional()
  });

type UserFormValue = z.infer<ReturnType<typeof formSchema>>;

export default function ContactForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, setLoading] = useState(false);
  const [sendMethod, setSendMethod] = useState<'email' | 'whatsapp'>(
    'whatsapp'
  );
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema(sendMethod)) // Menggunakan skema validasi yang sesuai
  });

  const onSubmit = async (data: UserFormValue) => {
    // Validasi form
    const validationErrors = form.formState.errors;
    if (Object.keys(validationErrors).length > 0) {
      toast.error('Silakan isi semua field yang wajib diisi.');
      return;
    }

    const message = `Name: ${data.name}\nMessage: ${data.message}`;
    const phoneNumber = '03137991102';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    setLoading(true);

    if (sendMethod === 'whatsapp') {
      // Membuka WhatsApp dengan pesan
      window.open(whatsappUrl, '_blank');
      toast.success('Pesan berhasil dikirim melalui WhatsApp!');
      setLoading(false);
    } else {
      // Mengirim email menggunakan EmailJS
      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message
          },
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
        );
        toast.success('Pesan berhasil dikirim melalui Email!');
      } catch (error) {
        console.error('Error sending email:', error);
        toast.error('Gagal mengirim pesan melalui Email.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl rounded-lg">
        <div className="mb-6">
          <h2 className="mb-2 text-sm font-semibold">
            Temukan saya di media sosial
          </h2>
          <div className="flex flex-wrap gap-2 lg:flex-row">
            {socialMediaLinks.map(({ link, icon }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex rounded-md border border-input bg-transparent px-4 py-2 shadow-sm hover:bg-primary hover:text-accent-foreground"
              >
                <span
                  className="h-5 w-5"
                  dangerouslySetInnerHTML={{ __html: icon }}
                />
              </a>
            ))}
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
                        placeholder="Masukkan nama Anda..."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {sendMethod === 'email' && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Masukkan email Anda..."
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
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Masukkan subjek Anda..."
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukkan pesan Anda..."
                        className="resize-none"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center space-x-4">
                <label>
                  <input
                    type="radio"
                    value="whatsapp"
                    checked={sendMethod === 'whatsapp'}
                    onChange={() => {
                      setSendMethod('whatsapp');
                      form.reset(); // Reset form saat memilih WhatsApp
                    }}
                  />
                  Kirim lewat WhatsApp
                </label>
                <label>
                  <input
                    type="radio"
                    value="email"
                    checked={sendMethod === 'email'}
                    onChange={() => {
                      setSendMethod('email');
                      form.reset(); // Reset form saat memilih Email
                    }}
                  />
                  Kirim lewat Email
                </label>
              </div>
              <Button
                disabled={loading}
                className="ml-auto mt-2 w-full"
                type="submit"
              >
                {loading ? 'Mengirim...' : 'Kirim'}
              </Button>
            </form>
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

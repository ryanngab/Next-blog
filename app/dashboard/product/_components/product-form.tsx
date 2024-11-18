'use client'; // Menandakan bahwa file ini merupakan bagian dari komponen client-side di Next.js

import { useState } from 'react';
import { FileUploader } from '@/components/file-uploader'; // Komponen untuk mengunggah file gambar
import { Button } from '@/components/ui/button'; // Komponen untuk tombol
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Komponen UI untuk card
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'; // Komponen untuk membangun form
import { Input } from '@/components/ui/input'; // Input untuk teks
import { Textarea } from '@/components/ui/textarea'; // Textarea untuk deskripsi panjang
import { Product } from '@/constants/mock-api'; // Tipe data produk dari mock-api
import { zodResolver } from '@hookform/resolvers/zod'; // Resolver untuk validasi form dengan Zod
import { useForm } from 'react-hook-form'; // Hook untuk mengelola form
import * as z from 'zod'; // Library untuk validasi skema data
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'; // Komponen select untuk memilih kategori produk

const MAX_FILE_SIZE = 1000000; // Batas ukuran file 1MB per gambar
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
]; // Jenis file gambar yang diterima

// Skema validasi untuk form menggunakan Zod
const formSchema = z.object({
  image: z
    .array(z.string().url())
    .max(4, 'You can add up to 4 URLs.')
    .optional(), // Validasi URL gambar
  file: z
    .array(z.any())
    .refine((files) => files?.length <= 4, 'You can upload up to 4 images.')
    .refine(
      (files) => files?.every((file) => file.size <= MAX_FILE_SIZE),
      `Max file size is 1MB per image.`
    )
    .refine(
      (files) =>
        files?.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ), // Validasi untuk file gambar yang diunggah
  name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.' // Nama produk harus lebih dari 2 karakter
  }),
  price: z.number(), // Validasi harga produk
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.' // Deskripsi produk harus lebih dari 10 karakter
  })
});

// Fungsi utama untuk form produk
export default function ProductForm({
  initialData,
  pageTitle
}: {
  initialData: Product | null; // Data produk awal (jika ada)
  pageTitle: string; // Judul halaman
}) {
  const [categories, setCategories] = useState<string[]>([
    'Beauty Products',
    'Electronics'
  ]); // State untuk kategori produk
  const [newCategory, setNewCategory] = useState<string>(''); // State untuk kategori baru
  const [imageType, setImageType] = useState<'upload' | 'url'>('upload'); // Untuk memilih metode input gambar

  // Fungsi untuk menambah kategori baru
  const handleAddCategory = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value.trim();

    if (
      event.key === 'Enter' &&
      inputValue &&
      !categories.includes(inputValue)
    ) {
      event.preventDefault();
      setCategories((prev) => [...prev, inputValue]);
      event.currentTarget.value = ''; // Reset input field
    } else if (inputValue && categories.includes(inputValue)) {
      alert('Category already exists!'); // Jika kategori sudah ada
    }
  };

  // Fungsi untuk menghapus kategori
  const handleRemoveCategory = (category: string) => {
    setCategories((prev) => prev.filter((cat) => cat !== category)); // Menghapus kategori yang dipilih
  };

  // Nilai default untuk form
  const defaultValues = {
    name: initialData?.name || '',
    price: initialData?.price || 0,
    description: initialData?.description || '',
    image: initialData?.photo_url ? [initialData.photo_url] : [],
    file: [] // Tambahkan nilai default untuk 'file'
  };

  // Hook untuk mengelola form dengan validasi dari Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  // Fungsi untuk menangani pengiriman form
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ ...values, categories });
    // Pengiriman data ke database (misalnya Supabase atau backend lainnya)
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {pageTitle}
        </CardTitle>{' '}
        {/* Judul Halaman */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              {/* Form untuk memilih gambar produk */}
              <FormItem className="w-full">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <div className="space-x-4">
                    <Button
                      type="button"
                      onClick={() => setImageType('upload')}
                      className={`${
                        imageType === 'upload'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      } transition-colors duration-300 hover:bg-blue-500`}
                    >
                      Upload Image
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setImageType('url')}
                      className={`${
                        imageType === 'url'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      } transition-colors duration-300 hover:bg-blue-500`}
                    >
                      Image URL
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>

              {/* Menampilkan form upload file jika 'upload' dipilih */}
              {imageType === 'upload' ? (
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Upload Images</FormLabel>
                      <FormControl>
                        <FileUploader
                          value={field.value}
                          onValueChange={field.onChange}
                          maxFiles={4}
                          maxSize={MAX_FILE_SIZE}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                // Menampilkan input URL gambar jika 'url' dipilih
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Image URLs</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter image URL"
                          value={field.value?.join(', ') || ''}
                          onChange={(e) =>
                            field.onChange(e.target.value.split(', '))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Form untuk nama produk */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Form untuk kategori produk */}
              <FormField
                control={form.control}
                name="categories"
                render={() => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <div>
                        <div className="mb-2 flex flex-wrap gap-2">
                          {categories.map((category) => (
                            <span
                              key={category}
                              className="inline-flex items-center rounded-full bg-blue-200 px-3 py-1 text-blue-800"
                            >
                              {category}
                              <button
                                type="button"
                                onClick={() => handleRemoveCategory(category)}
                                className="ml-2 text-red-600"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>

                        <Select
                          onValueChange={(value) => setNewCategory(value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select categories" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <Input
                              placeholder="Type and press Enter to add category"
                              onKeyDown={handleAddCategory}
                            />
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Form untuk harga produk */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Enter price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form untuk deskripsi produk */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
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

            <Button type="submit">Add Product</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

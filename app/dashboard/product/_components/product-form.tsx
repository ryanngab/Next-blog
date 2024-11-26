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
import supabase from '@/lib/supabaseClient'; // Import Supabase client

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
  }),
  labels: z.array(z.string()).optional(), // Tambahkan validasi untuk kategori
  pinned: z.boolean().optional(), // Tambahkan validasi untuk kolom pinned
  swiper: z.boolean().optional() // Tambahkan validasi untuk kolom swiper
});

// Fungsi utama untuk form produk
export default function ProductForm({
  initialData,
  pageTitle
}: {
  initialData: Product | null; // Data produk awal (jika ada)
  pageTitle: string; // Judul halaman
}) {
  const [labels, setlabels] = useState<string[]>(
    initialData?.labels ? initialData.labels.split(', ') : []
  ); // State untuk kategori produk
  const [newlabels, setNewlabels] = useState<string>(''); // State untuk kategori baru
  const [imageType, setImageType] = useState<'upload' | 'url'>('upload'); // Untuk memilih metode input gambar

  // Fungsi untuk menambah kategori baru
  const handleAddlabels = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value.trim();

    if (event.key === 'Enter' && inputValue && !labels.includes(inputValue)) {
      event.preventDefault();
      setlabels((prev) => [...prev, inputValue]);
      event.currentTarget.value = ''; // Reset input field
    } else if (inputValue && labels.includes(inputValue)) {
      alert('labels already exists!'); // Jika kategori sudah ada
    }
  };

  // Fungsi untuk menghapus kategori
  const handleRemovelabels = (labelsToRemove: string) => {
    setlabels((prev) => prev.filter((cat) => cat !== labelsToRemove)); // Menghapus kategori yang dipilih
  };

  // Fungsi untuk menangani pengiriman form
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = initialData
      ? await supabase
          .from('products') // Nama tabel di Supabase
          .update({
            name: values.name,
            description: values.description,
            labels: labels.join(', '), // Menggunakan state labels yang diperbarui
            price: values.price,
            photo_url: values.image?.[0] || '', // Gunakan optional chaining untuk menghindari error
            pinned: values.pinned,
            swiper: values.swiper,
            updated_at: new Date().toISOString() // Tanggal diperbarui
          })
          .eq('id', initialData.id) // Mengupdate berdasarkan ID produk
      : await supabase
          .from('products') // Nama tabel di Supabase
          .insert([
            {
              name: values.name,
              description: values.description,
              labels: labels.join(', '), // Menggunakan state labels yang diperbarui
              price: values.price,
              photo_url: values.image?.[0] || '', // Gunakan optional chaining untuk menghindari error
              pinned: values.pinned,
              swiper: values.swiper,
              created_at: new Date().toISOString(), // Tanggal dibuat
              updated_at: new Date().toISOString() // Tanggal diperbarui
            }
          ]);

    if (error) {
      console.error('Error inserting/updating data:', error);
      alert('Failed to save product.'); // Menampilkan pesan kesalahan
    } else {
      console.log('Product saved:', data);
      alert('Product saved successfully!'); // Menampilkan pesan sukses
    }
  }

  // Nilai default untuk form
  const defaultValues = {
    name: initialData?.name || '',
    price: initialData?.price || 0,
    description: initialData?.description || '',
    image: initialData?.photo_url ? [initialData.photo_url] : [],
    file: [], // Tambahkan nilai default untuk 'file'
    labels: initialData?.labels ? initialData.labels.split(', ') : [], // Ambil kategori dari initialData
    pinned: initialData?.pinned || false, // Tambahkan nilai default untuk pinned
    swiper: initialData?.swiper || false // Tambahkan nilai default untuk swiper
  };

  // Hook untuk mengelola form dengan validasi dari Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

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
                name="labels"
                render={() => (
                  <FormItem>
                    <FormLabel>labels</FormLabel>
                    <FormControl>
                      <div>
                        <div className="mb-2 flex flex-wrap gap-2">
                          {labels.map(
                            (
                              cat // Menggunakan state labels
                            ) => (
                              <span
                                key={cat}
                                className="inline-flex items-center rounded-full bg-blue-200 px-3 py-1 text-blue-800"
                              >
                                {cat}
                                <button
                                  type="button"
                                  onClick={() => handleRemovelabels(cat)} // Menghapus kategori
                                  className="ml-2 text-red-600"
                                >
                                  &times;
                                </button>
                              </span>
                            )
                          )}
                        </div>

                        <Select onValueChange={(value) => setNewlabels(value)}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select labels" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <Input
                              placeholder="Type and press Enter to add labels"
                              onKeyDown={handleAddlabels} // Menambahkan kategori
                            />
                            {labels.map(
                              (
                                cat // Menggunakan state labels
                              ) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form untuk pinned sebagai switcher */}
              <FormField
                control={form.control}
                name="pinned"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pinned</FormLabel>
                    <FormControl>
                      <label className="flex cursor-pointer items-center">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                          <div className="block h-8 w-14 rounded-full bg-gray-300"></div>
                          <div
                            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-transform ${
                              field.value
                                ? 'translate-x-full transform bg-blue-500'
                                : ''
                            }`}
                          ></div>
                        </div>
                        <span className="ml-2">
                          {field.value ? 'True' : 'False'}
                        </span>
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form untuk swiper sebagai switcher */}
              <FormField
                control={form.control}
                name="swiper"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Swiper</FormLabel>
                    <FormControl>
                      <label className="flex cursor-pointer items-center">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                          <div className="block h-8 w-14 rounded-full bg-gray-300"></div>
                          <div
                            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-transform ${
                              field.value
                                ? 'translate-x-full transform bg-blue-500'
                                : ''
                            }`}
                          ></div>
                        </div>
                        <span className="ml-2">
                          {field.value ? 'True' : 'False'}
                        </span>
                      </label>
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

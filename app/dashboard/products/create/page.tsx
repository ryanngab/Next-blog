'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CreateProductPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) alert(error.message);
      else setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: product, error } = await supabase
      .from('products')
      .insert({ name, price, description, image_url: imageUrl })
      .select('id')
      .single();

    if (error) {
      alert(error.message);
    } else {
      // Tambahkan relasi many-to-many
      const productCategories = selectedCategories.map((categoryId) => ({
        product_id: product.id,
        category_id: categoryId
      }));
      const { error: relError } = await supabase
        .from('product_categories')
        .insert(productCategories);

      if (relError) {
        alert(relError.message);
      } else {
        alert('Product created successfully!');
        router.push('/products');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Product</h1>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <fieldset>
        <legend>Categories</legend>
        {categories.map((category) => (
          <label key={category.id}>
            <input
              type="checkbox"
              value={category.id}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCategories((prev) => [...prev, category.id]);
                } else {
                  setSelectedCategories((prev) =>
                    prev.filter((id) => id !== category.id)
                  );
                }
              }}
            />
            {category.name}
          </label>
        ))}
      </fieldset>
      <button type="submit">Save</button>
    </form>
  );
}

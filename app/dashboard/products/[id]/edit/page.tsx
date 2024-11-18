'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function EditProductPage({
  params
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  // Fetch product and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Fetch product details
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select(
          'id, name, price, description, image_url, product_categories (category_id)'
        )
        .eq('id', params.id)
        .single();

      if (productError) {
        alert(productError.message);
        return;
      }

      setProduct(productData);
      setName(productData.name);
      setPrice(productData.price);
      setDescription(productData.description);
      setImageUrl(productData.image_url);
      setSelectedCategories(
        productData.product_categories.map((pc) => pc.category_id)
      );

      // Fetch all categories
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*');
      if (categoryError) {
        alert(categoryError.message);
      } else {
        setCategories(categoryData);
      }
    };

    fetchData();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Update product details
    const { error: updateError } = await supabase
      .from('products')
      .update({ name, price, description, image_url: imageUrl })
      .eq('id', product.id);

    if (updateError) {
      alert(updateError.message);
      return;
    }

    // Update product categories (many-to-many relationship)
    // Delete existing relationships
    const { error: deleteError } = await supabase
      .from('product_categories')
      .delete()
      .eq('product_id', product.id);

    if (deleteError) {
      alert(deleteError.message);
      return;
    }

    // Insert new relationships
    const productCategories = selectedCategories.map((categoryId) => ({
      product_id: product.id,
      category_id: categoryId
    }));

    const { error: insertError } = await supabase
      .from('product_categories')
      .insert(productCategories);

    if (insertError) {
      alert(insertError.message);
      return;
    }

    alert('Product updated successfully!');
    router.push('/products');
  };

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, categoryId]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Product</h1>
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
              checked={selectedCategories.includes(category.id)}
              onChange={(e) =>
                handleCategoryChange(category.id, e.target.checked)
              }
            />
            {category.name}
          </label>
        ))}
      </fieldset>
      <button type="submit">Save Changes</button>
    </form>
  );
}

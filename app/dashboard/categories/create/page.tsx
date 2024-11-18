'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CreateCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('categories').insert({ name });

    if (error) {
      alert(error.message);
    } else {
      alert('Category created successfully!');
      router.push('/categories');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Category</h1>
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
}

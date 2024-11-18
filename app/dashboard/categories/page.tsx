import { supabase } from '@/lib/supabaseClient';

export default async function CategoriesPage() {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*');

  if (error) throw new Error(error.message);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <a href={`/categories/${category.id}`}>{category.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

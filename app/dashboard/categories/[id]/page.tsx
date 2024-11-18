import { supabase } from '@/lib/supabaseClient';

export default async function CategoryDetailPage({
  params
}: {
  params: { id: string };
}) {
  const { data: category, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) throw new Error(error.message);

  return (
    <div>
      <h1>{category.name}</h1>
      <p>Created At: {new Date(category.created_at).toLocaleString()}</p>
    </div>
  );
}

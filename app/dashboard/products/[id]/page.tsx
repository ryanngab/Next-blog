import { supabase } from '@/lib/supabaseClient';

export default async function ProductDetailPage({
  params
}: {
  params: { id: string };
}) {
  const { data: product, error } = await supabase
    .from('products')
    .select('*, product_categories (categories (name))')
    .eq('id', params.id)
    .single();

  if (error) throw new Error(error.message);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <img src={product.image_url} alt={product.name} width={200} />
      <p>
        Categories:{' '}
        {product.product_categories.map((pc) => pc.categories.name).join(', ')}
      </p>
    </div>
  );
}

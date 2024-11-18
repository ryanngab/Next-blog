import { supabase } from '@/lib/supabaseClient';

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, price, product_categories (categories (name))');

  if (error) throw new Error(error.message);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <a href={`/products/${product.id}`}>
              {product.name} - ${product.price}
              <br />
              Categories:{' '}
              {product.product_categories
                .map((pc) => pc.categories.name)
                .join(', ')}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

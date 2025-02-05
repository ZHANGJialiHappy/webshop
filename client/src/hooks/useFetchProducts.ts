import { useState, useEffect } from 'react';
import { Product } from '../interfaces/products';

interface FetchProductsParams {
  query: string;
}

export const useFetchProducts = ({ query }: FetchProductsParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/products?${query}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(`Failed to fetch products: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return { products, loading, error };
};

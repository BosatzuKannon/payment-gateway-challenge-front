import { Box, Typography, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchProducts } from '../store/slices/productSlice';

export const ProductGrid = () => {
  const dispatch = useAppDispatch();
  const { items: products, status, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <Box sx={{ px: 2, mt: 4 }}>
      <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>
        Inspirado en lo último que viste
      </Typography>

      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {status === 'failed' && (
        <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
          {error}
        </Typography>
      )}

      {status === 'succeeded' && (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400'}
              freeShipping={true} 
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
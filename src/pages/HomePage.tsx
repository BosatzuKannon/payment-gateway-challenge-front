import { Box, Typography, Container } from '@mui/material';
import { Header } from '../components/Header';
import { CategorySlider } from '../components/CategorySlider';
import { ProductGrid } from '../components/ProductGrid';
import { CheckoutModal } from '../components/CheckoutModal';

export const HomePage = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      
      <Container maxWidth="sm" disableGutters sx={{ backgroundColor: 'background.default', pb: 10, minHeight: '100vh' }}>
        
        <Header />

        <Box sx={{ px: 2, mt: 1 }}>
          <Box 
            sx={{ 
              p: 3, 
              borderRadius: 4,
              height: '200px', 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=600)', 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: '#FFFFFF'
            }}
          >
            <Typography variant="overline" sx={{ fontWeight: 700, opacity: 0.9 }}>
              OFERTAS DEL DÍA
            </Typography>
            <Typography variant="h1" sx={{ fontSize: '1.8rem', mt: 0.5, lineHeight: 1.1 }}>
              Hasta 40% OFF <br /> en Tecnología
            </Typography>
          </Box>
        </Box>

        <CategorySlider />
        
        <ProductGrid />

        <CheckoutModal />

      </Container>
    </Box>
  );
};
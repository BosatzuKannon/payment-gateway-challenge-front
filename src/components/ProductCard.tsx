import { Box, Typography, Paper } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  freeShipping: boolean;
}

export const ProductCard = ({ name, price, imageUrl, freeShipping }: ProductCardProps) => {
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'translateY(-4px)' }
      }}
    >
      <Box
        sx={{
          height: 160,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#F5F5F5'
        }}
      />
      
      <Box sx={{ p: 2 }}>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            display: '-webkit-box', 
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden',
            lineHeight: 1.2,
            mb: 1,
            height: '2.4em' 
          }}
        >
          {name}
        </Typography>
        
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
          {formattedPrice}
        </Typography>

        {freeShipping && (
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'secondary.main' }}>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>Envío gratis</Typography>
            <BoltIcon sx={{ fontSize: 16, ml: 0.5, fontStyle: 'italic' }} />
            <Typography variant="caption" sx={{ fontWeight: 700, fontStyle: 'italic' }}>FULL</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
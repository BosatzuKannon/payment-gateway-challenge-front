import { Box, Chip, Typography } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const categories = [
  { label: 'Tecnología', icon: ComputerIcon },
  { label: 'Moda', icon: CheckroomIcon },
  { label: 'Hogar', icon: HomeIcon },
  { label: 'Gaming', icon: SportsEsportsIcon },
  { label: 'Juguetes', icon: HomeIcon },
];

export const CategorySlider = () => {
  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>
        Categorías Populares
      </Typography>
      
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 1.5, 
          overflowX: 'auto', 
          pb: 1, 
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          '-webkit-overflow-scrolling': 'touch'
        }}
      >
        {categories.map((category) => (
          <Chip 
            key={category.label}
            icon={<category.icon style={{ fontSize: 18 }} />}
            label={category.label}
            clickable
            sx={{ 
              px: 1,
              py: 2.5,
              borderRadius: 50,
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
              fontWeight: 500,
              '& .MuiChip-icon': { color: 'primary.main' },
              '&:hover': { backgroundColor: 'primary.fixed' } 
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
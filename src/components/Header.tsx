import { Box, InputBase, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';

export const Header = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 1 }}>
      <IconButton sx={{ color: 'text.primary' }}>
        <MenuIcon />
      </IconButton>

      <Paper
        elevation={0}
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          py: 0.5,
          borderRadius: 50,
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: '0.9rem' }}
          placeholder="Buscar en Tienda de Carlos"
          inputProps={{ 'aria-label': 'buscar productos' }}
        />
      </Paper>

      <IconButton sx={{ color: 'text.primary' }}>
        <ShoppingCartOutlinedIcon />
      </IconButton>
    </Box>
  );
};
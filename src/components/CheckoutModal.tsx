import { Box, Drawer, Typography, IconButton, TextField, Button } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ContactlessIcon from '@mui/icons-material/Contactless';
import { useAppDispatch, useAppSelector } from '../store';
import { closeCheckout, setQuantity } from '../store/slices/checkoutSlice';

export const CheckoutModal = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, selectedProduct, quantity } = useAppSelector((state) => state.checkout);

  const [cardNumber, setCardNumber] = useState('');
  const [cardBrand, setCardBrand] = useState<'visa' | 'mastercard' | ''>('');

  const handleClose = () => dispatch(closeCheckout());

  const handleIncrease = () => dispatch(setQuantity(quantity + 1));
  const handleDecrease = () => dispatch(setQuantity(quantity - 1));

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); 

    if (value.startsWith('4')) {
      setCardBrand('visa');
    } else if (value.match(/^5[1-5]/)) {
      setCardBrand('mastercard');
    } else {
      setCardBrand('');
    }

    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    setCardNumber(value.substring(0, 19));
  };

  const renderBrandLogo = () => {
    if (cardBrand === 'visa') {
      return <Typography sx={{ fontStyle: 'italic', fontWeight: 900, fontSize: '1.4rem', color: '#FFF' }}>VISA</Typography>;
    }
    if (cardBrand === 'mastercard') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#EB001B', zIndex: 1 }} />
          <Box sx={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#F79E1B', ml: -1, zIndex: 2, opacity: 0.9 }} />
        </Box>
      );
    }
    return <Box sx={{ width: 40, height: 25, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 1 }} />;
  };

  if (!selectedProduct) return null;

  const totalAmount = selectedProduct.price * quantity;
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', minimumFractionDigits: 0,
  }).format(totalAmount);

  return (
    <Drawer 
      anchor="bottom" 
      open={isModalOpen} 
      onClose={handleClose}
      PaperProps={{
        sx: { 
          borderTopLeftRadius: 24, borderTopRightRadius: 24,
          maxHeight: '92vh',
          maxWidth: 'sm',
          margin: '0 auto', 
          p: { xs: 2, sm: 3 },
          width: '100%',
          backgroundColor: '#FFFFFF'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Finalizar Compra</Typography>
        <IconButton onClick={handleClose} edge="end"><CloseIcon /></IconButton>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, p: 1.5, backgroundColor: 'background.default', borderRadius: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>Cantidad</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleDecrease} size="small" sx={{ backgroundColor: '#FFF', boxShadow: 1 }} disabled={quantity <= 1}>
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography sx={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{quantity}</Typography>
          <IconButton onClick={handleIncrease} size="small" sx={{ backgroundColor: '#FFF', boxShadow: 1 }}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{ p: 0.5, backgroundColor: '#E3F2FD', borderRadius: 2, color: 'primary.main' }}>
          <LocalShippingIcon fontSize="small" />
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Información de Envío</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
        <TextField fullWidth placeholder="Nombre Completo" variant="filled" size="small" InputProps={{ disableUnderline: true, sx: { borderRadius: 2, backgroundColor: '#FFF9C4' } }} />
        <TextField fullWidth placeholder="Dirección" variant="filled" size="small" InputProps={{ disableUnderline: true, sx: { borderRadius: 2, backgroundColor: '#FFF9C4' } }} />
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <TextField fullWidth placeholder="Ciudad" variant="filled" size="small" InputProps={{ disableUnderline: true, sx: { borderRadius: 2, backgroundColor: '#FFF9C4' } }} />
          <TextField fullWidth placeholder="Código Postal" variant="filled" size="small" InputProps={{ disableUnderline: true, sx: { borderRadius: 2, backgroundColor: '#FFF9C4' } }} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{ p: 0.5, backgroundColor: '#E8F5E9', borderRadius: 2, color: 'secondary.main' }}>
          <CreditCardIcon fontSize="small" />
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Método de Pago</Typography>
      </Box>

      <Box sx={{ 
        backgroundColor: '#0A58CA', 
        borderRadius: 4, 
        p: 2.5, 
        mb: 3,
        color: 'white',
        boxShadow: '0 4px 14px rgba(10, 88, 202, 0.4)'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, height: 25 }}>
          <ContactlessIcon sx={{ transform: 'rotate(90deg)', opacity: 0.8 }} />
          {renderBrandLogo()}
        </Box>

        <TextField 
          fullWidth 
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="0000 0000 0000 0000" 
          variant="standard" 
          InputProps={{ 
            disableUnderline: true,
            sx: { color: 'white', fontSize: '1.2rem', letterSpacing: 2, '&::placeholder': { color: 'rgba(255,255,255,0.6)', opacity: 1 } }
          }}
          sx={{ mb: 1, borderBottom: '1px solid rgba(255,255,255,0.3)' }}
        />
        <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.65rem' }}>NÚMERO DE TARJETA</Typography>

        <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
          <Box sx={{ flex: 1 }}>
            <TextField 
              fullWidth placeholder="MM/YY" variant="standard"
              InputProps={{ disableUnderline: true, sx: { color: 'white', fontSize: '0.9rem', '&::placeholder': { color: 'rgba(255,255,255,0.6)', opacity: 1 } } }}
              sx={{ borderBottom: '1px solid rgba(255,255,255,0.3)' }}
            />
            <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.65rem' }}>EXPIRA</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField 
              fullWidth placeholder="***" variant="standard" type="password"
              InputProps={{ disableUnderline: true, sx: { color: 'white', fontSize: '0.9rem', '&::placeholder': { color: 'rgba(255,255,255,0.6)', opacity: 1 } } }}
              sx={{ borderBottom: '1px solid rgba(255,255,255,0.3)' }}
            />
            <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.65rem' }}>CVC</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: 'background.default', borderRadius: 3, p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">Subtotal</Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>{formattedPrice}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Envío</Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: 'secondary.main' }}>GRATIS</Typography>
        </Box>
      </Box>

      <Button fullWidth variant="contained" size="large" sx={{ py: 1.5, fontWeight: 700, fontSize: '1.1rem' }}>
        Pagar {formattedPrice}
      </Button>
    </Drawer>
  );
};
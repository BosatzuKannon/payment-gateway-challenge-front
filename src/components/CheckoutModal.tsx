import { Box, Drawer, Typography, IconButton, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useAppDispatch, useAppSelector } from '../store';
import { closeCheckout, setQuantity, processTokenization } from '../store/slices/checkoutSlice';

// Importamos los componentes hijos extraídos
import { ShippingForm } from './ShippingForm';
import { CreditCardVisual } from './CreditCardVisual';

export const CheckoutModal = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, selectedProduct, quantity } = useAppSelector((state) => state.checkout);

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [cardBrand, setCardBrand] = useState<'visa' | 'mastercard' | ''>('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openToast, setOpenToast] = useState(false);

  const handleClose = () => dispatch(closeCheckout());
  const handleIncrease = () => dispatch(setQuantity(quantity + 1));
  const handleDecrease = () => dispatch(setQuantity(quantity - 1));

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.startsWith('4')) setCardBrand('visa');
    else if (value.match(/^5[1-5]/)) setCardBrand('mastercard');
    else setCardBrand('');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(value.substring(0, 19));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) value = value.substring(0, 2) + '/' + value.substring(2, 4);
    setExpiry(value.substring(0, 5));
  };

  const handleTokenizeCard = async () => {
    if (!fullName || !address || !cardNumber || expiry.length !== 5 || !cvc) {
      setErrorMessage('Por favor completa todos los campos.');
      setOpenToast(true);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const cleanCardNumber = cardNumber.replace(/\s/g, ''); 
      const [expMonth, expYearShort] = expiry.split('/');
      const expYear = expYearShort;

      const wompiResponse = await fetch('https://sandbox.wompi.co/v1/tokens/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer pub_test_Q5yDA9xoKdePzhSGeVe9HAez7HgGORGf'
        },
        body: JSON.stringify({ number: cleanCardNumber, cvc: cvc, exp_month: expMonth, exp_year: expYear, card_holder: fullName })
      });

      const data = await wompiResponse.json();

      if (!wompiResponse.ok) {
        let exactWompiError = 'Error al validar la tarjeta en Wompi';
        if (data.error && data.error.messages) {
          const errorKeys = Object.keys(data.error.messages);
          if (errorKeys.length > 0) exactWompiError = data.error.messages[errorKeys[0]][0]; 
        }
        throw new Error(exactWompiError);
      }

      dispatch(processTokenization({ token: data.data.id, delivery: { fullName, address, city, zipCode } }));

    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocurrió un error inesperado');
      }
      setOpenToast(true);
    } finally {
      setIsLoading(false);
    }
  }

  if (!selectedProduct) return null;

  const totalAmount = selectedProduct.price * quantity;
  const formattedPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(totalAmount);

  return (
    <Drawer 
      anchor="bottom" open={isModalOpen} onClose={handleClose}
      PaperProps={{ sx: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '92vh', maxWidth: 'sm', margin: '0 auto', p: { xs: 2, sm: 3 }, width: '100%', backgroundColor: '#FFFFFF' } }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Finalizar Compra</Typography>
        <IconButton onClick={handleClose} edge="end"><CloseIcon /></IconButton>
      </Box>

      {/* Cantidad */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, p: 1.5, backgroundColor: 'background.default', borderRadius: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>Cantidad</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleDecrease} size="small" sx={{ backgroundColor: '#FFF', boxShadow: 1 }} disabled={quantity <= 1}><RemoveIcon fontSize="small" /></IconButton>
          <Typography sx={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{quantity}</Typography>
          <IconButton onClick={handleIncrease} size="small" sx={{ backgroundColor: '#FFF', boxShadow: 1 }}><AddIcon fontSize="small" /></IconButton>
        </Box>
      </Box>

      {/* Envío */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{ p: 0.5, backgroundColor: '#E3F2FD', borderRadius: 2, color: 'primary.main' }}><LocalShippingIcon fontSize="small" /></Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Información de Envío</Typography>
      </Box>
      <ShippingForm fullName={fullName} setFullName={setFullName} address={address} setAddress={setAddress} city={city} setCity={setCity} zipCode={zipCode} setZipCode={setZipCode} />

      {/* Tarjeta */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{ p: 0.5, backgroundColor: '#E8F5E9', borderRadius: 2, color: 'secondary.main' }}><CreditCardIcon fontSize="small" /></Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Método de Pago</Typography>
      </Box>
      <CreditCardVisual cardNumber={cardNumber} handleCardNumberChange={handleCardNumberChange} expiry={expiry} handleExpiryChange={handleExpiryChange} cvc={cvc} setCvc={setCvc} cardBrand={cardBrand} />

      {/* Resumen Final */}
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

      <Button fullWidth variant="contained" size="large" onClick={handleTokenizeCard} disabled={isLoading} sx={{ py: 1.5, fontWeight: 700, fontSize: '1.1rem' }}>
        {isLoading ? <CircularProgress size={24} color="inherit" /> : `Continuar al pago`}
      </Button>

      <Snackbar open={openToast} autoHideDuration={4000} onClose={() => setOpenToast(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setOpenToast(false)} severity="error" variant="filled" sx={{ width: '100%', borderRadius: 2 }}>{errorMessage}</Alert>
      </Snackbar>
    </Drawer>
  );
};
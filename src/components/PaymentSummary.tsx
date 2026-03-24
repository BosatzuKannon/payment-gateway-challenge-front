import { Dialog, Box, Typography, Button, Divider, CircularProgress, Chip, Snackbar, Alert } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppSelector, useAppDispatch } from '../store';
import { closeCheckout } from '../store/slices/checkoutSlice';
import { useState } from 'react';

export const PaymentSummary = () => {
  const dispatch = useAppDispatch();
  const { isSummaryOpen, selectedProduct, quantity, wompiToken, delivery } = useAppSelector((state) => state.checkout);
  const [isProcessing, setIsProcessing] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!selectedProduct) return null;

  const subtotal = selectedProduct.price * quantity;
  const baseCommission = 10000; 
  const total = subtotal + baseCommission;

  const formatPrice = (price: number) => new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', minimumFractionDigits: 0,
  }).format(price);

  const handleCancel = () => {
    dispatch(closeCheckout()); 
  };

  const handleFinalPay = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedProduct.id,
          quantity: quantity,
          paymentToken: wompiToken,
          customerName: delivery.fullName,
          customerEmail: 'carlos.prueba@wompi.com',
          shippingAddress: delivery.address,
          shippingCity: delivery.city,
          shippingZipCode: delivery.zipCode
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al procesar el pago en el servidor');
      }

      setOrderId(data.id);
      setShowToast(true);

      setTimeout(() => {
        dispatch(closeCheckout());
        setShowToast(false);
      }, 4000);

    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error desconocido de comunicación');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
    <Dialog 
      open={isSummaryOpen} 
      onClose={isProcessing ? undefined : handleCancel} 
      PaperProps={{
        sx: { 
          borderRadius: 4, 
          p: { xs: 3, sm: 4 }, 
          maxWidth: 400, 
          width: '100%', 
          textAlign: 'center',
          borderBottom: '8px dotted #E0E0E0'
        }
      }}
    >
      <Box sx={{ backgroundColor: '#FFF59D', borderRadius: 3, p: 1.5, display: 'inline-flex', mx: 'auto', mb: 2 }}>
        <ReceiptLongIcon sx={{ color: '#000' }} />
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Resumen de Pago</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body1" color="text.secondary">Productos ({quantity})</Typography>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>{formatPrice(subtotal)}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body1" color="text.secondary">Comisión Base</Typography>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>{formatPrice(baseCommission)}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body1" color="text.secondary">Envío</Typography>
          <Chip label="GRATIS" size="small" sx={{ backgroundColor: '#69F0AE', fontWeight: 700, fontSize: '0.7rem' }} />
        </Box>
        <Typography variant="body1" sx={{ fontWeight: 700, color: 'success.main' }}>$0</Typography>
      </Box>

      <Divider sx={{ borderStyle: 'dashed', mb: 3 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>Total a pagar</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>{formatPrice(total)}</Typography>
      </Box>

      <Button 
        fullWidth 
        variant="contained" 
        size="large" 
        onClick={handleFinalPay}
        disabled={isProcessing}
        endIcon={!isProcessing && <ArrowForwardIcon />}
        sx={{ py: 1.5, fontWeight: 700, fontSize: '1.1rem', mb: 2, borderRadius: 2 }}
      >
        {isProcessing ? <CircularProgress size={24} color="inherit" /> : 'Pagar'}
      </Button>

      <Button 
        fullWidth 
        variant="text" 
        onClick={handleCancel}
        disabled={isProcessing}
        sx={{ color: 'text.secondary', fontWeight: 600 }}
      >
        Cancelar y volver
      </Button>

    </Dialog>
    <Snackbar 
      open={showToast} 
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="success" variant="filled" sx={{ width: '100%', borderRadius: 2 }}>
        ¡Pago exitoso! Orden: {orderId}
      </Alert>
    </Snackbar>
    </>
  );
};
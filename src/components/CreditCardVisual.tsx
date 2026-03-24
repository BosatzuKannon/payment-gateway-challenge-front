import { Box, Typography, TextField } from '@mui/material';
import ContactlessIcon from '@mui/icons-material/Contactless';

export const CreditCardVisual = ({ cardNumber, handleCardNumberChange, expiry, handleExpiryChange, cvc, setCvc, cardBrand }: any) => {
  const renderBrandLogo = () => {
    if (cardBrand === 'visa') return <Typography sx={{ fontStyle: 'italic', fontWeight: 900, fontSize: '1.4rem', color: '#FFF' }}>VISA</Typography>;
    if (cardBrand === 'mastercard') return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#EB001B', zIndex: 1 }} />
        <Box sx={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#F79E1B', ml: -1, zIndex: 2, opacity: 0.9 }} />
      </Box>
    );
    return <Box sx={{ width: 40, height: 25, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 1 }} />;
  };

  return (
    <Box sx={{ backgroundColor: '#0A58CA', borderRadius: 4, p: 2.5, mb: 3, color: 'white', boxShadow: '0 4px 14px rgba(10, 88, 202, 0.4)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, height: 25 }}>
        <ContactlessIcon sx={{ transform: 'rotate(90deg)', opacity: 0.8 }} />
        {renderBrandLogo()}
      </Box>
      <TextField 
        fullWidth value={cardNumber} onChange={handleCardNumberChange} placeholder="0000 0000 0000 0000" variant="standard" 
        InputProps={{ disableUnderline: true, sx: { color: 'white', fontSize: '1.2rem', letterSpacing: 2, '&::placeholder': { color: 'rgba(255,255,255,0.6)', opacity: 1 } } }} sx={{ mb: 1, borderBottom: '1px solid rgba(255,255,255,0.3)' }}
      />
      <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.65rem' }}>NÚMERO DE TARJETA</Typography>
      <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
        <Box sx={{ flex: 1 }}>
          <TextField 
            fullWidth placeholder="MM/YY" variant="standard" value={expiry} onChange={handleExpiryChange} 
            InputProps={{ disableUnderline: true, sx: { color: 'white', fontSize: '0.9rem', '&::placeholder': { color: 'rgba(255,255,255,0.6)', opacity: 1 } } }} sx={{ borderBottom: '1px solid rgba(255,255,255,0.3)' }}
          />
          <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.65rem' }}>EXPIRA</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField 
            fullWidth placeholder="***" variant="standard" type="password" value={cvc} onChange={(e) => setCvc(e.target.value)} 
            InputProps={{ disableUnderline: true, sx: { color: 'white', fontSize: '0.9rem', '&::placeholder': { color: 'rgba(255,255,255,0.6)', opacity: 1 } } }} sx={{ borderBottom: '1px solid rgba(255,255,255,0.3)' }}
          />
          <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.65rem' }}>CVC</Typography>
        </Box>
      </Box>
    </Box>
  );
};
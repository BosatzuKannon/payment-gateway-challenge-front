import { Box, TextField } from '@mui/material';

interface ShippingFormProps {
  fullName: string;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  zipCode: string;
  setZipCode: React.Dispatch<React.SetStateAction<string>>;
}

export const ShippingForm = ({ fullName, setFullName, address, setAddress, city, setCity, zipCode, setZipCode }: ShippingFormProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
    <TextField fullWidth placeholder="Nombre Completo" variant="filled" size="small" value={fullName} onChange={(e) => setFullName(e.target.value)} InputProps={{ disableUnderline: true, sx: { borderRadius: 2, backgroundColor: '#FFF9C4' } }} />
    <TextField fullWidth placeholder="Dirección" variant="filled" size="small" value={address} onChange={(e) => setAddress(e.target.value)} InputProps={{ disableUnderline: true, sx: { borderRadius: 2, backgroundColor: '#FFF9C4' } }} />
    <Box sx={{ display: 'flex', gap: 1.5 }}>
      <TextField fullWidth placeholder="Ciudad" variant="filled" size="small" value={city} onChange={(e) => setCity(e.target.value)} InputProps={{ disableUnderline: true, sx: { borderRadius: 2, backgroundColor: '#FFF9C4' } }} />
      <TextField fullWidth placeholder="Código Postal" variant="filled" size="small" value={zipCode} onChange={(e) => setZipCode(e.target.value)} InputProps={{ disableUnderline: true, sx: { borderRadius: 2, backgroundColor: '#FFF9C4' } }} />
    </Box>
  </Box>
);
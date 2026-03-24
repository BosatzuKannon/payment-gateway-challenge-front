import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Product } from './productSlice';

export interface DeliveryInfo {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
}

interface CheckoutState {
  isModalOpen: boolean;
  selectedProduct: Product | null;
  quantity: number;
  deliveryInfo: DeliveryInfo | null;
  wompiToken: string | null;
  isSummaryOpen: boolean;
  delivery: DeliveryInfo;
}

const initialState: CheckoutState = {
  isModalOpen: false,
  selectedProduct: null,
  quantity: 1,
  deliveryInfo: null,
  wompiToken: null,
  isSummaryOpen: false,
  delivery: {
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
  },
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    openCheckout: (state, action: PayloadAction<Product>) => {
      state.isModalOpen = true;
      state.selectedProduct = action.payload;
      state.quantity = 1;
      state.isSummaryOpen = false;
    },
    closeCheckout: (state) => {
      state.isModalOpen = false;
      state.isSummaryOpen = false;
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      const maxStock = state.selectedProduct?._stockQuantity ?? 0;
      if (action.payload >= 1 && state.selectedProduct && action.payload <= maxStock) {
        state.quantity = action.payload;
      }
    },
    processTokenization: (state, action: PayloadAction<{ token: string, delivery: DeliveryInfo }>) => {
      state.wompiToken = action.payload.token;
      state.delivery = action.payload.delivery;
      state.isModalOpen = false;
      state.isSummaryOpen = true;
    }
  },
});

export const { openCheckout, closeCheckout, setQuantity, processTokenization } = checkoutSlice.actions;
export default checkoutSlice.reducer;
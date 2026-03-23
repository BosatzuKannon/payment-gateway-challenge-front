import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Product } from './productSlice';

interface CheckoutState {
  isModalOpen: boolean;
  selectedProduct: Product | null;
  quantity: number;
}

const initialState: CheckoutState = {
  isModalOpen: false,
  selectedProduct: null,
  quantity: 1,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    openCheckout: (state, action: PayloadAction<Product>) => {
      state.isModalOpen = true;
      state.selectedProduct = action.payload;
      state.quantity = 1;
    },
    closeCheckout: (state) => {
      state.isModalOpen = false;
    },
    setQuantity: (state, action: PayloadAction<number>) => {
      const maxStock = state.selectedProduct?._stockQuantity ?? 0;
      
      if (action.payload >= 1 && state.selectedProduct && action.payload <= maxStock) {
        state.quantity = action.payload;
      }
    },
  },
});

export const { openCheckout, closeCheckout, setQuantity } = checkoutSlice.actions;
export default checkoutSlice.reducer;
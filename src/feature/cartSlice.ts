import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cartCnt: number;
}

const initialState: CartState = {
  cartCnt: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCnt: (state, action: PayloadAction<number>) => {
      state.cartCnt = action.payload;
    },
    increaseCnt: state => {
      state.cartCnt += 1;
    },
    decreaseCnt: state => {
      state.cartCnt -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCnt, increaseCnt, decreaseCnt } = cartSlice.actions;

export default cartSlice.reducer;

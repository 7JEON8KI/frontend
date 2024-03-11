import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RecentProductState {
  src: string;
  title: string;
  productId: number;
}

const initialState: RecentProductState = {
  src: "",
  title: "아직 둘러본 상품이 없습니다",
  productId: -1,
};

export const recentProductSlice = createSlice({
  name: "recent",
  initialState,
  reducers: {
    setRecent: (state, action: PayloadAction<RecentProductState>) => {
      state.src = action.payload.src;
      state.title = action.payload.title;
      state.productId = action.payload.productId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRecent } = recentProductSlice.actions;

export default recentProductSlice.reducer;

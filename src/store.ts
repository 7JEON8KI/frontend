import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "feature/login/cartSlice";
import loginReducer from "feature/login/loginSlice";

export const mealkeatStore = configureStore({
  reducer: {
    cart: cartReducer,
    auth: loginReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof mealkeatStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof mealkeatStore.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "feature/cartSlice";
import loginReducer from "feature/loginSlice";
import recentProductReducer from "feature/recentProductSlice";

export const mealkeatStore = configureStore({
  reducer: {
    cart: cartReducer,
    auth: loginReducer,
    recent: recentProductReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof mealkeatStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof mealkeatStore.dispatch;

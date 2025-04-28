import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Default storage for web (localStorage)
import { persistReducer, persistStore } from "redux-persist";
import userAccountReducer from "./features/user-account";
import quickViewReducer from "./features/quickView-slice";
import cartReducer from "./features/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import productDetailsReducer from "./features/product-details";
import productImagesReducer from "./features/product-images";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";

// Combine all reducers
const rootReducer = combineReducers({
  userAccountReducer,
  quickViewReducer,
  cartReducer,
  wishlistReducer,
  productDetailsReducer,
  productImagesReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userAccountReducer", "cartReducer", "wishlistReducer"], // Choose reducers to persist
};

// Wrap reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required to avoid serialization errors
    }),
});

// Persistor for persisting the store
export const persistor = persistStore(store);

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

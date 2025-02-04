import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import authSlice from "../redux/authSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user", "isAuthenticated"],
};

// Wrap the auth reducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

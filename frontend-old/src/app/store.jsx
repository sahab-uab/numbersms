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
import authReducer from "../slices/authSlices";
import creditReducer from "../slices/creditSlice";
import transactionSlice from "../slices/transationSlices";

import userSlice from "../slices/userSlices";
import userInfoSlice from "../slices/userInfoSlice";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user", "isAuthenticated"],
};

// Wrap the auth reducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  credit: creditReducer,
  transation: transactionSlice,
  users: userSlice,
  userInfo: userInfoSlice,
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

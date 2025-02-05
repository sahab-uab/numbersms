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
import allUserSlice from "../redux/getAllUserSlice";
import alltransationsSlice from "../redux/getAllTransation";
import userInfoSlice from "../redux/singleUserProfileSlice";
import creditSlice from "../redux/singleUserTransation";
import UserSmsSlice from "../redux/getUserSmsHistorySlice";
import allServiceSlice from "../redux/getServiceSlice";
import AdminMessageUsagesSlice from "../redux/adminMessageUsage";
import AdminBlanceSlice from "../redux/adminBlance";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user", "isAuthenticated"],
};

// Wrap the auth reducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  allUser: allUserSlice,
  transations: alltransationsSlice,
  userInfo: userInfoSlice,
  credit: creditSlice,
  smsHistory: UserSmsSlice,
  service: allServiceSlice,
  smsusagesdata: AdminMessageUsagesSlice,
  adminblance: AdminBlanceSlice
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

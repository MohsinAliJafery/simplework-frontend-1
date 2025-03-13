import { configureStore } from "@reduxjs/toolkit";
import gigreducer from "./Slices/gigslice";
import userReducer from "./Slices/userSlice"
import singlegigreducer from "./Slices/singlegigslice"
import allGigSlice from "./Slices/allGigSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage, 
};
persistReducer
const persistedReducer = persistReducer(persistConfig, allGigSlice);

const persistConfigGig = {
  key: "gig",
  storage,
};

const persistedGigReducer = persistReducer(persistConfigGig, gigreducer);

export const store = configureStore({
  reducer: {
    gig: persistedGigReducer,
    singlegig: singlegigreducer,
    user: userReducer,
    allGigs: persistedReducer
  },
});

export const persistor = persistStore(store);



import { configureStore } from "@reduxjs/toolkit";
 
import userSlice from "./slice/userSlice"
import convoSlice from "./slice/convoSlice"

import appApi from "./services/appApi"; 
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from './slice/authSlice'
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import loadingSlice from "./slice/loadingSlice";
 
 
 
const reducer = combineReducers({
    loading: loadingSlice,
    user: userSlice,
    conversations: convoSlice,
    auth: authReducer,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    blackList: [appApi.reducerPath, "products"],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware],
    devTools: true
});
setupListeners(store.dispatch)
export default store;
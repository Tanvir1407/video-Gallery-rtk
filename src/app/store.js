import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Features/Api/ApiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware:(getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware)
});

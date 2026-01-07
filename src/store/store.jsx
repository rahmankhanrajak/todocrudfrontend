import { configureStore } from "@reduxjs/toolkit";
import { todosApi } from "./todosApi";
import { authApi } from "./authApi";

export const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,    
    [authApi.reducerPath]: authApi.reducer,       
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(todosApi.middleware)                
      .concat(authApi.middleware),               
});
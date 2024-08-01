import { configureStore } from "@reduxjs/toolkit";

import { docsApi } from "./docsApi";
import { usersApi } from "./usersApi";
import { filesApi } from "./filesApi";

const store = configureStore({
  reducer: {
    [docsApi.reducerPath]: docsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(docsApi.middleware),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export default store;
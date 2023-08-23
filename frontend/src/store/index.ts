/** @format */


/** @format */

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { placeholderSelfApi } from "@redux-api/placeholderSelf";
import { placeholderApi } from "@redux-api/placeholder";
import placeholder from "@slices/placeholder";
/* Creating a store with the reducers and middleware. */
export const store = configureStore({
	reducer: {
		[placeholderApi.reducerPath]: placeholderApi.reducer,
		[placeholderSelfApi.reducerPath]: placeholderSelfApi.reducer,
		placeholder
	},
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat([
			placeholderApi.middleware,
			placeholderSelfApi.middleware,
		]),
});
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;


/** @format */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState,reducers } from "./reducers";

import { RootState } from "@redux/index";
import { consumeApi } from "@fetch/index";

export const consumePlaceholder = consumeApi("PlaceholderNormal");
export const { get, post, patch } = consumePlaceholder;
export const slice = createSlice({
	name:"placeholderReduxToolkit",
	initialState,
	reducers,
	extraReducers: (builder) => {
		//get method
		builder
			.addCase(get.rejected, (state) => {
				state.status = "fail";
				state.message =
					"Error al solicitar datos al servidor, intente nuevamente y verifique si tiene conexión";
			})
			.addCase(get.pending, (state) => {
				state.status = "loading";
			})
			.addCase(
				get.fulfilled,
				(
					state,
					{ payload: { status, url, message, data } }: PayloadAction<any>,
				) => {
					state.status = status;
					state.message = message;
					if (status.includes("success")) {
						switch (url) {
							case "posts":
								console.log(url);
								break;
							case "comments":
								console.log(url);
								break;
							case "albums":
								console.log(url);
								break;
							case "photos":
								console.log(url);
								break;
							case "todos":
								console.log(url);
								break;
							case "users":
								console.log(url);
								break;
						}
					}
				},
			);
	},
});
export const {
changeEmail,changeUsername,createState
} = slice.actions;
export const getPlaceholder = (state: RootState) => state.placeholder;
export default slice.reducer;
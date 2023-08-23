/** @format */

import { consume } from "./config";
import { IApi } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
const setConfig = ({ url, headers = {}, responseType = "json", auth, payload = {} }: IApi) => {
	if (url !== "auth/signin") {
        const token = true;
		if (token) {
			headers.Authorization = `Bearer `;
			headers.Protected = true;
		}
	}
	return { headers, responseType, url, auth, payload };
};
export const api = ({
	get: async (config: IApi) => {
		const { headers, responseType, url, auth } = setConfig(config);
		try {
			const response = await consume(responseType, headers, auth).get(url);
			return response;
		} catch (error: any) {
			return error;
		}
	},
	post: async (config: IApi) => {
		const { headers, responseType, url, auth, payload } = setConfig(config);
		try {
			const response = await consume(responseType, headers, auth).post(url, payload);
			return response;
		} catch (error: any) {
			return error;
		}
	},
	patch: async (config: IApi) => {
		const { headers, responseType, url, auth, payload } = setConfig(config);
		try {
			const response = await consume(responseType, headers, auth).patch(url, payload);
			return response;
		} catch (error: any) {
			return error;
		}
	},
	delete: async (config: IApi) => {
		const { headers, responseType, url, auth } = setConfig(config);
		try {
			const response = await consume(responseType, headers, auth).delete(url);
			return response;
		} catch (error: any) {
			return error;
		}
	},
});
export const consumeApi = (component: string) => ({
    get: createAsyncThunk(`${component}/get`, async (config: IApi, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.get(config);
            return fulfillWithValue(data);
        }
        catch (error: any) {
            console.error(error);
            return rejectWithValue(error?.response?.data);
        }
    }),
    post: createAsyncThunk(`${component}/post`, async (config: IApi, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.post(config);
            return fulfillWithValue(data);
        }
        catch (error: any) {
            console.error(error);
            return rejectWithValue(error?.response?.data);
        }
    }
    ),
    patch: createAsyncThunk(`${component}/patch`, async (config: IApi, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.patch(config);
            return fulfillWithValue(data);
        }
        catch (error: any) {
            console.error(error);
            return rejectWithValue(error?.response?.data);
        }
    }
    ),
    delete: createAsyncThunk(`${component}/delete`, async (config: IApi, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.delete(config);
            return fulfillWithValue(data);
        }
        catch (error: any) {
            console.error(error);
            return rejectWithValue(error?.response?.data);
        }
    }
    ),

})

export default api;
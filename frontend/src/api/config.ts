/** @format */

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";


const baseURL = "https://jsonplaceholder.typicode.com";
export const consume = (
	responseType: "blob" | "json" = "json",
	headers?: AxiosRequestConfig["headers"],
	auth?: AxiosRequestConfig["auth"],
): AxiosInstance => {
	const instance = axios.create({
		baseURL,
		responseType,
		timeout: 60000,
		headers: {
			Accept: `application/${responseType}`,
			Authorization: "",
			Protected: false,
			...(headers || {}),
		},
		auth,
	});
	return instance;
};
/** @format */

import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const currentEnv = import.meta.env.MODE;
// const devUrl = import.meta.env.VITE_API_URL_DEV;
// const prodUrl = import.meta.env.VITE_API_URL_PROD;
//export const baseUrl = currentEnv === "development" ? devUrl : prodUrl;
export const baseUrl="https://jsonplaceholder.typicode.com"
export const baseQuery = fetchBaseQuery({ baseUrl });
export default baseUrl;

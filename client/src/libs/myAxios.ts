import axios from "axios";

export const baseURL = "http://localhost:3200";

export const basicApi = axios.create({
    baseURL,
    withCredentials: true
})
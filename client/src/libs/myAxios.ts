import axios from "axios";

export const basicApi = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3200"
})
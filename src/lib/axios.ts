import axios from "axios"
// lets explain the api for the users and give a example of how to use it

/**
    * Axios instance with base URL and headers
    * @example
    * import api from "@/lib/axios";
    * 
    * const response = await api.get("/offers");
    * console.log(response.data);
*/
const api = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
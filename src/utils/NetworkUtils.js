import axios from "axios";

export const NetworkUtils = axios.create({
    baseURL: 'https://admin-api-kaderisasi-dev.salmanitb.com/',
}); 
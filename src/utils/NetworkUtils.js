import axios from "axios"

const NetworkUtils = axios.create({
  baseURL: process.env.REACT_APP_ADMIN_BACKEND_BASE_URL,
})

export default NetworkUtils

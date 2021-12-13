import axios from "axios"

const NetworkUtils = axios.create({
  baseURL: "https://admin-api-kaderisasi-dev.salmanitb.com/",
})

export default NetworkUtils

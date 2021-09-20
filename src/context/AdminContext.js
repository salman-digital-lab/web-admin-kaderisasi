import axios from "axios"
import React, { useState, createContext } from "react"

export const AdminContext = createContext()
/* eslint-disable */
const AdminProvider = (props) => {
  const [state, setState] = useState({
    openDrawer: false,
    anchorEl: null,
    mobileMoreAnchorEl: null,
  })
  const [filterUser, setFilterUser] = useState({
    filter: false,
    gender: "",
    search_query: "",
  })
  const [users, setUsers] = useState([])
  const [listUsers, setListUsers] = useState([])

  const getCookie = (name) => {
    const matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    )
    return matches ? decodeURIComponent(matches[1]) : undefined
  }

  const token = getCookie("token")

  const AxiosInterceptor = axios.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  /*
    Get all Users
  */
  const getUsers = async (params) => {
    setUsers({})
    let paramsQuery = "?"
    Object.keys(params).map((x, i) => {
      i === Object.keys(params).length - 1
        ? (paramsQuery += x + "=" + params[x].toString())
        : (paramsQuery += x + "=" + params[x].toString() + "&")
    })
    let result = null

    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/users` + paramsQuery)
      .then((res) => {
        result = res.data.data.data
        setListUsers(result)
        setUsers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /*
      @params
      id: integer
    
      Get User where id = params.id
    */
  const getUserDetail = async (id) => {
    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/users/${id}`)
      .then((res) => {
        const result = res.data.data
        setUsers(result)
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }

  const functions = {
    AxiosInterceptor,
    getUsers,
    getUserDetail,
  }

  return (
    <AdminContext.Provider
      value={{
        state,
        setState,
        token,
        users,
        listUsers,
        filterUser,
        setFilterUser,
        functions,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  )
}
export default AdminProvider

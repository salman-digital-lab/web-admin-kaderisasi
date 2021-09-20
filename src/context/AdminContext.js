import axios from "axios"
import React, { useState, createContext } from "react"
import Cookie from "js-cookie"

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
  const AxiosInterceptor = axios.interceptors.request.use((config) => {
    if (Cookie.get("token")){
      config.headers.Authorization = `Bearer ${Cookie.get("token")}`
      return config
    } else {
      window.location.href = "/login"
    }    
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

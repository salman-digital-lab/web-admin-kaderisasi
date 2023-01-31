import axios from "axios"
import React, { useState, createContext } from "react"
import Cookie from "js-cookie"

export const ProfileContext = createContext()
/* eslint-disable */
const ProfileProvider = (props) => {
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
  const [users, setUsers] = useState(null)
  const [listUsers, setListUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [isSubmitSucces, SetIsSubmitSuccess] = useState("")
  const AxiosInterceptor = axios.interceptors.request.use((config) => {
    if (Cookie.get("token")) {
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
    setLoading(true)
    let paramsQuery = "?"
    Object.keys(params).map((x, i) => {
      i === Object.keys(params).length - 1
        ? (paramsQuery += x + "=" + params[x].toString())
        : (paramsQuery += x + "=" + params[x].toString() + "&")
    })
    let result = null

    axios
      .get(
        process.env.REACT_APP_ADMIN_BACKEND_BASE_URL + `/v1/users` + paramsQuery
      )
      .then((res) => {
        result = res.data.data.data
        setListUsers(result)
        setUsers(res.data)
        setLoading(false)
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
    setLoading(true)
    axios
      .get(process.env.REACT_APP_ADMIN_BACKEND_BASE_URL + `/v1/users/${id}`)
      .then((res) => {
        const result = res.data.data
        setUsers(result)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }

  /*
    @params
    formData: object
  
    Create new user
  */
  const addUser = (formData) => {
    axios
      .post(
        process.env.REACT_APP_ADMIN_BACKEND_BASE_URL + `/v1/users`,
        formData
      )
      .then((res) => {
        const result = res.data.data
        window.location.href = `/user/${result.id}`
        setUsers(result)
      })
      .catch((err) => {
        console.log(err)
        SetIsSubmitSuccess("FAILED")
      })
  }

  /*
      @params
      id: integer
      formData: object
    
      Update user where id = params.id
    */
  const editUser = async (id, formData) => {
    axios
      .put(
        process.env.REACT_APP_ADMIN_BACKEND_BASE_URL + `/v1/users/${id}`,
        formData
      )
      .then((res) => {
        const result = res.data
        SetIsSubmitSuccess(result.status)
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }

  /*
      @params
      id: integer
    
      Delete user where id = params.id
    */
  const deleteUser = (id) => {
    axios
      .delete(process.env.REACT_APP_ADMIN_BACKEND_BASE_URL + `/v1/user/${id}`)
      .then((res) => {
        const result = res.data
        SetIsSubmitSuccess(result.status)
      })
      .catch((err) => console.log(err))
  }

  const functions = {
    AxiosInterceptor,
    getUsers,
    getUserDetail,
    addUser,
    editUser,
    deleteUser,
  }

  return (
    <ProfileContext.Provider
      value={{
        state,
        setState,
        users,
        listUsers,
        filterUser,
        setFilterUser,
        loading,
        isSubmitSucces,
        SetIsSubmitSuccess,
        functions,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  )
}
export default ProfileProvider

import React from "react"
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
import ServiceApi from "../utils/service"

export const AdminLoginContext = React.createContext()
/* eslint-disable */
export const AdminLoginProvider = (props) => {
  const [displayEror, setDisplayEror] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  })
  const history = useHistory()

  const HandleLogin = (email, password) => {
    ServiceApi.login({
      email,
      password,
    })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          console.log(res)
          const token = res.data.token.token
          const user = res.data.user
          Cookies.set("token", token, { expires: 1 })
          Cookies.set("user", user, { expires: 1 })
          Cookies.set("admin-cookies", { email, password }, { expires: 31 })
          setDisplayEror(false)
          setLoading(false)
          window.location.href = "/"
        } else {
          setDisplayEror(true)
          setLoading(false)
          setValues({ email: "", password: "", showPassword: false })
        }
      })
      .catch((err) => {
        console.log(err)
        setDisplayEror(true)
        setLoading(false)
        setValues({ email: "", password: "", showPassword: false })
      })
  }

  const functions = {
    HandleLogin,
  }

  return (
    <AdminLoginContext.Provider
      value={{
        displayEror,
        setDisplayEror,
        loading,
        setLoading,
        values,
        setValues,
        functions,
      }}
    >
      {props.children}
    </AdminLoginContext.Provider>
  )
}

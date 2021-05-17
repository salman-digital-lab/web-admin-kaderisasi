import React from 'react'

import axios from "axios";
import { useHistory } from 'react-router-dom';

export const AdminLoginContext = React.createContext()

export const AdminLoginProvider = (props) => {
    const [displayEror, setDisplayEror] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [values, setValues] = React.useState({
      email:'',
      password: '',
      showPassword: false,
    });
    let history = useHistory()

    const HandleLogin = (email, password) => {
        axios.post(`https://admin-api-kaderisasi-dev.salmanitb.com/v1/user/login`,{
            email: email,
            password: password
          })
          .then((res) => {
            console.log(res)
            let token = res.data.token.token
            document.cookie = `token=${token}; max-age=7200; path=/`;
            setValues({email:'',password: '',showPassword: false,})
            setDisplayEror(false)
            setLoading(false)
            history.push("/")
          })
          .catch((err)=>{
            console.log(err)
            setDisplayEror(true)
            setLoading(false)
            setValues({email:'',password: '',showPassword: false,})
          })
    }

    const functions = {
        HandleLogin
    }

  return (
    <AdminLoginContext.Provider value={{ displayEror, setDisplayEror, loading,setLoading,values,setValues, functions}}>
      {props.children}
    </AdminLoginContext.Provider>
  )
}
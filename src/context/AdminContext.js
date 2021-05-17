import axios from 'axios'
import React from 'react'


export const AdminContext = React.createContext()


export const AdminProvider = (props) => {
  const [state, setState] = React.useState({
    openDrawer: false,
    anchorEl: null,
    mobileMoreAnchorEl: null,
  })

  const getCookie = (name) =>  {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  let token = getCookie('token')

  
  const AxiosInterceptor =  axios.interceptors.request.use((config) => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const functions = {
    AxiosInterceptor
  }

  return (
    <AdminContext.Provider value={{ 
        state, 
        setState,
        token,
        functions
    }}>
      {props.children}
    </AdminContext.Provider>
  )
}
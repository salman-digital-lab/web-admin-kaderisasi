import React from 'react'


export const AdminContext = React.createContext()


export const AdminProvider = (props) => {
  const [state, setState] = React.useState({
    openDrawer: false,
    anchorEl: null,
    mobileMoreAnchorEl: null,
  })


  return (
    <AdminContext.Provider value={{ state, setState }}>
      {props.children}
    </AdminContext.Provider>
  )
}
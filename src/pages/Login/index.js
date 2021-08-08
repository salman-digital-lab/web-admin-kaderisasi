import React, { useEffect, useState } from "react"
import "../../assets/scss/Login.scss"
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined"
import { AdminLoginProvider } from "../../context/AdminLoginContext"
import CardLogin from "./CardLogin"
/* eslint-disable */
const Login = () => {
  const [display, setDisplay] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setDisplay(false)
    }, 3000)
  }, [display, setDisplay])

  return (
    <AdminLoginProvider>
      <div className="container-login">
        <div>
          <div className="headline-tittle-login">
            <DashboardOutlinedIcon className={"icon-login"} />
            <p>
              Welcome back!
              <br />
              <span>____</span>
            </p>
          </div>
          {display ? (
            false
          ) : (
            <>
              <CardLogin />
              <div className="bottom-login">
                <p>
                  Platfrom Aktivis Salman [BMKA] v1.0 2021-2022 © Aktivis
                  Mahasiswa Bidang Mahasiswa, Kaderisasi dan Alumni (BMKA)
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLoginProvider>
  )
}
export default Login

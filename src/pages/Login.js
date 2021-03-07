import React, { useEffect, useState } from "react"
import "../assets/scss/Login.scss"
import { CardLogin } from "../components/CardLogin"
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';

export const Login = () => {
  const [display, setDisplay] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setDisplay(false)
    }, 3000);
  },[display, setDisplay])

  return(
    <div className="container-login">
      <div>
        <div className="headline-tittle-login">
          <DashboardOutlinedIcon className={"icon-login"}/>
          <p>Welcome back!<br/><span>____</span></p>
        </div>
        {display ? false :(
          <>
            <CardLogin/>
            <div className="bottom-login">
                <p>Platfrom Aktivis Salman [BMKA] v1.0
                    2021-2022 © Aktivis Mahasiswa
                    Bidang Mahasiswa, Kaderisasi dan Alumni (BMKA)
                </p>
            </div>
          </>
          )}
      </div>
    </div>
  )
}
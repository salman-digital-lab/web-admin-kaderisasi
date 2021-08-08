import React from "react"
import "../../assets/scss/RegisterAkunAdmin.scss"
import CardRegisterAdmin from "./components/card-register-admin"

const RegisterAkunAdmin = () => (
  <div className="container-register-admin">
    <h1 style={{ color: "#999999" }}>Register Akun Admin</h1>
    <div className="content-register-admin">
      <CardRegisterAdmin />
    </div>
  </div>
)

export default RegisterAkunAdmin

import React from "react"
import "../../assets/scss/RegisterAdmin.scss"
import CardRegisterAdmin from "./components/CardRegisterAdmin"

const RegisterAdmin = () => (
  <div className="container-register-admin">
    <h1 style={{ color: "#999999" }}>Register Admin Account</h1>
    <div className="content-register-admin">
      <CardRegisterAdmin />
    </div>
  </div>
)

export default RegisterAdmin

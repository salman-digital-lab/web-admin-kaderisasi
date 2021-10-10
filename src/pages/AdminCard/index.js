import React from "react"
import { useParams } from "react-router-dom"
import "../../assets/scss/AdminCard.scss"
import Card from "./components/Card"

const AdminCard = () => {
  const { id } = useParams()
  return (
    <div className="container-register-admin">
      <h1 style={{ color: "#999999" }}>
        {id ? "Edit Admin Account" : "Register Admin Account"}
      </h1>
      <div className="content-register-admin">
        <Card id={id} />
      </div>
    </div>
  )
}

export default AdminCard

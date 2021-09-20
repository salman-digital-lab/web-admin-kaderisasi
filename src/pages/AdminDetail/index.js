import React from "react"
import "../../assets/scss/DetailAdmin.scss"
import DetailAdmin from "./components/AdminDetail"
import AdminProvider from "../../context/AdminContext"

const AdminSalmanDetail = () => (
  <AdminProvider>
    <div className="container-detail-admin">
      <DetailAdmin />
    </div>
  </AdminProvider>
)

export default AdminSalmanDetail

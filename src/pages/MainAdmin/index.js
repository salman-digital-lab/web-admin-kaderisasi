import React from "react"
import "../../assets/scss/Member.scss"
import AdminFilter from "./components/AdminFilter"
import AdminTable from "./components/AdminTable"
import AdminActivityProvider from "../../context/AdminActivityContext"

const AdminSalman = () => (
  <AdminActivityProvider>
    <div className="userlist">
      <div className="container">
        <h1
          style={{ color: "#25223C", fontWeight: "bold", marginBottom: "30px" }}
        >
          Admin
        </h1>
        <div className="flex-item">
          <AdminFilter />
        </div>
        <div className="flex-item">
          <AdminTable />
        </div>
      </div>
    </div>
  </AdminActivityProvider>
)

export default AdminSalman

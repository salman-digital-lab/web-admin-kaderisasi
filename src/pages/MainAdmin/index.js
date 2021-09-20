import React from "react"
import "../../assets/scss/Member.scss"
import AdminFilter from "./components/AdminFilter"
import AdminTable from "./components/AdminTable"
import AdminActivityProvider from "../../context/AdminActivityContext"

const AdminSalman = () => (
  <AdminActivityProvider>
    <div className="userlist">
      <div className="flex-container">
        <div className="flex-left">
          <AdminTable />
        </div>
        <div className="flex-right">
          <AdminFilter />
        </div>
      </div>
    </div>
  </AdminActivityProvider>
)

export default AdminSalman

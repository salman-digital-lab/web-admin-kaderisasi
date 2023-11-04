import React from "react"
import "../../assets/scss/Member.scss"
import AlumniFilter from "./components/AlumniFilter"
import AlumniTable from "./components/AlumniTable"
import AdminAlumniProvider from "../../context/AdminAlumniContext"

const AlumniSalman = () => (
  <AdminAlumniProvider>
    <div className="userlist">
      <div className="container">
        <h1
          style={{ color: "#25223C", fontWeight: "bold", marginBottom: "30px" }}
        >
          Admin
        </h1>
        <div className="flex-item">
          <AlumniFilter />
        </div>
        <div className="flex-item">
          <AlumniTable />
        </div>
      </div>
    </div>
  </AdminAlumniProvider>
)

export default AlumniSalman

import React from "react"
import "../../assets/scss/Member.scss"
import MemberFilter from "./components/MemberFilter"
import MemberTable from "./components/MemberTable"
import AdminMemberProvider from "../../context/AdminMemberContext"

const MemberSalman = () => (
  <AdminMemberProvider>
    <div className="userlist">
      <div className="container">
        <h1
          style={{ color: "#25223C", fontWeight: "bold", marginBottom: "30px" }}
        >
          Admin
        </h1>
        <div className="flex-item">
          <MemberFilter />
        </div>
        <div className="flex-item">
          <MemberTable />
        </div>
      </div>
    </div>
  </AdminMemberProvider>
)

export default MemberSalman

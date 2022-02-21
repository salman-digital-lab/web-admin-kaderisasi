import React from "react"
import "../../assets/scss/Member.scss"
import MemberFilter from "./components/MemberFilter"
import MemberTable from "./components/MemberTable"
import AdminMemberProvider from "../../context/AdminMemberContext"

const MemberSalman = () => (
  <AdminMemberProvider>
    <div className="userlist">
      <div className="container">
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

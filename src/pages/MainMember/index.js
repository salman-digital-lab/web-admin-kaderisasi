import React from "react"
import "../../assets/scss/Member.scss"
import MemberFilter from "./components/MemberFilter"
import MemberTable from "./components/MemberTable"
import AdminMemberProvider from "../../context/AdminMemberContext"

const MemberSalman = () => (
  <AdminMemberProvider>
    <div className="userlist">
      <div className="flex-container">
        <div className="flex-left">
          <MemberTable />
        </div>
        <div className="flex-right">
          <MemberFilter />
        </div>
      </div>
    </div>
  </AdminMemberProvider>
)

export default MemberSalman

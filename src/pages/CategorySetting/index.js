import React from "react"
import "../../assets/scss/Member.scss"
import CategoryTable from "./components/category-table"
import AdminActivityProvider from "../../context/AdminActivityContext"
/* eslint-disable */
const CategorySetting = () => {
  return (
    <AdminActivityProvider>
      <div className="userlist">
        <div className="flex-container">
          <CategoryTable />
        </div>
      </div>
    </AdminActivityProvider>
  )
}
export default CategorySetting

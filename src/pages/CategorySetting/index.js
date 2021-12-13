import React from "react"
import "../../assets/scss/Member.scss"
import CategoryTable from "./components/category-table"
import CategoryFilter from "./components/category-filter"
import AdminActivityProvider from "../../context/AdminActivityContext"
/* eslint-disable */
const CategorySetting = () => {
  return (
    <AdminActivityProvider>
      <div className="userlist">
        <div className="flex-container">
          <div className="flex-left">
            <CategoryTable />
          </div>
          <div className="flex-right">
            <CategoryFilter />
          </div>
        </div>
      </div>
    </AdminActivityProvider>
  )
}
export default CategorySetting

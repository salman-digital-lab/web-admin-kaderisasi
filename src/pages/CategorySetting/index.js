import React from "react"
import "../../assets/scss/Member.scss"
import CategoryTable from "./components/category-table"
import CategoryFilter from "./components/category-filter"
import AdminActivityProvider from "../../context/AdminActivityContext"
import { Stack } from "@mui/material"
/* eslint-disable */
const CategorySetting = () => {
  return (
    <AdminActivityProvider>
      <h1
        style={{ color: "#25223C", fontWeight: "bold", marginBottom: "30px" }}
      >
        Kegiatan dan Aktivitas
      </h1>
      <Stack direction="column" spacing={4}>
        <CategoryFilter />
        <CategoryTable />
      </Stack>
    </AdminActivityProvider>
  )
}
export default CategorySetting

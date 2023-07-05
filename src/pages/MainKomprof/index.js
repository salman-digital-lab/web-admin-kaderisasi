import React from "react"
import "../../assets/scss/Member.scss"
import AdminKomprofProvider from "../../context/AdminKomprofContext"
import { Stack } from "@mui/material"
import KomprofFilter from "./components/KomprofFilter"
import KomprofTable from "./components/KomprofTable"
/* eslint-disable */
const Komprof = () => {
  return (
    <AdminKomprofProvider>
      <h1
        style={{ color: "#25223C", fontWeight: "bold", marginBottom: "30px" }}
      >
        Komunitas Keprofesian
      </h1>
      <Stack direction="column" spacing={4}>
       <KomprofFilter/>
       <KomprofTable/>
      </Stack>
    </AdminKomprofProvider>
  )
}
export default Komprof

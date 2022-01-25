import React from "react"
import "../../assets/scss/Kegiatan.scss"
import KegiatanFilter from "./components/ActivityFilter"
import KegiatanTable from "./components/ActivityTable"
import AdminActivityProvider from "../../context/AdminActivityContext"
import { Stack } from "@mui/material"

export default function KegiatanDanAktivitas() {
  return (
    <AdminActivityProvider>
      <h1
        style={{ color: "#25223C", fontWeight: "bold", marginBottom: "30px" }}
      >
        Kegiatan dan Aktivitas
      </h1>
      <Stack direction="column" spacing={4}>
        <KegiatanFilter />
        <KegiatanTable />
      </Stack>
    </AdminActivityProvider>
  )
}

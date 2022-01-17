import React from "react"
import "../../assets/scss/Kegiatan.scss"
import KegiatanFilter from "./components/ActivityFilter"
import KegiatanTable from "./components/ActivityTable"
import AdminActivityProvider from "../../context/AdminActivityContext"
import { Box, Grid } from "@material-ui/core"

export default function KegiatanDanAktivitas() {
  return (
    <AdminActivityProvider>
      <h1 style={{ color: "#999999" }}>Kegiatan dan Aktivitas</h1>
      <Grid container spacing={4}>
        <Grid item xs>
          <Box component="div" marginBottom={5}>
            <KegiatanFilter />
          </Box>
        </Grid>
        <Grid item>
          <KegiatanTable />
        </Grid>
      </Grid>
    </AdminActivityProvider>
  )
}

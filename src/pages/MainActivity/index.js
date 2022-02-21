import React from "react"
import "../../assets/scss/Kegiatan.scss"
import KegiatanFilter from "./components/ActivityFilter"
import KegiatanTable from "./components/ActivityTable"
import AdminActivityProvider from "../../context/AdminActivityContext"

const KegiatanDanAktivis = () => (
  <AdminActivityProvider>
    <div className="container">
      <div className="flex-item">
        <KegiatanFilter />
      </div>
      <div className="flex-item">
        <KegiatanTable />
      </div>
    </div>
  </AdminActivityProvider>
)

export default KegiatanDanAktivis

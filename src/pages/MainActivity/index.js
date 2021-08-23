import React from "react"
import "../../assets/scss/Kegiatan.scss"
import KegiatanFilter from "./components/ActivityFilter"
import KegiatanTable from "./components/ActivityTable"
import AdminActivityProvider from "../../context/AdminActivityContext"

const KegiatanDanAktivis = () => (
  <AdminActivityProvider>
    <div className="kegiatan-list">
      <div className="flex-container">
        <div className="flex-left">
          <KegiatanTable />
        </div>
        <div className="flex-right">
          <KegiatanFilter />
        </div>
      </div>
    </div>
  </AdminActivityProvider>
)

export default KegiatanDanAktivis

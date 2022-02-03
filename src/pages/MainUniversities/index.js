import React from "react"
import "../../assets/scss/MainUniversities.scss"
import { UniversitasProvider } from "../../context/AdminUniversitasContext"
import UniversitiesFillter from "./components/UniversitiesFillter"
import UniversitiesTable from "./components/UniversitiesTable"
/* eslint-disable */
const MainUniversities = () => {
  return (
    <UniversitasProvider>
      <div className="kegiatan-list">
        <div className="flex-container">
          <div className="flex-left">
            <UniversitiesTable />
          </div>
          <div className="flex-right">
            <UniversitiesFillter />
          </div>
        </div>
      </div>
    </UniversitasProvider>
  )
}

export default MainUniversities

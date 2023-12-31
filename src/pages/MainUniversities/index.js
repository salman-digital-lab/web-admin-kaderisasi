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
        <div className="container">
          <h1
            style={{
              color: "#25223C",
              fontWeight: "bold",
              marginBottom: "30px",
            }}
          >
            Universitas
          </h1>
          <div className="flex-item">
            <UniversitiesFillter />
          </div>
          <div className="flex-item">
            <UniversitiesTable />
          </div>
        </div>
      </div>
    </UniversitasProvider>
  )
}

export default MainUniversities

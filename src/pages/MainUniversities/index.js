import { Button } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"
import "../../assets/scss/MainUniversities.scss"
import { UniversitasProvider } from "../../context/AdminUniversitasContext"
// import UniversitiesFillter from "./components/universities-fillter"
import UniversitiesTable from "./components/universities-table"
/* eslint-disable */
const MainUniversities = () => {
  return (
    <UniversitasProvider>
      <div className="container-list-admin">
        <h1 style={{ color: "#999999" }}>Perguruan Tinggi</h1>
        <Link to="/university/university-form">
          <Button
            variant="contained"
            color="primary"
            className="btn-tambah-akun-admin"
          >
            TAMBAH DATA UNIVERSITAS
          </Button>
        </Link>
        <div className="content-list-admin">
          {/* <UniversitiesFillter /> */}
          <UniversitiesTable />
        </div>
      </div>
    </UniversitasProvider>
  )
}

export default MainUniversities

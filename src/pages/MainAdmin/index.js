import { Button } from "@material-ui/core"
import React from "react"
import { Link } from "react-router-dom"
import "../../assets/scss/MainAdmin.scss"
import AdminTable from "./components/TableAdmin"

const MainAdmin = () => (
  <div className="container-list-admin">
    <h1 style={{ color: "#999999" }}>List Akun Admin</h1>
    <Link to="/RegisterAkunAdmin">
      <Button
        variant="contained"
        color="primary"
        className="btn-tambah-akun-admin"
      >
        TAMBAH AKUN ADMIN
      </Button>
    </Link>
    <div className="content-list-admin">
      <AdminTable />
    </div>
  </div>
)

export default MainAdmin

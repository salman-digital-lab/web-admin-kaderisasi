import React from "react"
import { CssBaseline } from "@material-ui/core/"
import Topbar from "./topbar"
import Sidebar from "./sidebar"
import Content from "./content"
/* eslint-disable */
const AdminNavigation = (props) => (
  <div style={{ display: "flex", backgroundColor: "#F3F9FE" }}>
    <CssBaseline />
    <Topbar />
    <Sidebar />
    <Content>{props.children}</Content>
  </div>
)

export default AdminNavigation

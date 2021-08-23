import React from "react"
import { CssBaseline } from "@material-ui/core/"
import Topbar from "./Topbar"
import Sidebar from "./Sidebar"
import Content from "./Content"
/* eslint-disable */
const AdminNavigation = (props) => (
  <div style={{ display: "flex" }}>
    <CssBaseline />
    <Topbar />
    <Sidebar />
    <Content>{props.children}</Content>
  </div>
)

export default AdminNavigation

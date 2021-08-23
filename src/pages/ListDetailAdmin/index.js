import React from "react"
import "../../assets/scss/ListDetailAdmin.scss"
import { IconButton } from "@material-ui/core"
import { AccountCircle } from "@material-ui/icons"
import DetailAdmin from "./components/detail-admin"
import data from "./data-admin.json"

const ListDetailAdmin = () => (
  <div className="container-detail-admin">
    <div className="left-detail-admin">
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
      >
        <AccountCircle fontSize="large" className="logo-detail-admin" />
      </IconButton>
      <p className="heading-admin">{data[0].username}</p>
      <p>Admin</p>
    </div>
    <div className="right-detail-admin">
      <DetailAdmin />
    </div>
  </div>
)

export default ListDetailAdmin

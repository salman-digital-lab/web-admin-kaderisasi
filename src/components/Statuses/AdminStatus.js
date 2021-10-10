import React from "react"
import { Chip } from "@material-ui/core"
/* eslint-disable */
export const AdminStatus = ({status}) => {
  switch (String(status)) {
    case "1":
      return <Chip className="success" label="active" />
    default:
      return <Chip label="inactive" />
  }
}

import React from "react"
import { Chip } from "@material-ui/core"
/* eslint-disable */
export const StudentCareStatus = (props) => {
  switch (props.status) {
    case "Belum Ditangani":
      return <Chip className="secondary" label={props.status} />
    case "Sedang Ditangani":
      return <Chip className="waiting" label={props.status} />
    case "Sudah Ditangani":
      return <Chip className="success" label={props.status} />
    default:
      return <Chip color="primary" label={props.status} />
  }
}

export const HandlingSCStatus = (props) => {
  switch (props.status) {
    case "Bertemu langsung":
      return <Chip className="secondary" label={props.status} />
    case "Online":
      return <Chip className="success" label={props.status} />
    default:
      return <Chip color="primary" label={props.status} />
  }
}

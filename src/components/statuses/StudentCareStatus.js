import React from "react"
import { Chip } from "@material-ui/core"
/* eslint-disable */
export const StudentCareStatus = (props) => {
  switch (props.status) {
    case "Belum Ditangani":
      return <Chip className="error" label={props.status?.toLowerCase()} />
    case "Sedang Ditangani":
      return <Chip className="waiting" label={props.status?.toLowerCase()} />
    case "Sudah Ditangani":
      return <Chip className="success" label={props.status?.toLowerCase()} />
    case "Gagal Ditangani":
      return <Chip className="secondary" label={props.status?.toLowerCase()} />
    default:
      return <Chip color="primary" label={props.status?.toLowerCase()} />
  }
}

export const HandlingSCStatus = (props) => {
  switch (props.status) {
    case "Bertemu langsung":
      return (
        <Chip
          className="secondary"
          label={props.status?.toLowerCase()}
          size="small"
        />
      )
    case "Online":
      return (
        <Chip
          className="success"
          label={props.status?.toLowerCase()}
          size="small"
        />
      )
    default:
      return (
        <Chip color="primary" label={props.status?.toLowerCase()} size="small" />
      )
  }
}

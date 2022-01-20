import React from "react"
import { Chip } from "@material-ui/core"
/* eslint-disable */
export const RegistrantStatus = (props) => {
  switch (props.status) {
    case "rejected":
      return (
        <Chip
          className="error"
          label={props.status.toLowerCase()}
          size="small"
        />
      )
    case "failed":
      return (
        <Chip
          className="secondary"
          label={props.status.toLowerCase()}
          size="small"
        />
      )
    case "registered":
      return (
        <Chip
          className="waiting"
          label={props.status.toLowerCase()}
          size="small"
        />
      )
    case "passed":
      return (
        <Chip
          className="success"
          label={props.status.toLowerCase()}
          size="small"
        />
      )
    default:
      return (
        <Chip color="primary" label={props.status.toLowerCase()} size="small" />
      )
  }
}

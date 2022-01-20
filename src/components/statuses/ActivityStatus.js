import React from "react"
import { Chip } from "@material-ui/core"

export const RegisterStatus = (props) => {
  switch (props.status) {
    case "closed":
      return (
        <Chip
          className="error"
          label={props.status.toLowerCase()}
          size="small"
        />
      )
    default:
      return (
        <Chip
          className="success"
          label={props.status.toLowerCase()}
          size="small"
        />
      )
  }
}

export const PublishStatus = (props) => {
  switch (props.status) {
    case "unpublished":
      return (
        <Chip
          className="waiting"
          label={props.status.toLowerCase()}
          size="small"
        />
      )
    default:
      return (
        <Chip
          className="success"
          label={props.status.toLowerCase()}
          size="small"
        />
      )
  }
}

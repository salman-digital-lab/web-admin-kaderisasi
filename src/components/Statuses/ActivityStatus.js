import React from "react"
import { Chip } from "@material-ui/core"
/* eslint-disable */
export const RegisterStatus = (props) => {
  switch (props.status) {
    case "closed":
      return <Chip className="error" label={props.status} />
    default:
      return <Chip color="primary" label={props.status} />
  }
}

export const PublishStatus = (props) => {
  switch (props.status) {
    case "unpublished":
      return <Chip className="waiting" label={props.status} />
    default:
      return <Chip className="success" label={props.status} />
  }
}

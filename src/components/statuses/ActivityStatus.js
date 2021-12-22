import React from "react"
import { Chip } from "@material-ui/core"

export const RegisterStatus = (props) => {
  switch (props.status) {
    case "closed":
      return <Chip className="error" label={props.status} />
    default:
      return <Chip className="primary" label={props.status} />
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

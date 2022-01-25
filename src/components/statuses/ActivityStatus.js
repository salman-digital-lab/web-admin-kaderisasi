import React from "react"
import { Chip } from "@mui/material"

export const RegisterStatus = (props) => {
  switch (props.status) {
    case "closed":
      return (
        <Chip
          className="error"
          label={props.status?.toLowerCase()}
          size="large"
          sx={{ borderRadius: "5px" }}
        />
      )
    default:
      return (
        <Chip
          className="success"
          label={props.status?.toLowerCase()}
          size="large"
          sx={{ borderRadius: "5px" }}
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
          label={props.status?.toLowerCase()}
          size="large"
          sx={{ borderRadius: "5px" }}
        />
      )
    default:
      return (
        <Chip
          className="success"
          label={props.status?.toLowerCase()}
          size="large"
          sx={{ borderRadius: "5px" }}
        />
      )
  }
}

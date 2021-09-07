import React from "react"
import { Box, IconButton } from "@material-ui/core"
import { AddCircleOutline } from "@material-ui/icons"
import { AdminQuestionnaireContext } from "../../../../../context/AdminQuestionnaireContext"

const buttonStyle = {
  center: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: "2em",
    color: "#a7acf9",
  },
}

export default function AddQuestionButton() {
  const { functions } = React.useContext(AdminQuestionnaireContext)
  const { handleAddNewForm } = functions
  return (
    <Box component="div" style={buttonStyle.center}>
      <Box component="span" onClick={handleAddNewForm}>
        <IconButton>
          <AddCircleOutline style={buttonStyle.icon} />
        </IconButton>
      </Box>
    </Box>
  )
}

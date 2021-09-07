import React from "react"
import { Box, Button } from "@material-ui/core"
import { useParams } from "react-router-dom"
import { AdminQuestionnaireContext } from "../../../../../context/AdminQuestionnaireContext"

export default function SaveButton() {
  const { id } = useParams()
  const { functions } = React.useContext(AdminQuestionnaireContext)
  const { updateQuestionnaire, handleSaveQuestionnaire } = functions

  return (
    <Box display="flex">
      <Box flexGrow={1} />
      <Button
        // onClick={() => updateQuestionnaire(id)}
        onClick={handleSaveQuestionnaire}
        variant="contained"
        color="primary"
        disableElevation
      >
        Save Question
      </Button>
    </Box>
  )
}

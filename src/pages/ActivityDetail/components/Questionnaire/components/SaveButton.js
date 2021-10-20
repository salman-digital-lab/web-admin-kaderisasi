import React from "react"
import { Box, Button } from "@material-ui/core"
import { useParams } from "react-router-dom"
import { AdminQuestionnaireContext } from "../../../../../context/AdminQuestionnaireContext"

export default function SaveButton() {
  const { id } = useParams()
  const { functions } = React.useContext(AdminQuestionnaireContext)
  // eslint-disable-next-line
  const { REQUEST_PUT_QUESTIONNAIRE, SAVE_QUESTIONNAIRE } = functions

  return (
    <Box display="flex">
      <Box flexGrow={1} />
      <Button
        onClick={() => {
          REQUEST_PUT_QUESTIONNAIRE({ id })
          // SAVE_QUESTIONNAIRE()
        }}
        variant="contained"
        color="primary"
        disableElevation
      >
        Save Question
      </Button>
    </Box>
  )
}

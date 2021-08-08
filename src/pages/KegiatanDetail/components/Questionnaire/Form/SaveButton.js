import React from "react"
import { Button } from "@material-ui/core"
import { useParams } from "react-router-dom"
import { AdminQuestionnaireContext } from "../../../../../context/AdminQuestionnaireContext"
export const SaveButton = () => {
  const params = useParams()
  const { functions } = React.useContext(AdminQuestionnaireContext)
  const { updateQuestionnaire } = functions
  const handleSave = () => {
    updateQuestionnaire(params.id)
  }
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1 }} />
      <Button
        // onClick={handleSave}
        variant="contained"
        color="primary"
        disableElevation
      >
        Save Question
      </Button>
    </div>
  )
}

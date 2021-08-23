import React from "react"
import { Button } from "@material-ui/core"
import { useHistory, useLocation, useParams } from "react-router-dom"
import { AdminQuestionnaireContext } from "../../../../../context/AdminQuestionnaireContext"
export const SaveAndBackButton = () => {
  let history = useHistory()
  const url = useLocation()
  const params = useParams()
  const { data, functions } = React.useContext(AdminQuestionnaireContext)
  const { createQuestionnaire, updateQuestionnaire } = functions
  const handleBackToMenu = () => history.goBack()
  const handleSave = () => {
    console.log(params.id, url.pathname, data)
    if (Boolean(url.pathname === "/new-questionnaire")) {
      createQuestionnaire()
    } else {
      updateQuestionnaire(params.id)
    }
  }
  return (
    <>
      <div
        style={{
          justifyContent: "flex-end",
          display: "flex",
        }}
      >
        <Button
          // onClick={handleSave}
          variant="contained"
          color="primary"
          disableElevation
        >
          Save Question
        </Button>
      </div>
    </>
  )
}

import React from "react"
import { Button } from "@material-ui/core"
import { useHistory, useLocation, useParams } from "react-router-dom"
import { AdminQuestionnaireContext } from "../../../context/AdminQuestionnaireContext"

const SaveAndBackButton = () => {
  const history = useHistory()
  const url = useLocation()
  const params = useParams()
  const { data, functions } = React.useContext(AdminQuestionnaireContext)
  const { createQuestionnaire, updateQuestionnaire } = functions
  const handleBackToMenu = () => history.push("/questionnaire")
  const handleSave = () => {
    console.log(params.id, url.pathname, data)
    if (url.pathname === "/new-questionnaire") {
      createQuestionnaire()
    } else {
      updateQuestionnaire(params.id)
    }
  }
  return (
    <>
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <Button
          onClick={handleBackToMenu}
          variant="contained"
          color="secondary"
          disableElevation
        >
          Back to Menu
        </Button>
        <Button
          onClick={handleSave}
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
export default SaveAndBackButton

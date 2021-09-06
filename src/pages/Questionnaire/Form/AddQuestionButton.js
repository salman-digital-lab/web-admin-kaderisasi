import React from "react"
import { IconButton } from "@material-ui/core"
import { AddCircleOutline } from "@material-ui/icons"
import { AdminQuestionnaireContext } from "../../../context/AdminQuestionnaireContext"
/* eslint-disable */
const AddQuestionButton = () => {
  const { functions } = React.useContext(AdminQuestionnaireContext)
  const { handleAddNewForm } = functions
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <span onClick={handleAddNewForm}>
          <IconButton>
            <AddCircleOutline
              style={{
                fontSize: "2em",
                color: "#a7acf9",
              }}
            />
          </IconButton>
        </span>
      </div>
    </>
  )
}
export default AddQuestionButton

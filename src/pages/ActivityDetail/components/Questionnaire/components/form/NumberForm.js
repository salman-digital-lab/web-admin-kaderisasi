import React from "react"
import PropTypes from "prop-types"
import { TextField, Grid } from "@material-ui/core"
import { AdminQuestionnaireContext } from "../../../../../../context/AdminQuestionnaireContext"

const componentStyle = {
  input: {
    marginBottom: "1.5em",
  },
}
export default function NumberForm({ id }) {
  const { functions } = React.useContext(AdminQuestionnaireContext)
  const {
    SET_QUESTIONNAIRE_FORM_QUESTION,
    ADD_QUESTIONNAIRE_REF,
    GET_QUESTIONNAIRE_FORM_QUESTION,
  } = functions

  return (
    <Grid item xs={12} sm={8}>
      <TextField
        onChange={(event) =>
          SET_QUESTIONNAIRE_FORM_QUESTION(id, event.target.value)
        }
        inputRef={ADD_QUESTIONNAIRE_REF}
        label="Question"
        variant="outlined"
        style={componentStyle.input}
        value={GET_QUESTIONNAIRE_FORM_QUESTION(id)}
        fullWidth
      />
    </Grid>
  )
}

NumberForm.propTypes = {
  id: PropTypes.number.isRequired,
}

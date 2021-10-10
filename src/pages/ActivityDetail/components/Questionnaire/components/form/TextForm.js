import React from "react"
import PropTypes from "prop-types"
import { TextField, Grid } from "@material-ui/core"
import { AdminQuestionnaireContext } from "../../../../../../context/AdminQuestionnaireContext"

const componentStyle = {
  input: {
    marginBottom: "1.5em",
  },
}
export default function TextForm(props) {
  const { functions } = React.useContext(AdminQuestionnaireContext)
  const {
    SET_QUESTIONNAIRE_FORM_QUESTION,
    ADD_QUESTIONNAIRE_REF,
    GET_QUESTIONNAIRE_FORM_QUESTION,
  } = functions
  const { id } = props

  return (
    <Grid item xs={12} sm={8}>
      {/* Question component */}
      <TextField
        onChange={(event) =>
          SET_QUESTIONNAIRE_FORM_QUESTION(id, event.target.value)
        }
        value={GET_QUESTIONNAIRE_FORM_QUESTION(id)}
        style={componentStyle.input}
        inputRef={ADD_QUESTIONNAIRE_REF}
        variant="outlined"
        label="Question"
        multiline
        fullWidth
      />
    </Grid>
  )
}

TextForm.propTypes = {
  id: PropTypes.number.isRequired,
}

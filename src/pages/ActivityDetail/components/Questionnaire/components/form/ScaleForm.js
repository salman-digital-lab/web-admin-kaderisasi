import React from "react"
import PropTypes from "prop-types"
import { TextField, Grid, Box } from "@material-ui/core"
import { AdminQuestionnaireContext } from "../../../../../../context/AdminQuestionnaireContext"

const componentStyle = {
  input: {
    marginBottom: "1.5em",
  },
}
export default function ScaleForm(props) {
  const { functions } = React.useContext(AdminQuestionnaireContext)
  const {
    ADD_QUESTIONNAIRE_REF,
    SET_QUESTIONNAIRE_FORM_QUESTION,
    SET_QUESTIONNAIRE_ANSWER_MIN_VALUE,
    SET_QUESTIONNAIRE_ANSWER_MAX_VALUE,
    GET_QUESTIONNAIRE_FORM_QUESTION,
    GET_QUESTIONNAIRE_ANSWER_MIN_VALUE,
    GET_QUESTIONNAIRE_ANSWER_MAX_VALUE,
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

      {/* Min value input component */}
      <Box component="div" display="flex">
        <TextField
          onChange={(event) =>
            SET_QUESTIONNAIRE_ANSWER_MIN_VALUE(id, event.target.value)
          }
          value={GET_QUESTIONNAIRE_ANSWER_MIN_VALUE(id)}
          style={componentStyle.input}
          inputRef={ADD_QUESTIONNAIRE_REF}
          label="Min Value"
          variant="outlined"
          type="number"
          fullWidth
        />
        <Box width="2em" />

        {/* Max value input component */}
        <TextField
          onChange={(event) =>
            SET_QUESTIONNAIRE_ANSWER_MAX_VALUE(id, event.target.value)
          }
          value={GET_QUESTIONNAIRE_ANSWER_MAX_VALUE(id)}
          style={componentStyle.input}
          inputRef={ADD_QUESTIONNAIRE_REF}
          label="Max Value"
          variant="outlined"
          type="number"
          fullWidth
        />
      </Box>
    </Grid>
  )
}

ScaleForm.propTypes = {
  id: PropTypes.number.isRequired,
}

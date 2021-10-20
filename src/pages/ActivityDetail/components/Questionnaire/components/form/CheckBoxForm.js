import React from "react"
import PropTypes from "prop-types"
import CloseIcon from "@material-ui/icons/Close"
import { TextField, Grid, IconButton, Typography, Box } from "@material-ui/core"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank"
import { AdminQuestionnaireContext } from "../../../../../../context/AdminQuestionnaireContext"

const componentStyle = {
  row: {
    display: "flex",
    alignItems: "center",
    marginTop: "1em",
    marginBottom: "1em",
  },
  text: {
    cursor: "pointer",
    color: "#2498c9",
    marginLeft: "1em",
  },
  icon: {
    color: "#cccccc",
  },
  answerInput: {
    marginLeft: "1em",
  },
  input: {
    marginBottom: "1.5em",
  },
}

export default function CheckBoxForm({ id }) {
  const { functions } = React.useContext(AdminQuestionnaireContext)
  const {
    SET_QUESTIONNAIRE_FORM_QUESTION,
    SET_QUESTIONNAIRE_ANSWER_STRING_VALUE,
    REMOVE_QUESTIONNAIRE_ANSWER_STRING_VALUE,
    ADD_QUESTIONNAIRE_ANSWER_STRING_VALUE,
    GET_QUESTIONNAIRE_FORM_QUESTION,
    GET_QUESTIONNAIRE_ANSWER_STRING_VALUE,
    ADD_QUESTIONNAIRE_REF,
  } = functions

  return (
    <Grid item xs={12} sm={8}>
      <TextField
        onChange={(event) =>
          SET_QUESTIONNAIRE_FORM_QUESTION(id, event.target.value)
        }
        value={GET_QUESTIONNAIRE_FORM_QUESTION(id)}
        inputRef={ADD_QUESTIONNAIRE_REF}
        label="Question"
        variant="outlined"
        multiline
        fullWidth
      />

      {GET_QUESTIONNAIRE_ANSWER_STRING_VALUE(id) &&
        GET_QUESTIONNAIRE_ANSWER_STRING_VALUE(id).map(({ label }, index) => (
          // eslint-disable-next-line
          <Box key={index} component="div" style={componentStyle.row}>
            <CheckBoxOutlineBlankIcon style={componentStyle.icon} />
            <TextField
              onChange={(event) =>
                SET_QUESTIONNAIRE_ANSWER_STRING_VALUE(
                  id,
                  index,
                  event.target.value
                )
              }
              style={componentStyle.answerInput}
              value={label}
              multiline
              fullWidth
            />
            <IconButton
              onClick={() =>
                REMOVE_QUESTIONNAIRE_ANSWER_STRING_VALUE(id, index)
              }
            >
              <CloseIcon style={componentStyle.icon} />
            </IconButton>
          </Box>
        ))}

      <Box style={componentStyle.row}>
        <CheckBoxOutlineBlankIcon style={componentStyle.icon} />
        <Typography
          onClick={() => ADD_QUESTIONNAIRE_ANSWER_STRING_VALUE(id)}
          style={componentStyle.text}
        >
          Tambahkan opsi
        </Typography>
      </Box>
    </Grid>
  )
}

CheckBoxForm.propTypes = {
  id: PropTypes.number.isRequired,
}

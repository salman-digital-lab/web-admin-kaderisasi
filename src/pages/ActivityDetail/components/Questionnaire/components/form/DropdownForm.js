import React from "react"
import PropTypes from "prop-types"
import { TextField, Grid, Typography, IconButton, Box } from "@material-ui/core"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import CloseIcon from "@material-ui/icons/Close"
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
}

export default function DropdownForm(props) {
  const { functions } = React.useContext(AdminQuestionnaireContext)
  const {
    SET_QUESTIONNAIRE_FORM_QUESTION,
    SET_QUESTIONNAIRE_ANSWER_STRING_VALUE,
    REMOVE_QUESTIONNAIRE_ANSWER_STRING_VALUE,
    ADD_QUESTIONNAIRE_ANSWER_STRING_VALUE,
    ADD_QUESTIONNAIRE_REF,
    GET_QUESTIONNAIRE_FORM_QUESTION,
    GET_QUESTIONNAIRE_ANSWER_STRING_VALUE,
  } = functions
  const { id } = props
  return (
    <>
      <Grid item xs={12} sm={8}>
        {/* Question component */}
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

        {/* Answer component */}
        {GET_QUESTIONNAIRE_ANSWER_STRING_VALUE(id) &&
          GET_QUESTIONNAIRE_ANSWER_STRING_VALUE(id).map(({ label }, index) => (
            // eslint-disable-next-line
            <Box component="div" key={index} style={componentStyle.row}>
              <ArrowDropDownIcon style={componentStyle.icon} />
              <TextField
                onChange={(event) =>
                  SET_QUESTIONNAIRE_ANSWER_STRING_VALUE(
                    id,
                    index,
                    event.target.value
                  )
                }
                style={componentStyle.answerInput}
                multiline
                fullWidth
                value={label}
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

        <Box component="div" style={componentStyle.row}>
          <ArrowDropDownIcon style={componentStyle.icon} />
          <Typography
            onClick={() => ADD_QUESTIONNAIRE_ANSWER_STRING_VALUE(id)}
            style={componentStyle.text}
          >
            Tambahkan opsi
          </Typography>
        </Box>
      </Grid>
    </>
  )
}

DropdownForm.propTypes = {
  id: PropTypes.number.isRequired,
}

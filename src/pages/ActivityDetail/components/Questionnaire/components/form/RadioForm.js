import React from "react"
import PropTypes from "prop-types"
import { TextField, Grid, Typography, IconButton, Box } from "@material-ui/core"
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked"
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

export default function RadioForm(props) {
  const { data, functions } = React.useContext(AdminQuestionnaireContext)
  const {
    handleChangeQuestionForm,
    handleChangeAnswerForm,
    handleDeleteAnswerForm,
    handleAddAnswerForm,
    handleAddRef,
  } = functions
  const { id } = props
  return (
    <>
      <Grid item xs={12} sm={8}>
        <TextField
          onChange={(event) => handleChangeQuestionForm(id, event.target.value)}
          value={data?.form[id]?.question && data.form[id].question}
          inputRef={handleAddRef}
          label="Question"
          variant="outlined"
          multiline
          fullWidth
        />
        {data?.form[id]?.answer &&
          data.form[id].answer.map((value, index) => (
            // eslint-disable-next-line
            <Box component="div" key={index} style={componentStyle.row}>
              <RadioButtonUncheckedIcon style={componentStyle.icon} />
              <TextField
                onChange={(event) =>
                  handleChangeAnswerForm(id, index, event.target.value)
                }
                style={componentStyle.answerInput}
                multiline
                fullWidth
                value={value}
              />
              <IconButton onClick={() => handleDeleteAnswerForm(id, index)}>
                <CloseIcon style={componentStyle.icon} />
              </IconButton>
            </Box>
          ))}

        <Box component="div" style={componentStyle.row}>
          <RadioButtonUncheckedIcon style={componentStyle.icon} />
          <Typography
            onClick={() => handleAddAnswerForm(id)}
            style={componentStyle.text}
          >
            Tambahkan opsi
          </Typography>
        </Box>
      </Grid>
    </>
  )
}

RadioForm.propTypes = {
  id: PropTypes.number.isRequired,
}

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
  const { data, functions } = React.useContext(AdminQuestionnaireContext)
  const {
    handleChangeQuestionForm,
    handleChangeAnswerForm,
    handleDeleteAnswerForm,
    handleAddAnswerForm,
    handleAddRef,
  } = functions

  return (
    <Grid item xs={12} sm={8}>
      <TextField
        onChange={(event) => handleChangeQuestionForm(id, event.target.value)}
        value={data.form[id].question}
        inputRef={handleAddRef}
        label="Question"
        variant="outlined"
        multiline
        fullWidth
      />

      {data.form[id].answer.map((value, index) => (
        <Box key={index} component="div" style={componentStyle.row}>
          <CheckBoxOutlineBlankIcon style={componentStyle.icon} />
          <TextField
            onChange={(event) =>
              handleChangeAnswerForm(id, index, event.target.value)
            }
            style={componentStyle.answerInput}
            value={value}
            multiline
            fullWidth
          />
          <IconButton onClick={() => handleDeleteAnswerForm(id, index)}>
            <CloseIcon style={componentStyle.icon} />
          </IconButton>
        </Box>
      ))}

      <Box style={componentStyle.row}>
        <CheckBoxOutlineBlankIcon style={componentStyle.icon} />
        <Typography
          onClick={() => handleAddAnswerForm(id)}
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

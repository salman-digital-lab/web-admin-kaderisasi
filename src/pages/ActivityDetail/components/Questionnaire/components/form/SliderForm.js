import React from "react"
import PropTypes from "prop-types"
import { TextField, Grid, Box } from "@material-ui/core"
import { AdminQuestionnaireContext } from "../../../../../../context/AdminQuestionnaireContext"

const componentStyle = {
  input: {
    marginBottom: "1.5em",
  },
}
export default function SliderForm(props) {
  const { data, functions } = React.useContext(AdminQuestionnaireContext)
  const {
    handleChangeQuestionForm,
    handleAddRef,
    handleChangeMinValueForm,
    handleChangeMaxValueForm,
  } = functions
  const { id } = props

  return (
    <Grid item xs={12} sm={8}>
      <TextField
        onChange={(event) => handleChangeQuestionForm(id, event.target.value)}
        value={data.form[id].question}
        style={componentStyle.input}
        inputRef={handleAddRef}
        variant="outlined"
        label="Question"
        multiline
        fullWidth
      />
      <Box component="div" display="flex">
        <TextField
          onChange={(event) => handleChangeMinValueForm(id, event.target.value)}
          value={data.form[id].minValue}
          style={componentStyle.input}
          inputRef={handleAddRef}
          label="Min Value"
          variant="outlined"
          type="number"
          fullWidth
        />
        <Box width="2em" />
        <TextField
          onChange={(event) => handleChangeMaxValueForm(id, event.target.value)}
          value={data.form[id].maxValue}
          style={componentStyle.input}
          inputRef={handleAddRef}
          label="Max Value"
          variant="outlined"
          type="number"
          fullWidth
        />
      </Box>
    </Grid>
  )
}

SliderForm.propTypes = {
  id: PropTypes.number.isRequired,
}

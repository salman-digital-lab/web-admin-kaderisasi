import React from "react"
import PropTypes from "prop-types"
import { TextField, Grid } from "@material-ui/core"
import { AdminQuestionnaireContext } from "../../../../../../context/AdminQuestionnaireContext"

const componentStyle = {
  input: {
    marginBottom: "1.5em",
  },
}
export default function ShortTextForm(props) {
  const { data, functions } = React.useContext(AdminQuestionnaireContext)
  const { handleChangeQuestionForm, handleAddRef } = functions
  const { id } = props

  return (
    <>
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
      </Grid>
    </>
  )
}

ShortTextForm.propTypes = {
  id: PropTypes.number.isRequired,
}

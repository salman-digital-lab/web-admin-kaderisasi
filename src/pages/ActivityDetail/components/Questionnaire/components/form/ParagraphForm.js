import React from "react"
import PropTypes from "prop-types"
import { TextField, Grid } from "@material-ui/core"
import { AdminQuestionnaireContext } from "../../../../../../context/AdminQuestionnaireContext"

const componentStyle = {
  input: {
    marginBottom: "1.5em",
  },
}
export default function ParagraphForm({ id }) {
  const { data, functions } = React.useContext(AdminQuestionnaireContext)
  const { handleChangeQuestionForm, handleAddRef } = functions

  return (
    <Grid item xs={12} sm={8}>
      <TextField
        onChange={(event) => handleChangeQuestionForm(id, event.target.value)}
        inputRef={handleAddRef}
        label="Question"
        variant="outlined"
        style={componentStyle.input}
        value={data?.form[id]?.question && data.form[id].question}
        multiline
        fullWidth
      />
    </Grid>
  )
}

ParagraphForm.propTypes = {
  id: PropTypes.number.isRequired,
}

import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { AdminQuestionnaireContext } from "../../../../../context/AdminQuestionnaireContext"
import { styled } from "./styled";
export const ShortTextForm = (props) => {
  const { data, functions } = React.useContext(AdminQuestionnaireContext);
  const { handleChangeQuestionForm, handleAddRef } = functions;
  const { id } = props;
  const classes = styled();
  return (
    <>
      <Grid item xs={12} sm={8}>
        <TextField
          inputRef={handleAddRef}
          className={classes.textField}
          label="Question"
          value={data.form[id].question}
          variant="filled"
          multiline
          onChange={(event) => handleChangeQuestionForm(id, event)}
          fullWidth
        />
      </Grid>
    </>
  );
};

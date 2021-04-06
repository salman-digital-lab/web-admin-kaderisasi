import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { AdminQuestionnaireContext } from "../../../context/AdminQuestionnaireContext";
import { styled } from "./styled";
export const ParagraphForm = (props) => {
  const { data, functions } = React.useContext(AdminQuestionnaireContext);
  const { handleChangeQuestionForm, handleAddRef } = functions;
  const { id } = props;
  const classes = styled();
  return (
    <>
      <Grid item xs={12} sm={8}>
        <TextField
          onChange={(event) => handleChangeQuestionForm(id, event)}
          inputRef={handleAddRef}
          className={classes.textField}
          label="Question"
          variant="filled"
          value={data.form[id].question}
          multiline
          fullWidth
        />
      </Grid>
    </>
  );
};

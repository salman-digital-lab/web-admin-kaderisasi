import React from "react";
import { TextField, Grid, Typography, IconButton } from "@material-ui/core";
import { AdminQuestionnaireContext } from "../../../context/AdminQuestionnaireContext";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CloseIcon from "@material-ui/icons/Close";
import { styled } from "./styled";
export const RadioForm = (props) => {
  const { data, functions } = React.useContext(AdminQuestionnaireContext);
  const {
    handleChangeQuestionForm,
    handleChangeAnswerForm,
    handleDeleteAnswerForm,
    handleAddAnswerForm,
    handleAddRef,
  } = functions;
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
          multiline
          value={data.form[id].question}
          fullWidth
        />
        {data.form[id].answer.map((value, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "2em",
            }}
          >
            <RadioButtonUncheckedIcon
              style={{ marginRight: "10px", color: "#cccccc" }}
            />
            <TextField
              onChange={(event) => handleChangeAnswerForm(id, index, event)}
              multiline
              fullWidth
              value={value}
            />
            <IconButton onClick={() => handleDeleteAnswerForm(id, index)}>
              <CloseIcon style={{ color: "#7d7d7d" }} />
            </IconButton>
          </div>
        ))}

        <div style={{ display: "flex", alignItems: "center" }}>
          <RadioButtonUncheckedIcon
            style={{ marginRight: "10px", color: "#cccccc" }}
          />
          <Typography
            onClick={() => handleAddAnswerForm(id)}
            style={{ cursor: "pointer", color: "#2498c9" }}
          >
            Tambahkan opsi
          </Typography>
        </div>
      </Grid>
    </>
  );
};

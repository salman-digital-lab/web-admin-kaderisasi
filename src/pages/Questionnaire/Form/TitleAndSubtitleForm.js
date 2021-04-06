import React from "react";
import { Card, CardContent, TextField } from "@material-ui/core";
import { AdminQuestionnaireContext } from "../../../context/AdminQuestionnaireContext";
import { styled } from "./styled";
export const TitleAndSubtitleForm = () => {
  const { data, functions } = React.useContext(AdminQuestionnaireContext);
  const { handleChangeTitleForm, handleChangeSubtitleForm } = functions;
  const classes = styled();
  return (
    <>
      <Card
        className={`${classes.titleCard} ${classes.card}`}
        variant="outlined"
      >
        <CardContent className={classes.cardContent}>
          <TextField
            className={classes.textField}
            InputProps={{
              classes: { input: classes.titleInput },
            }}
            value={data.title}
            onChange={handleChangeTitleForm}
            label="Title"
            fullWidth
          />
          <TextField
            className={classes.textField}
            InputProps={{
              classes: { input: classes.subTitleInput },
            }}
            value={data.subtitle}
            onChange={handleChangeSubtitleForm}
            label="Sub title"
            fullWidth
          />
        </CardContent>
      </Card>
    </>
  );
};

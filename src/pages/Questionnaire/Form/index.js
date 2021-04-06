import React from "react";
import { Grid } from "@material-ui/core";
import { QuestionNavigator } from "./QuestionNavigator";
import { SaveAndBackButton } from "./SaveAndBackButton";
import { TitleAndSubtitleForm } from "./TitleAndSubtitleForm";
import { AddQuestionButton } from "./AddQuestionButton";
import { AdminQuestionnaireProvider } from "../../../context/AdminQuestionnaireContext";
import { Form } from "./Form";
export const QuestionnaireForm = () => {
  return (
    <AdminQuestionnaireProvider>
      <h1 style={{ color: "#999999" }}>New Questionnaire</h1>
      <br />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <SaveAndBackButton />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={9}
          style={{
            height: "100vh",
            overflow: "auto",
          }}
        >
          <TitleAndSubtitleForm />
          <Form />
          <AddQuestionButton />
        </Grid>
        <Grid item md={3}>
          <QuestionNavigator />
        </Grid>
      </Grid>
    </AdminQuestionnaireProvider>
  );
};

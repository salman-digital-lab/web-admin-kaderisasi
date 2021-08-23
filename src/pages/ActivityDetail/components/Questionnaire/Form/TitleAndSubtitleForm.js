import React from "react"
import { Card, CardContent, TextField } from "@material-ui/core"
import { AdminQuestionnaireContext } from "../../../../../context/AdminQuestionnaireContext"
import styled from "./styled"
export const TitleAndSubtitleForm = () => {
  const { data, functions } = React.useContext(AdminQuestionnaireContext)
  const { handleChangeTitleForm, handleChangeSubtitleForm } = functions
  const classes = styled()
  return (
    <>
      <Card
        className={`${classes.titleCard} ${classes.card}`}
        variant="outlined"
      >
        <CardContent className={classes.cardContent}>
          <TextField
            className={classes.textField}
            value={data.title}
            onChange={handleChangeTitleForm}
            label="Title"
            fullWidth
            multiline
          />
          <TextField
            className={classes.textField}
            value={data.subtitle}
            onChange={handleChangeSubtitleForm}
            label="Subtitle"
            fullWidth
            multiline
          />
        </CardContent>
      </Card>
    </>
  )
}

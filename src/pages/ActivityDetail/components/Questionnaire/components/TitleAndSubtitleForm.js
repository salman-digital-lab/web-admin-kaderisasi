import React from "react"
import { Card, CardContent, TextField } from "@material-ui/core"
import { AdminQuestionnaireContext } from "../../../../../context/AdminQuestionnaireContext"

export default function TitleAndSubtitleForm() {
  const { data, functions } = React.useContext(AdminQuestionnaireContext)
  const { handleChangeTitleForm, handleChangeSubtitleForm } = functions

  const componentStyle = {
    input: {
      marginBottom: "1.5em",
    },
    card: {
      marginBottom: "2em",
    },
    cardContent: {
      paddingBottom: "1em",
      "&:lastChild": {
        paddingBottom: "1em",
      },
    },
    titleCard: {
      minWidth: 275,
      padding: "0 1em",
    },
  }

  return (
    <Card
      style={{ ...componentStyle.card, ...componentStyle.titleCard }}
      variant="outlined"
    >
      <CardContent style={componentStyle.cardContent}>
        <TextField
          onChange={(event) => handleChangeTitleForm(event.target.value)}
          style={componentStyle.input}
          value={data.title}
          variant="outlined"
          label="Title"
          fullWidth
          multiline
        />
        <TextField
          onChange={(event) => handleChangeSubtitleForm(event.target.value)}
          style={componentStyle.input}
          value={data.subtitle}
          variant="outlined"
          label="Subtitle"
          fullWidth
          multiline
        />
      </CardContent>
    </Card>
  )
}

import React from "react"
import { Card, CardContent, TextField } from "@material-ui/core"
import { AdminQuestionnaireContext } from "../../../../../context/AdminQuestionnaireContext"

export default function TitleAndSubtitleForm() {
  const { functions } = React.useContext(AdminQuestionnaireContext)
  const {
    SET_QUESTIONNAIRE_FORM_TITLE,
    SET_QUESTIONNAIRE_FORM_SUBTITLE,
    GET_QUESTIONNAIRE_FORM_TITLE,
    GET_QUESTIONNAIRE_FORM_SUBTITLE,
  } = functions

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
          onChange={(event) => SET_QUESTIONNAIRE_FORM_TITLE(event.target.value)}
          style={componentStyle.input}
          value={GET_QUESTIONNAIRE_FORM_TITLE()}
          variant="outlined"
          label="Title"
          fullWidth
          multiline
        />
        <TextField
          onChange={(event) =>
            SET_QUESTIONNAIRE_FORM_SUBTITLE(event.target.value)
          }
          style={componentStyle.input}
          value={GET_QUESTIONNAIRE_FORM_SUBTITLE()}
          variant="outlined"
          label="Subtitle"
          fullWidth
          multiline
        />
      </CardContent>
    </Card>
  )
}

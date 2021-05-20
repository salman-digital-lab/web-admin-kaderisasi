import React, { useEffect, useContext, useState } from "react"
import { useLocation, useParams } from 'react-router-dom'
import { Grid } from "@material-ui/core"
import { QuestionNavigator } from "./QuestionNavigator"
import { SaveAndBackButton } from "./SaveAndBackButton"
import { TitleAndSubtitleForm } from "./TitleAndSubtitleForm"
import { AddQuestionButton } from "./AddQuestionButton"
import { AdminQuestionnaireContext } from "../../../context/AdminQuestionnaireContext"
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { Form } from "./Form"


const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}


export const QuestionnaireFormChild = () => {
  const url = useLocation()
  const params = useParams()
  const { openSnackbar, functions } = useContext(AdminQuestionnaireContext)
  const [unlockForm, setUnlockForm] = useState(false)
  const [reload, setReload] = useState(true)
  const { getQuestionnaire, handleSnackbar } = functions


  useEffect(() => {
    if (reload) {
      if (Boolean(url.pathname === '/new-questionnaire')) {
        setUnlockForm(true)
        setReload(false)
      }
      if (Boolean(params.id)) {
        getQuestionnaire(params.id, () => {
          setUnlockForm(true)
        })
        setReload(false)
      }
    }
  }, [getQuestionnaire, params, reload, url])

  return (
    <>
      {!unlockForm && <h1 style={{ color: "#999999" }}>Loading... please wait</h1>}
      {unlockForm &&
        <>
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
          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            onClose={handleSnackbar}
          >
            <Alert severity="success" onClose={handleSnackbar}>
              Questionnaire berhasil disave
                </Alert>
          </Snackbar>
        </>
      }
    </>
  )
}

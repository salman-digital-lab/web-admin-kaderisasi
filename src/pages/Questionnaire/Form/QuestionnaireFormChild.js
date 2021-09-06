import React, { useEffect, useContext, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Grid } from "@material-ui/core"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import QuestionNavigator from "./QuestionNavigator"
import SaveAndBackButton from "./SaveAndBackButton"
import TitleAndSubtitleForm from "./TitleAndSubtitleForm"
import AddQuestionButton from "./AddQuestionButton"
import { AdminQuestionnaireContext } from "../../../context/AdminQuestionnaireContext"
import Form from "./Form"
/* eslint-disable */
const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />

const QuestionnaireFormChild = () => {
  const url = useLocation()
  const params = useParams()
  const { openSnackbar, functions } = useContext(AdminQuestionnaireContext)
  const [unlockForm, setUnlockForm] = useState(false)
  const [reload, setReload] = useState(true)
  const { getQuestionnaire, handleSnackbar } = functions

  useEffect(() => {
    if (reload) {
      if (url.pathname === "/new-questionnaire") {
        setUnlockForm(true)
        setReload(false)
      }
      if (params.id) {
        getQuestionnaire(params.id, () => {
          setUnlockForm(true)
        })
        setReload(false)
      }
    }
  }, [getQuestionnaire, params, reload, url])

  return (
    <>
      {!unlockForm && (
        <h1 style={{ color: "#999999" }}>Loading... please wait</h1>
      )}
      {unlockForm && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <SaveAndBackButton />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              md={10}
              style={{
                height: "100vh",
                overflow: "auto",
              }}
            >
              <TitleAndSubtitleForm />
              <Form />
              <AddQuestionButton />
            </Grid>
            <Grid item md={2}>
              <QuestionNavigator />
            </Grid>
          </Grid>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            onClose={handleSnackbar}
          >
            <Alert severity="success" onClose={handleSnackbar}>
              Questionnaire berhasil disave
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  )
}
export default QuestionnaireFormChild

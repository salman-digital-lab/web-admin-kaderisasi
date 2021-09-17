import React, { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { Grid, Box } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import axios from "axios"
import {
  TitleAndSubtitleForm,
  AddQuestionButton,
  FormSelector,
  SaveButton,
  QuestionNavigator,
} from "./components"
import AdminQuestionnaireProvider, {
  AdminQuestionnaireContext,
} from "../../../../context/AdminQuestionnaireContext"
// eslint-disable-next-line
const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />

const SkeletonLoading = () => (
  <Box component="div">
    <Box width="75%">
      <Skeleton />
    </Box>
    <Box width="70%">
      <Skeleton animation={false} />
    </Box>
    <Box width="65%">
      <Skeleton animation="wave" />
    </Box>
  </Box>
)

const QuestionnaireForm = () => {
  const { id } = useParams()
  const { openSnackbar, functions, data, setData } = useContext(
    AdminQuestionnaireContext
  )
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(true)
  const { handleSnackbar, handleResetStateDefault } = functions

  useEffect(() => {
    if (reload) {
      setReload(false)
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/v1/activity/${id}`)
        .then((res) => {
          if (res.status === 200) {
            const form = JSON.parse(res.data.data[0].form_data) ?? null
            if (
              Object.prototype.hasOwnProperty.call(form, "title") &&
              Object.prototype.hasOwnProperty.call(form, "subtitle") &&
              Object.prototype.hasOwnProperty.call(form, "form")
            ) {
              setData(form)
            } else {
              handleResetStateDefault()
            }
            setLoading(false)
          }
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error(err);
        })
    }
    // eslint-disable-next-line
  }, [id, reload, data, setData])

  return (
    <>
      {loading && <SkeletonLoading />}
      {!loading && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <SaveButton />
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
              {data?.form &&
                data.form.map((value, index) => (
                  // eslint-disable-next-line
                  <FormSelector id={index} key={index} variant={value.variant} />
                ))}
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

export default function Questionnaire() {
  return (
    <AdminQuestionnaireProvider>
      <QuestionnaireForm />
    </AdminQuestionnaireProvider>
  )
}

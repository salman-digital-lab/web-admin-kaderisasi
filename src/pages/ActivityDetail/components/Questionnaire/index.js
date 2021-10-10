import React, { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { Grid, Box, Avatar } from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
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
  const {
    openQuestionnaireSuccesSnackbar,
    functions,
    data,
    setData,
    questionnaireLoading,
  } = useContext(AdminQuestionnaireContext)
  const [reload, setReload] = useState(true)
  const { TOGGLE_QUESTIONNAIRE_SNACKBAR, REQUEST_GET_QUESTIONNAIRE } = functions

  useEffect(() => {
    if (reload) {
      setReload(false)
      REQUEST_GET_QUESTIONNAIRE({ id })
    }
    // eslint-disable-next-line
  }, [id, reload, data, setData])

  return (
    <>
      {questionnaireLoading && <SkeletonLoading />}
      {!questionnaireLoading && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <SaveButton />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={3}>
            <Grid item xs>
              <TitleAndSubtitleForm />
              {data?.form &&
                data.form.map(({ type }, index) => (
                  // eslint-disable-next-line
                  <Box key={index}>
                    <Box component="div">
                      <Avatar style={{ backgroundColor: "#1ed66b" }}>
                        {index + 1}
                      </Avatar>
                    </Box>
                    <br />
                    <FormSelector id={index} type={type} />
                  </Box>
                ))}
              <AddQuestionButton />
            </Grid>
            {/* <Grid item md={2}>
              <QuestionNavigator />
            </Grid> */}
          </Grid>
          <Snackbar
            open={openQuestionnaireSuccesSnackbar}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            onClose={TOGGLE_QUESTIONNAIRE_SNACKBAR}
          >
            <Alert severity="success" onClose={TOGGLE_QUESTIONNAIRE_SNACKBAR}>
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

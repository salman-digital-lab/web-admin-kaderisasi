import React, { useEffect, useContext, useState } from "react"
import { useParams } from 'react-router-dom'
import { Grid, Box } from "@material-ui/core"
import { QuestionNavigator } from "./QuestionNavigator"
import { SaveAndBackButton } from "./SaveAndBackButton"
import { TitleAndSubtitleForm } from "./TitleAndSubtitleForm"
import { AddQuestionButton } from "./AddQuestionButton"
import Skeleton from '@material-ui/lab/Skeleton'
import { AdminQuestionnaireContext } from "../../../../../context/AdminQuestionnaireContext"
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { Form } from "./Form"
import axios from 'axios'


const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}


export const QuestionnaireFormChild = () => {
  const { id } = useParams()
  const { openSnackbar, functions, data, setData } = useContext(AdminQuestionnaireContext)
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(true)
  const { handleSnackbar } = functions


  useEffect(() => {
    if (reload) {
      setReload(false)
      console.log('load')
      axios
        .get(process.env.REACT_APP_BASE_URL + `/v1/activity/${id}`)
        .then((res) => {
          const form = JSON.parse(res.data.data[0].form_data) ?? null
          console.log(form)
          setLoading(false)
          if (Boolean(form)) {
            setData(form)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, reload, data, setData])

  return (
    <>
      {loading && (
        <React.Fragment>
          <div>
            <Box width='75%'>
              <Skeleton />
            </Box>
            <Box width='70%'>
              <Skeleton animation={false} />
            </Box>
            <Box width='65%'>
              <Skeleton animation="wave" />
            </Box>
          </div>
        </React.Fragment>
      )}
      {!loading &&
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

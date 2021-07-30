import React, { useEffect, useState } from 'react'
import { Button, Box } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { useHistory, useParams } from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton'
import axios from 'axios'
import { QuestionnaireForm } from '../Questionnaire/Form/'


export const QuestionnaireChild = () => {
    const [loading, setLoading] = useState(true)
    let history = useHistory()
    let { id } = useParams()
    const [isCreate, setCreate] = React.useState(true)

    const handleClickNewQuestion = () => history.push('/questionnaire/' + id)


    useEffect(() => {
        axios
            .get(process.env.REACT_APP_BASE_URL + `/v1/activity/${id}`)
            .then((res) => {
                const form = res.data.data[0].form_data ?? null
                if (Boolean(form)) {
                    setCreate(false)
                    setLoading(false)
                }
                else {
                    setLoading(false)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    })


    return (
        <React.Fragment>
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
            {!loading && !isCreate && (
                <React.Fragment>
                    <QuestionnaireForm />
                </React.Fragment>
            )}
            {!loading && isCreate && (
                <React.Fragment>
                    <h1 style={{ color: '#999999' }}>Ups this activity have no questionnaire, please create one</h1>
                    <Button
                        variant="contained"
                        color='primary'
                        disableElevation
                        startIcon={<AddCircleIcon />}
                        onClick={handleClickNewQuestion}
                    >
                        Create
                    </Button>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}
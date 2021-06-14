import React, { useEffect, useContext } from 'react'
import { Box } from "@material-ui/core"
import Pagination from '@material-ui/lab/Pagination'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { Button } from '@material-ui/core'
import { AdminQuestionnaireContext } from '../../context/AdminQuestionnaireContext'
import { QuestionCard } from './QuestionCard'
import { DeleteDialogQuestionnaire } from './Dialog/DeleteDialogQuestionnaire'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { useHistory } from 'react-router-dom'



const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}


export const QuestionnaireChild = () => {
    const [page, setPage] = React.useState(1)
    const [data, setData] = React.useState(null)
    const maxPerPage = window.innerWidth < 1360 ? 6 : 8;
    const [dataPerPage, setDataPerPage] = React.useState(null)
    const { reload, setReload, openDeleteDialog, openSnackbar, functions } = useContext(AdminQuestionnaireContext)
    const { getAllQuestionnaire, handleOpenDeleteDialog, handleSnackbar } = functions
    const handleClickNewQuestion = () => history.push('/new-questionnaire')
    let history = useHistory()


    const handlePageChange = (event, newPage) => {
        setPage(newPage)
        setDataPerPage(data.slice((newPage - 1) * maxPerPage, (newPage * maxPerPage)))
    }


    useEffect(() => {
        if (reload) {
            getAllQuestionnaire((res) => {
                console.log(res.data.data)
                setData(res.data.data)
                setDataPerPage(res.data.data.slice(0, maxPerPage))
            })
            setReload(false)
        }
    })


    return (
        <>
            <div style={{ display: 'flex' }}>
                <h1 style={{ color: '#999999' }}>Questionnaire</h1>
                <div className="flex" style={{ flexGrow: 1 }}></div>
                <Button
                    variant="contained"
                    color='primary'
                    disableElevation
                    startIcon={<AddCircleIcon />}
                    onClick={handleClickNewQuestion}
                >
                    Create
                </Button>

            </div>
            <br />
            <br />
            {dataPerPage !== null &&
                <>
                    <Box display="flex" flexWrap='wrap' justifyContent='center'>

                        {dataPerPage.map((value, index) =>
                            <QuestionCard
                                key={index}
                                id={value.id}
                                title={value.name}
                                subtitle={JSON.parse(value.data).subtitle}
                                totalQuestions={JSON.parse(value.data).form.length}
                            />)}
                    </Box>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            onChange={handlePageChange}
                            page={page}
                            count={data === null ? 1 : Math.ceil(data.length / maxPerPage)}
                            variant="outlined"
                            shape="rounded" />
                    </div>
                </>
            }
            <DeleteDialogQuestionnaire isOpen={openDeleteDialog} onClose={handleOpenDeleteDialog} />
            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                onClose={handleSnackbar}
            >
                <Alert severity="success" onClose={handleSnackbar}>
                    Questionnaire berhasil dihapus
                </Alert>
            </Snackbar>
        </>
    )
}
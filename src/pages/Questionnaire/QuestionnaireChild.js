import React, { useEffect, useContext } from 'react'
import { Box } from "@material-ui/core"
import Pagination from '@material-ui/lab/Pagination'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { AdminQuestionnaireContext } from '../../context/AdminQuestionnaireContext'
import { NewQuestionCard } from './NewQuestionCard'
import { QuestionCard } from './QuestionCard'
import { DeleteDialogQuestionnaire } from './Dialog/DeleteDialogQuestionnaire'


const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export const QuestionnaireChild = () => {
    const [page, setPage] = React.useState(1)
    const [data, setData] = React.useState(null)
    const maxPerPage = 5
    const [dataPerPage, setDataPerPage] = React.useState(null)
    const { reload, setReload, openDeleteDialog, openSnackbar, functions } = useContext(AdminQuestionnaireContext)
    const { getAllQuestionnaire, handleOpenDeleteDialog, handleSnackbar } = functions


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
            <h1 style={{ color: '#999999' }}>Questionnaire</h1>
            <br />
            <br />
            <Box display="flex" flexWrap='wrap' justifyContent='start'>
                <NewQuestionCard />
                {dataPerPage !== null &&
                    dataPerPage.map((value, index) => <QuestionCard key={index} title={value.name} id={value.id} totalQuestions={JSON.parse(value.data).form.length} />)}
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
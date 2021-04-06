import React, { useEffect } from 'react'
import { Card, Typography, Box } from "@material-ui/core"
import Pagination from '@material-ui/lab/Pagination'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CloseIcon from '@material-ui/icons/Close'
import { useHistory } from 'react-router-dom'
import { styled } from './styled'
const QuestionCard = ({ title }) => {
    const classes = styled()
    return (
        <>
            <div style={{ position: 'relative' }}>
                <span className={classes.closeButtonWrapper}>
                    <CloseIcon className={classes.closeButton} />
                </span>
                <Card className={`${classes.card} ${classes.NormalCard}`}>
                    <Typography variant='h5' className={classes.titleText}>
                        Question {title}
                    </Typography>
                    <Typography className={classes.text}>
                        102 Questions
                </Typography>
                    <Typography className={classes.text}>
                        218 Responses
                </Typography>
                </Card>
            </div>
        </>
    )
}
const NewQuestionCard = () => {
    let history = useHistory()
    const classes = styled()
    const handleClickNewQuestion = () => history.push('/new-questionnaire')
    return (
        <>
            <Card
                className={`${classes.card} ${classes.NewQuestionCard}`}
                onClick={handleClickNewQuestion}>
                <Typography variant='h5' className={classes.titleText}>
                    New Question
                    </Typography>
                <AddCircleIcon className={classes.addIconButton} />
            </Card>
        </>
    )
}
export const Questionnaire = () => {
    const [page, setPage] = React.useState(1)
    const [data, setData] = React.useState(null)
    const maxPerPage = 9
    const [dataPerPage, setDataPerPage] = React.useState(null)
    const handlePageChange = (event, newPage) => {
        setPage(newPage)
        setDataPerPage(data.slice((newPage-1)*maxPerPage, (newPage*maxPerPage)))
    }
    useEffect(() => {
        if (data === null) {
            setData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
            setDataPerPage([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].slice(0, maxPerPage))
        }
    }, [data])
    return (
        <>
            <h1 style={{ color: '#999999' }}>Questionnaire</h1>
            <br />
            <br />
            <Box display="flex" flexWrap='wrap' justifyContent='start'>
                <NewQuestionCard />
                {dataPerPage !== null &&
                    dataPerPage.map((value, index) => <QuestionCard key={index} title={value} />)}
            </Box>
            <br/>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    onChange={handlePageChange}
                    page={page}
                    count={data === null ? 3 : Math.ceil(data.length / maxPerPage)}
                    variant="outlined"
                    shape="rounded" />
            </div>
        </>
    )
}
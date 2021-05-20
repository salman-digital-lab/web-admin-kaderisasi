import React from 'react'
import { Card, Typography } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close'
import { useHistory } from 'react-router-dom'
import { styled } from './styled'
import { AdminQuestionnaireContext } from '../../context/AdminQuestionnaireContext'


export const QuestionCard = ({ id, title, totalQuestions }) => {
    let history = useHistory()
    const classes = styled()
    const { setIdDelete, functions } = React.useContext(AdminQuestionnaireContext)
    const { handleOpenDeleteDialog } = functions


    const handleDetailQuestionnaire = () => {
        history.push(`/detail-questionnaire/${id}`)
    }

    const handleDelete = (id) => {
        setIdDelete(id)
        handleOpenDeleteDialog()
    }

    return (
        <>
            <div style={{ position: 'relative' }}>
                <span className={classes.closeButtonWrapper} onClick={() => handleDelete(id)}>
                    <CloseIcon className={classes.closeButton} />
                </span>
                <Card className={`${classes.card} ${classes.NormalCard}`} onClick={handleDetailQuestionnaire}>
                    <Typography variant='h5' className={classes.titleText}>
                        {title}
                    </Typography>
                    <Typography className={classes.text}>
                        Total: {totalQuestions > 1 ? totalQuestions + ' questions' : totalQuestions + ' question'}
                    </Typography>
                </Card>
            </div>
        </>
    )
}
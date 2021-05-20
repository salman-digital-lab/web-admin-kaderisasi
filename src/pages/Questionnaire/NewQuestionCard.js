import React from 'react'
import { Card, Typography } from "@material-ui/core"
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { useHistory } from 'react-router-dom'
import { styled } from './styled'


export const NewQuestionCard = () => {
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
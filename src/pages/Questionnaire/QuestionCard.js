import React from "react"
import {
  Card,
  Typography,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import styled from "./styled"
import { AdminQuestionnaireContext } from "../../context/AdminQuestionnaireContext"
import ImageCard from "../../assets/images/questionnaire-card-image.jpg"
/* eslint-disable */
const QuestionCard = ({ id, title, subtitle, totalQuestions }) => {
  const history = useHistory()
  const classes = styled()
  const { setIdDelete, functions } = React.useContext(AdminQuestionnaireContext)
  const { handleOpenDeleteDialog } = functions

  const handleDetailQuestionnaire = () => {
    history.push(`/detail-questionnaire/${id}`)
  }

  const handleDelete = (idx) => {
    setIdDelete(idx)
    handleOpenDeleteDialog()
  }

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea onClick={handleDetailQuestionnaire}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="170"
            image={ImageCard}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {totalQuestions > 1
                ? totalQuestions + " questions"
                : totalQuestions + " question"}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {subtitle.length > 99
                ? subtitle.split("").slice(0, 100).join("") + "..."
                : subtitle}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleDelete}>
            Delete
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={handleDetailQuestionnaire}
          >
            More Detail
          </Button>
        </CardActions>
      </Card>
    </>
  )
}
export default QuestionCard

import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { AdminQuestionnaireContext } from "../../../context/AdminQuestionnaireContext"
/* eslint-disable */
const DeleteDialogQuestionnaire = ({ isOpen, onClose }) => {
  const { functions } = React.useContext(AdminQuestionnaireContext)
  const { agreeToDeleteQuestionnaire } = functions

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this questionnaire?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Questionnaire akan dihapus secara permanen dan tidak dapat
            dipulihkan
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={agreeToDeleteQuestionnaire} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default DeleteDialogQuestionnaire

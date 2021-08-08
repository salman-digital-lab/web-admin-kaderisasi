import React from "react"
import { Button, Modal, Fade, Backdrop } from "@material-ui/core"
import "../../../assets/scss/AddActivity.scss"
import styled from "./styled"
/* eslint-disable */
export const ConfirmationModal = ({
  title,
  message,
  onSubmit,
  onClose,
  open,
  isSubmitting = false,
}) => {
  const classes = styled()

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div className="modal-header">
            <h2>{title}</h2>
          </div>
          <div className="form-flex">
            <div>
              <p>{message}</p>
              <div className="button-bottom">
                <Button
                  onClick={onClose}
                  className="button-bottoms-kegiatan"
                  variant="contained"
                  color="secondary"
                >
                  Batalkan
                </Button>
                <Button
                  onClick={onSubmit}
                  className="button-bottoms-kegiatan"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Ya, Saya Yakin!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

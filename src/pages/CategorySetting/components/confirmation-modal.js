import React from "react"
import { Button, Modal, Fade, Backdrop, Stack, Typography } from "@mui/material"
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
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Stack
            direction="column"
            spacing={3}
            padding={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="h5">{title}</Typography>
            <Stack
              direction="row"
              spacing={2}
              display="flex"
              justifyContent="center"
            >
              <Button onClick={onClose} variant="outlined">
                Batal
              </Button>
              <Button
                onClick={onSubmit}
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Ya, Saya Yakin!
              </Button>
            </Stack>
          </Stack>
        </div>
      </Fade>
    </Modal>
  )
}

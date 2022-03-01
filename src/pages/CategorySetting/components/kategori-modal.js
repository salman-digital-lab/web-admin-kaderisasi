import React, { useState, useContext } from "react"
import {
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  Stack,
  Typography,
} from "@mui/material"
import "../../../assets/scss/AddActivity.scss"
import styled from "./styled"
import { AdminActivityContext } from "../../../context/AdminActivityContext"
/* eslint-disable */
export const KategoriModal = ({ open, onClose, data }) => {
  const classes = styled()
  const [state, setState] = useState({
    name: "",
  })
  const { functions } = useContext(AdminActivityContext)
  const { addActivityCategory, editActivityCategory } = functions

  const handleForm = (value, type) => {
    setState({ ...state, [type]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    data.id
      ? await editActivityCategory(data.id, { name: state.name })
      : await addActivityCategory({ name: state.name })
    setState({ name: "" })
    onClose()
  }

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
          <form onSubmit={handleSubmit}>
            <Stack
              direction="column"
              spacing={3}
              padding={3}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h5">
                {data?.id ? "Edit Kategori" : "Tambah Kategori"}
              </Typography>
              <TextField
                label="Nama Kategori"
                required
                defaultValue={data.id ? data.name : state.name}
                onChange={(event) => handleForm(event.target.value, "name")}
                fullWidth
              />
              <Stack
                direction="row"
                spacing={2}
                display="flex"
                justifyContent="center"
              >
                <Button onClick={onClose} variant="outlined" disableElevation>
                  Batal
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disableElevation
                >
                  Simpan
                </Button>
              </Stack>
            </Stack>
          </form>
        </div>
      </Fade>
    </Modal>
  )
}

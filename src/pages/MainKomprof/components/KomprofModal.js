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
import { AdminKomprofContext } from "../../../context/AdminKomprofContext"
/* eslint-disable */
export const KomprofModal = ({ open, onClose, data }) => {
  const classes = styled()
  const [state, setState] = useState({
    name: "",
    desc: "",
  })
  const { functions } = useContext(AdminKomprofContext)
  const { addDataKomprof, editDataKomprof } = functions

  const handleForm = (value, type) => {
    setState({ ...state, [type]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    data.id
      ? await editDataKomprof(data.id, { program_name: state.name, program_desc: state.desc })
      : await addDataKomprof({ program_name: state.name, program_desc: state.desc })
    setState({ name: "", desc: "" })
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
                {data?.id ? "Edit Program" : "Tambah Program"}
              </Typography>
              <TextField
                label="Nama Program"
                required
                defaultValue={data.id ? data.name : state.name}
                onChange={(event) => handleForm(event.target.value, "name")}
                fullWidth
              />
              <TextField
                label="Deskripsi Program"
                required
                defaultValue={data.id ? data.desc : state.desc}
                onChange={(event) => handleForm(event.target.value, "desc")}
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

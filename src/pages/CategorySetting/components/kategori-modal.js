import React, { useState, useEffect, useContext } from "react"
import { Button, Modal, Fade, Backdrop, TextField } from "@material-ui/core"
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
  const { addActivityCategory, editActivityCategory } =
    functions

  const handleForm = (value, type) => {
    setState({ ...state, [type]: value })
  }

  const handleSubmit = async () => {
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
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div className="form-flex">
            <div>
              <div className="detail-activity">
                <div className="input-form">
                  Nama Kategori
                  <br />
                  <TextField
                    className="form-modal"
                    defaultValue={data.id ? data.name : state.name}
                    onChange={(event) => handleForm(event.target.value, "name")}
                  />
                </div>
              </div>
              <div className="button-bottom">
                <Button
                  onClick={onClose}
                  className="button-bottoms-kegiatan"
                  variant="contained"
                  color="secondary"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="button-bottoms-kegiatan primary-button"
                  variant="contained"
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

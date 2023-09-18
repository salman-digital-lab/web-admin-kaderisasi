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
import { UniversitasContext } from "../../../context/AdminUniversitasContext"
/* eslint-disable */
export const AlumniModal = ({ open, onClose, data }) => {
  const classes = styled()
  const [state, setState] = useState({
    name: "",
  })
//   const { functions } = useContext(UniversitasContext)
//   const { addUniversity, editUniversity } = functions

  const handleForm = (value, type) => {
    setState({ ...state, [type]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // data.id
    //   ? await editUniversity(data.id, { name: state.name })
    //   : await addUniversity({ name: state.name })
    // setState({ name: "" })
    // onClose()
  }

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
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
                {data?.id ? "Edit Universitas" : "Tambah Universitas"}
              </Typography>
              <TextField
                label="Nama"
                required
                // defaultValue={data.id ? data.name : state.name}
                onChange={(event) => handleForm(event.target.value, "name")}
                fullWidth
              />
              <TextField
                label="Email"
                required
                // defaultValue={data.id ? data.name : state.name}
                onChange={(event) => handleForm(event.target.value, "name")}
                fullWidth
              />
              <TextField
                label="No WhatsApp"
                required
                // defaultValue={data.id ? data.name : state.name}
                onChange={(event) => handleForm(event.target.value, "name")}
                fullWidth
              />
              <TextField
                label="Alamat Lengkap"
                required
                // defaultValue={data.id ? data.name : state.name}
                onChange={(event) => handleForm(event.target.value, "name")}
                fullWidth
              />
              <TextField
                label="Aktivitas / Pekerjaan"
                required
                // defaultValue={data.id ? data.name : state.name}
                onChange={(event) => handleForm(event.target.value, "name")}
                fullWidth
              />
              <TextField
                label="Nama Instansi Tempat Aktivitas / Bekerja"
                required
                // defaultValue={data.id ? data.name : state.name}
                onChange={(event) => handleForm(event.target.value, "name")}
                fullWidth
              />
               <TextField
                label="Sudah berapa lama Aktivitas / Bekerja di instansi saat ini ?"
                required
                // defaultValue={data.id ? data.name : state.name}
                onChange={(event) => handleForm(event.target.value, "name")}
                fullWidth
              />
              <TextField
                label="Riwayat Pendidikan S1 (Universitas + Jurusan)"
                required
                // defaultValue={data.id ? data.name : state.name}
                onChange={(event) => handleForm(event.target.value, "name")}
                fullWidth
              />
              <TextField
                label="Riwayat Pendidikan S2 (Universitas + Jurusan)"
                required
                // defaultValue={data.id ? data.name : state.name}
                onChange={(event) => handleForm(event.target.value, "name")}
                fullWidth
              />
              <TextField
                label="Riwayat Pendidikan S3 (Universitas + Jurusan)"
                required
                // defaultValue={data.id ? data.name : state.name}
                onChange={(event) => handleForm(event.target.value, "name")}
                fullWidth
              />
              <TextField
                label="Apakah Bersedia kembali berkontribusi di Salman untuk #MembangunIndonesia"
                required
                // defaultValue={data.id ? data.name : state.name}
                onChange={(event) => handleForm(event.target.value, "name")}
                fullWidth
              />
              <TextField
                label="Apakah bersedia untuk mengikuti program Sedekah Berjama'ah untuk saling membantu aktivis/alumni Salman yang membutuhkan, dengan nominal minimal Rp. 20.000 per bulan?"
                required
                // defaultValue={data.id ? data.name : state.name}
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
    // <Modal
    //   className={classes.modal}
    //   open={open}
    //   onClose={onClose}
    //   closeAfterTransition
    //   BackdropComponent={Backdrop}
    //   BackdropProps={{
    //     timeout: 500,
    //   }}

    // >
    //   <Fade in={open}>
    //     <div className={classes.paper}>
    //       <div className="form-flex">
    //         <div>
    //           <div className="detail-activity">
    //             <div className="input-form">
    //               Nama Universitas
    //               <br />
    //               <TextField
    //                 className="form-modal"
    //                 defaultValue={data.id ? data.name : state.name}
    //                 onChange={(event) => handleForm(event.target.value, "name")}
    //               />
    //             </div>
    //           </div>
    //           <div className="button-bottom">
    //             <Button
    //               onClick={onClose}
    //               className="button-bottoms-kegiatan"
    //               variant="contained"
    //               color="secondary"
    //             >
    //               Batal
    //             </Button>
    //             <Button
    //               onClick={handleSubmit}
    //               className="button-bottoms-kegiatan primary-button"
    //               variant="contained"
    //             >
    //               Simpan
    //             </Button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </Fade>
    // </Modal>
  )
}

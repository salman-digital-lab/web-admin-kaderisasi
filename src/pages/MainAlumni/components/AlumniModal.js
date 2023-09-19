import React, { useState, useContext } from "react"
import {
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  Stack,
  Typography,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material"
import "../../../assets/scss/AddActivity.scss"
import styled from "./styled"
import { UniversitasContext } from "../../../context/AdminUniversitasContext"
/* eslint-disable */

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ContributionSalman = [
  'Pemateri',
  'Mentor',
  'Fasilitator',
  'Mitra Program',
  'Lainnya',
];

export const AlumniModal = ({ open, onClose, data }) => {
  const classes = styled()
  const [state, setState] = useState({
    name: "",
  })
//   const { functions } = useContext(UniversitasContext)
//   const { addUniversity, editUniversity } = functions
const [contribution, setContribution] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setContribution(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


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
                {data?.id ? "Edit Alumni" : "Tambah Alumni"}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Nama"
                    required
                    // defaultValue={data.id ? data.name : state.name}
                    onChange={(event) => handleForm(event.target.value, "name")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    required
                    // defaultValue={data.id ? data.name : state.name}
                    onChange={(event) => handleForm(event.target.value, "name")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Alamat Lengkap"
                    required
                    // defaultValue={data.id ? data.name : state.name}
                    onChange={(event) => handleForm(event.target.value, "name")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="No WhatsApp"
                    required
                    // defaultValue={data.id ? data.name : state.name}
                    onChange={(event) => handleForm(event.target.value, "name")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
  <                 TextField
                      label="Aktivitas / Pekerjaan"
                      required
                      // defaultValue={data.id ? data.name : state.name}
                      onChange={(event) => handleForm(event.target.value, "name")}
                      fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nama Instansi Tempat Aktivitas / Bekerja"
                    required
                    // defaultValue={data.id ? data.name : state.name}
                    onChange={(event) => handleForm(event.target.value, "name")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  label="Sudah berapa lama Aktivitas / Bekerja di instansi saat ini ?"
                  required
                  // defaultValue={data.id ? data.name : state.name}
                  onChange={(event) => handleForm(event.target.value, "name")}
                  fullWidth
                />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Riwayat Pendidikan S1 (Universitas + Jurusan)"
                    required
                    // defaultValue={data.id ? data.name : state.name}
                    onChange={(event) => handleForm(event.target.value, "name")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Riwayat Pendidikan S2 (Universitas + Jurusan)"
                    required
                    // defaultValue={data.id ? data.name : state.name}
                    onChange={(event) => handleForm(event.target.value, "name")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Riwayat Pendidikan S3 (Universitas + Jurusan)"
                    required
                    // defaultValue={data.id ? data.name : state.name}
                    onChange={(event) => handleForm(event.target.value, "name")}
                    fullWidth
                  />
                </Grid>
                <FormControl sx={{ m: 1, width: 800 }}>
                <InputLabel id="multiple-checkbox-label">Apakah Bersedia kembali berkontribusi di Salman untuk #MembangunIndonesia</InputLabel>
                <Select
                  labelId="multiple-checkbox-label"
                  id="multiple-checkbox"
                  multiple
                  value={contribution}
                  onChange={handleChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {ContributionSalman.map((act) => (
                    <MenuItem key={act} value={act}>
                      <Checkbox checked={contribution.indexOf(act) > -1} />
                      <ListItemText primary={act} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <TextField
                label="Apakah Bersedia kembali berkontribusi di Salman untuk #MembangunIndonesia"
                required
                // defaultValue={data.id ? data.name : state.name}
                onChange={(event) => handleForm(event.target.value, "name")}
                fullWidth
              /> */}
              {/* <Grid item xs={12} sx={{ width : 500 }}> */}
              <FormControl sx={{ m: 1, width: 800}}>
                  <InputLabel id="select-program-label">Apakah bersedia untuk mengikuti program Sedekah Berjama'ah untuk saling <br/> membantu aktivis/alumni Salman yang membutuhkan, <br/> dengan nominal minimal Rp. 20.000 per bulan?</InputLabel>
                  <Select
                    labelId="select-program-label"
                    id="select-program"
                    // value={charity}
                    label="Sedekah"
                    sx={{ height : 100 }}
                  >
                    <MenuItem>Ya</MenuItem>
                    <MenuItem>Tidak</MenuItem>
                  </Select>
              </FormControl>
               <FormControl sx={{ m: 1, width: 800}}>
                  <InputLabel id="select-program-label">Apakah bersedia untuk mendapatkan informasi seputar Kealumnian,<br/> News Letter Salman, dan lainnya ?</InputLabel>
                  <Select
                    labelId="select-program-label"
                    id="select-program"
                    // value={charity}
                    label="Sedekah"
                    sx={{ height : 80 }}
                  >
                    <MenuItem>Ya</MenuItem>
                    <MenuItem>Tidak</MenuItem>
                  </Select>
              </FormControl>
              {/* </Grid> */}
               </Grid>
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

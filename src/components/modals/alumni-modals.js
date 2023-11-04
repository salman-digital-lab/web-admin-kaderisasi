import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  Modal,
  Fade,
  Backdrop,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import styled from "./styled"
import { AdminAlumniContext } from "../../context/AdminAlumniContext"
import { Stack } from "@mui/material"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { Autocomplete } from "@material-ui/lab"
/* eslint-disable */

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  anchorOrigin: {
    vertical: "top",
    horizontal: "left"
  },
  transformOrigin: {
    vertical: "bottom",
    horizontal: "left"
  },
  getContentAnchorEl: null,
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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AlumniModal = ({ open, onClose, data }) => {
  const classes = styled()
  const theme = useTheme()
  const [payload, setPayload] = useState({ ...data })
  const [state, setState] = useState({
    name: "",
    email: "",
    full_address: "",
    whatsapp_number: "",
    occupation: "",
    current_instance: "",
    notes: "",
    bachelor_degree: "",
    master_degree: "",
    doctoral_degree: "",
    contributions: [],
    is_donor: "",
    is_subscriber: "",
  })

  const { functions } = useContext(AdminAlumniContext)
  const { updateAlumniById, addDataAlumni } = functions

  useEffect(() => {
    if (data) {
      setPayload({ ...data })
    }
  }, [data])

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('dataState', state)
    data.id
      ? await updateAlumniById(data.id, payload)
      : await addDataAlumni(state)
    setState({ 
      name: "",
      email: "",
      full_address: "",
      whatsapp_number: "",
      occupation: "",
      current_instance: "",
      notes: "",
      bachelor_degree: "",
      master_degree: "",
      doctoral_degree: "",
      contributions: [],
      is_donor: "",
      is_subscriber: "",
    })
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
              {payload?.id ? "Edit Alumni" : "Tambah Alumni"} 
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Nama"
                    required
                    variant="outlined"
                    defaultValue={payload.id ? payload?.name : state.name}
                    onChange={(e) =>
                      payload.id ?
                      setPayload({ ...payload, name: e.target.value }) :
                      setState({...state, name: e.target.value})
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    type="email"
                    required
                    variant="outlined"
                    defaultValue={payload.id ? payload.email : state.name}
                    onChange={(e) =>
                      payload.id ?
                      setPayload({ ...payload, email: e.target.value }) :
                      setState({...state, email: e.target.value })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Alamat Lengkap"
                    variant="outlined"
                    defaultValue={payload.id ? payload.full_address : state.full_address}
                    onChange={(e) =>
                      payload.id ?
                      setPayload({ ...payload, full_address: e.target.value }) :
                      setState({...state, full_address: e.target.value })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="No WhatsApp"
                    variant="outlined"
                    defaultValue={payload.id ? payload.whatsapp_number : state.whatsapp_number}
                    onChange={(e) =>
                      payload.id ? 
                      setPayload({ ...payload, whatsapp_number: e.target.value }) :
                      setState({...state, whatsapp_number: e.target.value })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      label="Aktivitas / Pekerjaan"
                      variant="outlined"
                      defaultValue={payload.id ? payload.occupation : state.occupation}
                      onChange={(e) =>
                        payload.id ?
                        setPayload({ ...payload, occupation: e.target.value }) :
                        setState({...state, occupation: e.target.value })
                      }
                      fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nama Instansi Tempat Aktivitas / Bekerja"
                    variant="outlined"
                    defaultValue={payload.id ? payload.current_instance : state.current_instance}
                    onChange={(e) =>
                      payload.id ? 
                      setPayload({ ...payload, current_instance: e.target.value }) :
                      setState({...state, current_instance: e.target.value })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  label="Lama Beraktivitas / Bekerja di Instansi saat ini ?"
                  variant="outlined"
                  defaultValue={payload.id ? payload.notes : state.notes}
                  onChange={(e) =>
                    payload.id ?
                    setPayload({ ...payload, notes: e.target.value }) :
                    setState({...state, notes: e.target.value })
                  }
                  fullWidth
                />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Riwayat Pendidikan S1 (Universitas + Jurusan)"
                    variant="outlined"
                    defaultValue={payload.id ? payload.bachelor_degree : state.bachelor_degree}
                    onChange={(e) =>
                      payload.id ?
                      setPayload({ ...payload, bachelor_degree: e.target.value }) :
                      setState({...state, bachelor_degree: e.target.value })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Riwayat Pendidikan S2 (Universitas + Jurusan)"
                    variant="outlined"
                    defaultValue={payload.id ? payload.master_degree : state.master_degree}
                    onChange={(e) =>
                      payload.id ?
                      setPayload({ ...payload, master_degree: e.target.value }) :
                      setState({...state, master_degree: e.target.value })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Riwayat Pendidikan S3 (Universitas + Jurusan)"
                    variant="outlined"
                    defaultValue={payload.id ? payload.doctoral_degree : state.doctoral_degree}
                    onChange={(e) =>
                      payload.id ?
                      setPayload({ ...payload, doctoral_degree: e.target.value }) :
                      setState({...state, doctoral_degree: e.target.value })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      options={ContributionSalman}
                      value={
                        payload.id && payload.contributions !== null ? payload.contributions : state.contributions
                      }
                      onChange={(e, newData) =>
                        payload.id ?
                        setPayload({ ...payload, contributions: newData }) :
                        setState({...state, contributions: newData })
                      }
                      // isOptionEqualToValue={(option, value) => option === value}
                      // disableCloseOnSelect
                      getOptionLabel={(option) => option}
                      renderOption={(option, { selected }) => (
                        <React.Fragment>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option}
                        </React.Fragment>
                      )}
                      style={{ width: 790 }}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Apakah Bersedia kembali berkontribusi di Salman" placeholder="Kontribusi" />
                      )}
                    />
              </Grid>
              <Grid item xs={12}>
              <FormControl style={{width: 790, margin: 1}}>
                  <InputLabel style={{ marginLeft: 15 }} id="select-program-label">Apakah bersedia untuk mengikuti program Sedekah Berjama'ah ?</InputLabel>
                  <Select
                    labelId="select-program-label"
                    id="select-program"
                    input={<OutlinedInput label="Tag" />}
                    value={payload.id ? payload.is_donor : state.is_donor}
                    onChange={(e) =>
                      payload.id ?
                      setPayload({ ...payload, is_donor: e.target.value }) :
                      setState({...state, is_donor: e.target.value })
                    }
                    label="Sedekah"
                    sx={{ height : 100 }}
                  >
                    <MenuItem aria-label="None" value=""></MenuItem>
                    <MenuItem value={1}>Ya</MenuItem>
                    <MenuItem value={0}>Tidak</MenuItem>
                  </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl style={{width: 790, margin: 1}}>
                  <InputLabel style={{ marginLeft: 15, marginTop: -12 }} id="select-program-label">Apakah bersedia untuk mendapatkan informasi seputar Kealumnian,<br/> News Letter Salman, dan lainnya ?</InputLabel>
                  <Select
                    labelId="select-program-label"
                    id="select-program"
                    input={<OutlinedInput label="Tag" />}
                    value={payload.id ? payload.is_subscriber : state.is_subscriber}
                    onChange={(e) =>
                      payload.id ?
                      setPayload({ ...payload, is_subscriber : e.target.value }) :
                      setState({...state, is_subscriber: e.target.value })
                    }
                    label="Sedekah"
                    sx={{ height : 80 }}
                  >
                    <MenuItem aria-label="None" value="" ></MenuItem>
                    <MenuItem value={1}>Ya</MenuItem>
                    <MenuItem value={0}>Tidak</MenuItem>
                  </Select>
              </FormControl>
              </Grid>
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

export default AlumniModal

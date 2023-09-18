import React, { useContext, useState } from "react"
import {
  Card,
  CardContent,
  TextField,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Button,
  Grid,
} from "@material-ui/core"
import StyledRadio from "../../../components/radio-button"
import { IconButton, Stack } from "@mui/material"
import { AddCircleOutline, Search } from "@mui/icons-material"
import { AdminAlumniContext } from "../../../context/AdminAlumniContext"
import { AlumniModal } from "./AlumniModal"

const AlumniFilter = () => {
  const { filterAlumni, setFilterAlumni } = useContext(AdminAlumniContext)
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event) => {
    let data = { ...filterAlumni, filter: true }
    if (event.target.name === "search_query") {
      data.search_query = event.target.value
    }
    setFilterAlumni(data)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let data = { ...filterAlumni, filter: true }
      if (event.target.name === "search_query") {
        data.search_query = event.target.value
      }
      setFilterAlumni(data)
    }
  }

  const handleChangeGender = (s) => {
    setFilterAlumni({
      ...filterAlumni,
      gender: s,
      filter: true,
    })
  }

  return (
    <>
      <Card>
        <CardContent className="filter-content">
          <Stack direction="column" spacing={3}>
            <Grid container display="flex" direction="row-reverse" spacing={6}>
              <Grid
                item
                xs={4}
                display="flex"
                justifyContent="flex-end"
                paddingY={1}
              >
                <Button
                  startIcon={<AddCircleOutline />}
                  size="large"
                  variant="contained"
                  onClick={handleOpen}
                  style={{ backgroundColor: "#1F99CC", color: "#fff" }}
                  disableElevation
                >
                  Tambah Alumni
                </Button>
              </Grid>
              <Grid item xs={8} paddingY={1}>
                <TextField
                  className="input-register"
                  label="Cari Alumni"
                  size="small"
                  variant="outlined"
                  fullWidth
                  name="search_query"
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box pl={5} pr={5}>
              <FormControl component="fieldset" className="radio-button jenkel">
                <FormLabel component="legend">Jenis Kelamin</FormLabel>
                <RadioGroup
                  defaultValue=""
                  aria-label="activity"
                  name="customized-radios"
                >
                  <FormControlLabel
                    value=""
                    control={<StyledRadio />}
                    onChange={(e) => handleChangeGender(e.target.value)}
                    label="Semua"
                  />
                  <FormControlLabel
                    value="M"
                    control={<StyledRadio />}
                    onChange={(e) => handleChangeGender(e.target.value)}
                    label="Pria"
                  />
                  <FormControlLabel
                    value="F"
                    control={<StyledRadio />}
                    onChange={(e) => handleChangeGender(e.target.value)}
                    label="Wanita"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      <AlumniModal open={open} onClose={handleClose} />
    </>
  )
}

export default AlumniFilter

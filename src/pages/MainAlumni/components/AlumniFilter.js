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
import AlumniModal from "../../../components/modals/alumni-modals"

const AlumniFilter = () => {
  const { filterAlumni, setFilterAlumni } = useContext(AdminAlumniContext)
  const [open, setOpen] = useState(false)
  const [dataAlumni, setDataAlumni] = useState({})

  const handleOpen = () => {
    setDataAlumni({})
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

  return (
    <>
      <Card>
        <CardContent className="filter-content">
          <Stack direction="column" spacing={3}>
            <Grid
              container
              display="flex"
              direction="row-reverse"
              spacing={6}
              justifyContent="flex-end"
              paddingy={1}
            >
              <Grid item xs={4} display="flex">
                <Button
                  startIcon={<AddCircleOutline />}
                  size="large"
                  variant="contained"
                  onClick={handleOpen}
                  style={{
                    backgroundColor: "#1F99CC",
                    color: "#fff",
                    marginLeft: 20,
                    marginTop: 4,
                  }}
                  disableElevation
                >
                  Tambah Alumni
                </Button>
              </Grid>
              <Grid item xs={8} paddingy={1}>
                <TextField
                  className="input-register"
                  label="Cari Alumni"
                  size="small"
                  fullWidth
                  name="search_query"
                  onKeyDown={handleKeyDown}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
      <AlumniModal open={open} onClose={handleClose} data={dataAlumni} />
    </>
  )
}

export default AlumniFilter

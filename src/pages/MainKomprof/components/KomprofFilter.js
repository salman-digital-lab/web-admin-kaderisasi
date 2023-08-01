import React, { useState, useContext, useEffect } from "react"
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Button,
  Select,
  MenuItem,
  Divider,
  Stack,
  Grid,
} from "@mui/material"
import { useTheme } from "@material-ui/core/styles"
import { KomprofModal } from "./KomprofModal"
import "../../../assets/scss/AddActivity.scss"
import AddIcon from "@material-ui/icons/Add"
import { AdminKomprofContext } from "../../../context/AdminKomprofContext"

const KomprofFilter = () => {
  const theme = useTheme()
  const { filterKomprof, setFilterKomprof, functions } =
    useContext(AdminKomprofContext)
  const [dataEdit, setDataEdit] = useState({})
  const [open, setOpen] = useState(false)

  const handleAddKomprof = () => {
    setDataEdit({})
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setFilterKomprof({
        ...filterKomprof,
        name: event.target.value,
        filter: true,
      })
    }
  }

  return (
    <>
      <Box
        sx={{ backgroundColor: "#fff", borderRadius: "0.75em", padding: "2em" }}
      >
        <Stack direction="column" spacing={3}>
          <Grid container display="flex" flexDirection="row-reverse">
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              justifyContent="flex-end"
              paddingY={1}
            >
              <Button
                startIcon={<AddIcon />}
                size="large"
                variant="contained"
                onClick={() => handleAddKomprof()}
                style={{ backgroundColor: "#1F99CC", color: "#fff" }}
                disableElevation
              >
                Tambah Program
              </Button>
            </Grid>
            <Grid item xs={12} md={6} paddingY={1}>
              <TextField
                id="filled-basic"
                size="large"
                label="Cari Program"
                variant="outlined"
                className="filter-input"
                onKeyDown={handleKeyDown}
                fullWidth
              />
            </Grid>
          </Grid>
          <Divider
            orientation="vertical"
            sx={{ height: "5px", backgroundColor: "#1F99CC" }}
          />
        </Stack>
      </Box>
      <KomprofModal open={open} onClose={handleClose} data={dataEdit} />
    </>
  )
}

export default KomprofFilter

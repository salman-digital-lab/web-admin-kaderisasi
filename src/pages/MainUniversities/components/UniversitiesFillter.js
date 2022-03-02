import React, { useState, useContext } from "react"
import { Card, CardContent, TextField, Box, Button } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Add } from "@material-ui/icons"
import { UniversitiesModal } from "./UniversitiesModal"
import "../../../assets/scss/AddActivity.scss"
import { UniversitasContext } from "../../../context/AdminUniversitasContext"

const UniversitiesFillter = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [open, setOpen] = useState(false)
  const [dataEdit, setDataEdit] = useState({})
  const handleClose = () => {
    setOpen(false)
  }

  const handleAddUniversity = () => {
    setDataEdit({})
    setOpen(true)
  }

  const { filterUniversities, setFilterUniversities } =
    useContext(UniversitasContext)

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setFilterUniversities({
        ...filterUniversities,
        name: event.target.value,
        filter: true,
      })
    }
  }
  return (
    <>
      <Card>
        <CardContent className="filter-content">
          <Box>
            <Box className="filter-block">
              <TextField
                className="input-register"
                fullWidth
                size="small"
                label="Cari Universitas"
                onKeyDown={handleKeyDown}
              />
              {isMobile ? (
                <Button
                  variant="contained"
                  className="btn-tambah-kegiatan primary-button"
                  onClick={() => handleAddUniversity()}
                >
                  <Add />
                </Button>
              ) : (
                <Button
                  className="btn-tambah-kegiatan primary-button"
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => handleAddUniversity()}
                >
                  Universitas
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
      <UniversitiesModal open={open} onClose={handleClose} data={dataEdit} />
    </>
  )
}

export default UniversitiesFillter

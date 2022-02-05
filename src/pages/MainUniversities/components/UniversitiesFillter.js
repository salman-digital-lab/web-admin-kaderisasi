import React, { useState, useContext } from "react"
import { Card, CardContent, TextField, Box, Button } from "@material-ui/core"
import { UniversitiesModal } from "./UniversitiesModal"
import "../../../assets/scss/AddActivity.scss"
import { UniversitasContext } from "../../../context/AdminUniversitasContext"

const UniversitiesFillter = () => {
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
          <Box pl={5} pr={5}>
            <Button
              className="btn-tambah-kegiatan primary-button"
              variant="contained"
              onClick={() => handleAddUniversity()}
            >
              TAMBAH UNIVERSITAS
            </Button>
          </Box>
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardContent className="filter-content">
          <Box pl={5} pr={5}>
            <TextField
              className="input-register"
              fullWidth
              size="small"
              label="Cari Universitas"
              onKeyDown={handleKeyDown}
            />
          </Box>
        </CardContent>
      </Card>
      <UniversitiesModal open={open} onClose={handleClose} data={dataEdit} />
    </>
  )
}

export default UniversitiesFillter

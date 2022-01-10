import React, { useState } from "react"
import { Card, CardContent, Box, Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import { UniversitiesModal } from "./universities-modal"
import "../../../assets/scss/AddActivity.scss"
// import { UniversitasContext } from "../../../context/AdminUniversitasContext"

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
      {/* <Card>
        <CardContent className="filter-content">
          <Box pl={5} pr={5}>
            <TextField
              id="filled-basic"
              size="small"
              label="Cari Universitas"
              variant="outlined"
              className="filter-input"
              onKeyDown={handleKeyDown}
            />
          </Box>
        </CardContent>
      </Card> */}
      <UniversitiesModal open={open} onClose={handleClose} data={dataEdit} />
    </>
  )
}

export default UniversitiesFillter

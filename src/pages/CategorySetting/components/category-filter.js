import React, { useState } from "react"
import { Box, Button } from "@mui/material"
import { Add } from "@material-ui/icons"
import { KategoriModal } from "./kategori-modal"
import "../../../assets/scss/AddActivity.scss"

const UniversitiesFillter = () => {
  const [open, setOpen] = useState(false)
  const [dataEdit, setDataEdit] = useState({})
  const handleClose = () => {
    setOpen(false)
  }

  const handleAddCategory = () => {
    setDataEdit({})
    setOpen(true)
  }
  return (
    <>
      <Box component="span">
        <Button
          variant="contained"
          className="btn-tambah-kegiatan primary-button"
          size="large"
          disableElevation
          startIcon={<Add />}
          onClick={() => handleAddCategory()}
          sx={{ backgroundColor: "#1F99CC" }}
        >
          Kategori
        </Button>
      </Box>
      <KategoriModal open={open} onClose={handleClose} data={dataEdit} />
    </>
  )
}

export default UniversitiesFillter

import React, { useState } from "react"
import { Box, Button } from "@mui/material"
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
          size="large"
          disableElevation
          onClick={() => handleAddCategory()}
          sx={{ backgroundColor: "#1F99CC" }}
        >
          TAMBAH KATEGORI
        </Button>
      </Box>
      <KategoriModal open={open} onClose={handleClose} data={dataEdit} />
    </>
  )
}

export default UniversitiesFillter

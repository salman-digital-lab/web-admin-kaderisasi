import React, { useState } from "react"
import { Card, CardContent, Box, Button } from "@material-ui/core"
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
      <Card>
        <CardContent className="filter-content">
          <Box pl={5} pr={5}>
            <Button
              color="primary"
              className="btn-tambah-kegiatan"
              variant="contained"
              onClick={() => handleAddCategory()}
            >
              TAMBAH KATEGORI
            </Button>
          </Box>
        </CardContent>
      </Card>
      <KategoriModal open={open} onClose={handleClose} data={dataEdit} />
    </>
  )
}

export default UniversitiesFillter

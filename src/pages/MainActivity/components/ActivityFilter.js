import React, { useState, useContext, useEffect } from "react"
import {
  Card,
  CardContent,
  FormControlLabel,
  TextField,
  Box,
  FormControl,
  InputLabel,
  FormLabel,
  RadioGroup,
  Button,
  Select,
  MenuItem,
  Input,
} from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import StyledRadio from "../../../components/radio-button"
import { KegiatanModal } from "./ActivityModal"
import { AdminActivityContext } from "../../../context/AdminActivityContext"
import "../../../assets/scss/AddActivity.scss"
import { MenuProps, getStyles } from "../../../components/select"

const KegiatanFilter = () => {
  const theme = useTheme()
  const { filterActivity, setFilterActivity, categoryList, functions } =
    useContext(AdminActivityContext)
  const { getActivityCategory } = functions
  useEffect(() => {
    getActivityCategory()
  }, [])
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setFilterActivity({
        ...filterActivity,
        search: event.target.value,
        filter: true,
      })
    }
  }

  const handleCategoryChange = (s) => {
    setFilterActivity({ ...filterActivity, category_id: s, filter: true })
  }

  const handleChangeRole = (s) => {
    setFilterActivity({
      ...filterActivity,
      minimum_roles_id: Number(s),
      filter: true,
    })
  }

  return (
    <>
      <Card>
        <CardContent className="filter-content">
          <Box pl={5} pr={5}>
            <Button
              variant="contained"
              className="btn-tambah-kegiatan primary-button"
              onClick={handleOpen}
            >
              TAMBAH KEGIATAN
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
              label="Cari Kegiatan"
              fullWidth
              size="small"
              onKeyDown={handleKeyDown}
            />
            <FormControl component="fieldset" className="radio-button jenkel">
              <FormLabel component="legend">Min. Jenjang</FormLabel>
              <RadioGroup
                value={filterActivity.minimum_roles_id}
                aria-label="activity"
                name="customized-radios"
              >
                <FormControlLabel
                  value={-1}
                  control={<StyledRadio />}
                  onChange={(e) => handleChangeRole(e.target.value)}
                  label="Semua"
                />
                <FormControlLabel
                  value={4}
                  control={<StyledRadio />}
                  onChange={(e) => handleChangeRole(e.target.value)}
                  label="Jamaah"
                />
                <FormControlLabel
                  value={5}
                  control={<StyledRadio />}
                  onChange={(e) => handleChangeRole(e.target.value)}
                  label="Aktivis"
                />
                <FormControlLabel
                  value={6}
                  control={<StyledRadio />}
                  onChange={(e) => handleChangeRole(e.target.value)}
                  label="Kader"
                />
                <FormControlLabel
                  value={7}
                  control={<StyledRadio />}
                  onChange={(e) => handleChangeRole(e.target.value)}
                  label="Kader Lanjut"
                />
              </RadioGroup>
            </FormControl>
            <FormControl className="select-dropdown mt-10">
              <InputLabel id="demo-mutiple-name-label">Kategori</InputLabel>
              {categoryList?.status === "SUCCESS" && (
                <Select
                  value={filterActivity.category_id}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {categoryList?.data?.data?.map((category) => (
                    <MenuItem
                      key={`${category.id}`}
                      value={category.id}
                      label={category.name}
                      style={getStyles(
                        category,
                        categoryList?.data?.data,
                        theme
                      )}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </Box>
        </CardContent>
      </Card>
      <KegiatanModal open={open} onClose={handleClose} />
    </>
  )
}

export default KegiatanFilter

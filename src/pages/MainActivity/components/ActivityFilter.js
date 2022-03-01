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
import useMediaQuery from "@mui/material/useMediaQuery"
import { Add } from "@material-ui/icons"
import StyledRadio from "../../../components/radio-button"
import { KegiatanModal } from "./ActivityModal"
import { AdminActivityContext } from "../../../context/AdminActivityContext"
import "../../../assets/scss/AddActivity.scss"
import { MenuProps, getStyles } from "../../../components/select"

const KegiatanFilter = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
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
            <Box className="filter-block">
              <TextField
                className="filter-item input-register"
                label="Cari Kegiatan"
                fullWidth
                size="small"
                onKeyDown={handleKeyDown}
              />
              {isMobile ? (
                <Button
                  variant="contained"
                  className="btn-tambah-kegiatan primary-button"
                  onClick={handleOpen}
                >
                  <Add />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="btn-tambah-kegiatan primary-button"
                  startIcon={<Add />}
                  onClick={handleOpen}
                >
                  Kegiatan
                </Button>
              )}
            </Box>
            <Box className="select-block">
              <FormControl className="select-dropdown">
                <InputLabel id="demo-mutiple-name-label">Jenjang</InputLabel>
                <Select
                  labelId="min-jenjang-select-label"
                  id="min-jenjang-select"
                  value={filterActivity.minimum_roles_id}
                  label="Min. Jenjang"
                  autoWidth
                  onChange={(e) => handleChangeRole(e.target.value)}
                >
                  <MenuItem value={-1}>Semua</MenuItem>
                  <MenuItem value={4}>Jamaah</MenuItem>
                  <MenuItem value={5}>Aktivis</MenuItem>
                  <MenuItem value={6}>Kader</MenuItem>
                  <MenuItem value={7}>Kader Lanjut</MenuItem>
                </Select>
              </FormControl>
              <FormControl className="select-dropdown">
                <InputLabel id="demo-mutiple-name-label">Kategori</InputLabel>
                {categoryList?.status === "SUCCESS" && (
                  <Select
                    value={filterActivity.category_id}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    input={<Input />}
                    autoWidth
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
          </Box>
        </CardContent>
      </Card>
      <KegiatanModal open={open} onClose={handleClose} />
    </>
  )
}

export default KegiatanFilter

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
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@material-ui/core/styles"
import { KegiatanModal } from "./ActivityModal"
import { AdminActivityContext } from "../../../context/AdminActivityContext"
import "../../../assets/scss/AddActivity.scss"
import { MenuProps, getStyles } from "../../../components/select"
import AddIcon from "@material-ui/icons/Add"

const KegiatanFilter = () => {
  const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const { filterActivity, setFilterActivity, categoryList, functions } =
    useContext(AdminActivityContext)
  const { getActivityCategory } = functions
  useEffect(() => {
    getActivityCategory()
    // eslint-disable-next-line
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
                onClick={handleOpen}
                style={{ backgroundColor: "#1F99CC", color: "#fff" }}
                disableElevation
              >
                Tambah Kegiatan
              </Button>
            </Grid>
            <Grid item xs={12} md={6} paddingY={1}>
              <TextField
                id="filled-basic"
                size="large"
                label="Cari Kegiatan"
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
          <Box>
            <Stack direction="row" spacing={3}>
              <FormControl size="small" sx={{ width: "15em" }}>
                <InputLabel id="select-min-jenjang">Min. Jenjang</InputLabel>
                <Select
                  labelId="select-min-jenjang"
                  label="Min. Jenjang"
                  defaultValue={-1}
                  onChange={(e) => handleChangeRole(e.target.value)}
                >
                  <MenuItem value={-1}>Semua</MenuItem>
                  <MenuItem value={4}>Jamaah</MenuItem>
                  <MenuItem value={5}>Aktivis</MenuItem>
                  <MenuItem value={6}>Kader</MenuItem>
                  <MenuItem value={7}>Kader Lanjut</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ width: "15em" }}>
                <InputLabel id="select-kategori">Kategori</InputLabel>
                {categoryList?.status === "SUCCESS" && (
                  <Select
                    labelId="select-kategori"
                    label="Kategori"
                    value={
                      filterActivity?.category_id ?? null
                        ? filterActivity.category_id
                        : -1
                    }
                    onChange={(e) => handleCategoryChange(e.target.value)}
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
            </Stack>
            {/* <FormControl component="fieldset" className="radio-button jenkel">
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
              </FormControl> */}
          </Box>
        </Stack>
      </Box>
      <KegiatanModal open={open} onClose={handleClose} />
    </>
  )
}

export default KegiatanFilter

import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, TextField, Box, Button } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Add } from "@material-ui/icons"
import "../../../assets/scss/AddActivity.scss"
import { AdminContext } from "../../../context/AdminContext"

const AdminFilter = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const { filterUser, setFilterUser } = useContext(AdminContext)

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setFilterUser({
        ...filterUser,
        search: event.target.value,
        filter: true,
      })
    }
  }

  // const handleChangeGender = (s) => {
  //   setFilterUser({
  //     ...filterUser,
  //     gender: s,
  //     filter: true,
  //   })
  // }

  return (
    <>
      <Card>
        <CardContent className="filter-content">
          <Box pl={5} pr={5}>
            <Box className="filter-block">
              <TextField
                className="input-register"
                label="Cari Admin"
                fullWidth
                size="small"
                onKeyDown={handleKeyDown}
              />
              <Link to="/register-admin">
                {isMobile ? (
                  <Button
                    variant="contained"
                    className="btn-tambah-kegiatan primary-button"
                  >
                    <Add />
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    className="btn-tambah-kegiatan primary-button"
                    startIcon={<Add />}
                  >
                    Admin
                  </Button>
                )}
              </Link>
            </Box>
          </Box>
        </CardContent>
      </Card>
      {/*<br />
      <Card>
        <CardContent className="filter-content">
          <Box pl={5} pr={5}>
           
             <FormControl component="fieldset" className="radio-button activity">
            <FormLabel component="legend">Aktivitas</FormLabel>
            <RadioGroup
              defaultValue="all"
              aria-label="activity"
              name="customized-radios"
            >
              <FormControlLabel
                value="all"
                control={<StyledRadio />}
                onChange={(e) => filterByStatus(e.target.value)}
                label="Semua"
              />
              <FormControlLabel
                value="ssc"
                control={<StyledRadio />}
                onChange={(e) => filterByStatus(e.target.value)}
                label="SSC"
              />
              <FormControlLabel
                value="lmd"
                control={<StyledRadio />}
                onChange={(e) => filterByStatus(e.target.value)}
                label="LMD"
              />
              <FormControlLabel
                value="spc"
                control={<StyledRadio />}
                onChange={(e) => filterByStatus(e.target.value)}
                label="SPC"
              />
            </RadioGroup>
          </FormControl> 
             <FormControl component="fieldset" className="radio-button jenkel">
              <FormLabel component="legend">Jenis Kelamin</FormLabel>
              <RadioGroup
                defaultValue=""
                aria-label="activity"
                name="customized-radios"
              >
                <FormControlLabel
                  value=""
                  control={<StyledRadio />}
                  onChange={(e) => handleChangeGender(e.target.value)}
                  label="Semua"
                />
                <FormControlLabel
                  value="M"
                  control={<StyledRadio />}
                  onChange={(e) => handleChangeGender(e.target.value)}
                  label="Pria"
                />
                <FormControlLabel
                  value="F"
                  control={<StyledRadio />}
                  onChange={(e) => handleChangeGender(e.target.value)}
                  label="Wanita"
                />
              </RadioGroup>
            </FormControl> 
          </Box>
        </CardContent>
      </Card> */}
    </>
  )
}

export default AdminFilter

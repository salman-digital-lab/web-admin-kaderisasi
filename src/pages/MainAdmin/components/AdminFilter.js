import React, { useContext } from "react"
import { Card, CardContent, TextField, Box, Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import { AdminContext } from "../../../context/AdminContext"

const AdminFilter = () => {
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
            <Link to="/register-admin">
              <Button
                variant="contained"
                className="btn-tambah-kegiatan primary-button"
              >
                TAMBAH ADMIN
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardContent className="filter-content">
          <Box pl={5} pr={5}>
            <TextField
              className="input-register"
              label="Cari Admin"
              fullWidth
              size="small"
              onKeyDown={handleKeyDown}
            />
            {/* <FormControl component="fieldset" className="radio-button activity">
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
          </FormControl> */}
            {/* <FormControl component="fieldset" className="radio-button jenkel">
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
            </FormControl> */}
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default AdminFilter

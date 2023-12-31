import React, { useContext } from "react"
import {
  Card,
  CardContent,
  TextField,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@material-ui/core"
import { AdminMemberContext } from "../../../context/AdminMemberContext"
import StyledRadio from "../../../components/radio-button"
import { IconButton } from "@mui/material"
import { Search } from "@mui/icons-material"

const MemberFilter = () => {
  const { filterMember, setFilterMember } = useContext(AdminMemberContext)

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.target.type === "submit") {
      let data = { ...filterMember, filter: true }
      if (event.target.name === "search_query") {
        data.search_query = event.target.value
        event.preventDefault()
      }
      if (event.target.name === "SSC") {
        data.ssc = event.target.value
      }
      if (event.target.name === "LMD") {
        data.lmd = event.target.value
      }
      if (event.target.name === "spectra") {
        data.spectra = event.target.value
      }
      setFilterMember(data)
    }
  }

  const handleChangeGender = (s) => {
    setFilterMember({
      ...filterMember,
      gender: s,
      filter: true,
    })
  }

  return (
    <Card>
      <CardContent className="filter-content">
        <Box pl={5} pr={5}>
          <form onSubmit={handleKeyDown}>
            <div style={{ display: "flex" }}>
              <TextField
                className="input-register"
                label="Cari Member"
                fullWidth
                size="small"
                name="search_query"
                onKeyDown={handleKeyDown}
              />
              <IconButton
                style={{ marginLeft: "auto" }}
                type="submit"
                aria-label="search"
              >
                <Search />
              </IconButton>
            </div>
          </form>
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
          <div className="row">
            <div className="col-4">
              <TextField
                className="input-register"
                label="SSC"
                fullWidth
                size="small"
                name="SSC"
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="col-4">
              <TextField
                className="input-register"
                label="LMD"
                fullWidth
                size="small"
                name="LMD"
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="col-4">
              <TextField
                className="input-register"
                label="SPC"
                fullWidth
                size="small"
                name="spectra"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </Box>
      </CardContent>
    </Card>
  )
}

export default MemberFilter

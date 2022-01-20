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
} from "@material-ui/core"
import { AdminMemberContext } from "../../../context/AdminMemberContext"
import StyledRadio from "../../../components/radio-button"

const MemberFilter = () => {
  const { filterMember, setFilterMember } = useContext(AdminMemberContext)

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      let data = { ...filterMember, filter: true }
      if (event.target.name === "search_query") {
        data.search_query = event.target.value
      }
      if (event.target.name === "SSC") {
        data.ssc = event.target.value
      }
      if (event.target.name === "LMD") {
        data.lmd = event.target.value
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
          <TextField
            id="filled-basic"
            size="small"
            label="Cari Member"
            variant="outlined"
            className="filter-input"
            name="search_query"
            onKeyDown={handleKeyDown}
          />
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
                label="Perempuan"
              />
            </RadioGroup>
          </FormControl>
          <div className="row mt-10">
            <div className="col-6">
              <TextField
                id="filled-basic"
                size="small"
                label="SSC"
                variant="outlined"
                className="filter-input"
                name="SSC"
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="col-6">
              <TextField
                id="filled-basic"
                size="small"
                label="LMD"
                variant="outlined"
                className="filter-input"
                name="LMD"
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

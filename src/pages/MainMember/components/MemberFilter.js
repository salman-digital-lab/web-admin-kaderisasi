import React, { useState, useContext } from "react"
import {
  Card,
  CardContent,
  InputLabel,
  TextField,
  Box,
  FormControl,
  Select,
  FormLabel,
  RadioGroup,
  MenuItem,
  Input,
  FormControlLabel,
} from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import { AdminMemberContext } from "../../../context/AdminMemberContext"
import StyledRadio from "../../../components/RadioButton"
import { MenuProps, getStyles } from "../../../components/Select"

const MemberFilter = () => {
  const theme = useTheme()
  const { filterMember, setFilterMember } = useContext(AdminMemberContext)
  const [univName, setUnivName] = useState("all")
  const names = [
    { value: "all", label: "Semua Perguruan Tinggi" },
    { value: "TelU", label: "Telkom University" },
    { value: "ITB", label: "Institut Teknologi Bandung" },
    { value: "Unikom", label: "Universitas Komputer" },
    { value: "Unisba", label: "Universitas Islam Bandung" },
    { value: "Polban", label: "Politeknik Bandung" },
  ]

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setFilterMember({
        ...filterMember,
        search_query: event.target.value,
        filter: true,
      })
    }
  }

  const handleChange = (s) => {
    setUnivName(s)
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
          <FormControl className="select-dropdown mt-15">
            <InputLabel id="demo-mutiple-name-label">
              Perguruan Tinggi
            </InputLabel>
            <Select
              value={univName}
              onChange={(e) => handleChange(e.target.value)}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name.value}
                  label={name.label}
                  style={getStyles(name, univName, theme)}
                >
                  {name.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </CardContent>
    </Card>
  )
}

export default MemberFilter

import React, { useContext, useEffect } from "react"
import {
  Card,
  CardContent,
  FormControlLabel,
  Box,
  FormControl,
  InputLabel,
  FormLabel,
  RadioGroup,
  MenuItem,
  Select,
  Input,
} from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import { AdminActivityContext } from "../../../context/AdminActivityContext"
import { MenuProps, getStyles } from "../../../components/select"
import StyledRadio from "../../../components/radio-button"

const PendaftarFilter = () => {
  const theme = useTheme()
  const {
    filterParticipantsActivity,
    setFilterParticipantsActivity,
    universityList,
    functions,
  } = useContext(AdminActivityContext)
  const { getAllUniversities } = functions
  useEffect(() => {
    if (universityList.length < 1) {
      getAllUniversities()
    }
  })

  const statusList = [
    { value: -1, label: "Semua" },
    { value: "REGISTERED", label: "Registered" },
    { value: "JOINED", label: "Joined" },
    { value: "PASSED", label: "Passed" },
    { value: "FAILED", label: "Failed" },
    { value: "REJECTED", label: "Rejected" },
  ]

  const handleUniversityChange = (s) => {
    setFilterParticipantsActivity({
      ...filterParticipantsActivity,
      university_id: Number(s),
      filter: true,
    })
  }

  const handleStatusChange = (s) => {
    setFilterParticipantsActivity({
      ...filterParticipantsActivity,
      status: s,
      filter: true,
    })
  }

  const filterByJenjang = (s) => {
    setFilterParticipantsActivity({
      ...filterParticipantsActivity,
      role_id: Number(s),
      filter: true,
    })
  }

  return (
    <>
      <Card>
        <CardContent className="filter-content">
          <Box pl={5} pr={5}>
            <FormControl className="select-dropdown">
              <InputLabel id="demo-mutiple-name-label">Status</InputLabel>
              {statusList.length > 0 && (
                <Select
                  value={filterParticipantsActivity.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {statusList.map((name) => (
                    <MenuItem
                      key={name}
                      value={name.value}
                      label={name.label}
                      style={getStyles(name, statusList, theme)}
                    >
                      {name.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
            <FormControl component="fieldset" className="radio-button jenkel">
              <FormLabel component="legend">Min. Jenjang</FormLabel>
              <RadioGroup
                value={filterParticipantsActivity.role_id}
                aria-label="activity"
                name="customized-radios"
              >
                <FormControlLabel
                  value={-1}
                  control={<StyledRadio />}
                  onChange={(e) => filterByJenjang(e.target.value)}
                  label="Semua"
                />
                <FormControlLabel
                  value={4}
                  control={<StyledRadio />}
                  onChange={(e) => filterByJenjang(e.target.value)}
                  label="Jamaah"
                />
                <FormControlLabel
                  value={5}
                  control={<StyledRadio />}
                  onChange={(e) => filterByJenjang(e.target.value)}
                  label="Aktivis"
                />
                <FormControlLabel
                  value={6}
                  control={<StyledRadio />}
                  onChange={(e) => filterByJenjang(e.target.value)}
                  label="Kader"
                />
                <FormControlLabel
                  value={7}
                  control={<StyledRadio />}
                  onChange={(e) => filterByJenjang(e.target.value)}
                  label="Kader Lanjut"
                />
              </RadioGroup>
            </FormControl>
            <FormControl className="select-dropdown mt-15">
              <InputLabel id="demo-mutiple-name-label">Universitas</InputLabel>
              {universityList.length > 0 && (
                <Select
                  value={filterParticipantsActivity.university_id}
                  onChange={(e) => handleUniversityChange(e.target.value)}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {universityList.map((name) => (
                    <MenuItem
                      key={name}
                      value={name.value}
                      label={name.label}
                      style={getStyles(name, universityList, theme)}
                    >
                      {name.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default PendaftarFilter

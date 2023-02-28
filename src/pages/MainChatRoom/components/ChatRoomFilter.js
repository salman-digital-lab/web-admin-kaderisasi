import React, { useContext, useState } from "react"
import { Card, CardContent, TextField, Box, Button } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { ImportExport } from "@material-ui/icons"
import { AdminChatRoomContext } from "../../../context/AdminChatRoomContext"
import DateFnsUtils from "@date-io/date-fns"
import moment from "moment"
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import DatePicker from "../../../components/date-picker"

const ChatRoomFilter = () => {
  const theme = useTheme()
  let date = new Date()
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [startDate, setStartDate] = useState(firstDay)
  const [endDate, setEndDate] = useState(date)
  const [inputValue, setInputValue] = useState(moment().format("DD/MM/yyyy"))
  const { filterStudentCare, setFilterStudentCare } =
    useContext(AdminChatRoomContext)

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setFilterStudentCare({
        ...filterStudentCare,
        name: event.target.value,
        filter: true,
      })
    }
  }

  const handleInputStartDate = (date, value) => {
    setStartDate(date)
    setInputValue(value)
  }

  const handleInputEndDate = (date, value) => {
    setEndDate(date)
    setInputValue(value)
  }

  const handleExportTable = (start, end) => {
    console.log("print", start, end)
  }

  // const handleChangeGender = (s) => {
  //   setFilterStudentCare({
  //     ...filterStudentCare,
  //     gender: s,
  //     filter: true,
  //   })
  // }

  return (
    <>
      <Card>
        <CardContent className="filter-content">
          <Box>
            <Box className="filter-block">
              <TextField
                className="input-register"
                fullWidth
                size="small"
                label="Cari Curhatan"
                onKeyDown={handleKeyDown}
              />
              {isMobile ? (
                <Button
                  variant="contained"
                  className="btn-export-excel primary-button"
                  onClick={() => handleExportTable(startDate, endDate)}
                >
                  <ImportExport />
                </Button>
              ) : (
                <Button
                  className="btn-export-excel primary-button"
                  variant="contained"
                  startIcon={<ImportExport />}
                  onClick={() => handleExportTable(startDate, endDate)}
                >
                  Export Tabel
                </Button>
              )}
              <DatePicker
                value={startDate}
                onChange={handleInputStartDate}
                disableFuture
                label="Start Date"
              />
              <DatePicker
                value={endDate}
                onChange={handleInputEndDate}
                disablePast
                disableFuture
                label="End Date"
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
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default ChatRoomFilter

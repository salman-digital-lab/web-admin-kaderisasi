import React, { useContext } from "react"
import { Card, CardContent, TextField, Box } from "@material-ui/core"
import { AdminChatRoomContext } from "../../../context/AdminChatRoomContext"

const ChatRoomFilter = () => {
  const { filterUser, setFilterUser } = useContext(AdminChatRoomContext)

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
            <TextField
              id="filled-basic"
              size="small"
              label="Cari ..."
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
                  label="Perempuan"
                />
              </RadioGroup>
            </FormControl> */}
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default ChatRoomFilter

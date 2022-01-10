import React, { useContext } from "react"
import {
  Card,
  CardContent,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Input,
} from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import { AdminActivityContext } from "../../../context/AdminActivityContext"
import { MenuProps, getStyles } from "../../../components/select"

const PendaftarFilter = () => {
  const theme = useTheme()
  const { filterParticipantsActivity, setFilterParticipantsActivity } =
    useContext(AdminActivityContext)

  const statusList = [
    { value: -1, label: "Semua" },
    { value: "REGISTERED", label: "Registered" },
    { value: "JOINED", label: "Joined" },
    { value: "PASSED", label: "Passed" },
    { value: "FAILED", label: "Failed" },
    { value: "REJECTED", label: "Rejected" },
  ]

  const handleStatusChange = (s) => {
    setFilterParticipantsActivity({
      ...filterParticipantsActivity,
      status: s,
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
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default PendaftarFilter

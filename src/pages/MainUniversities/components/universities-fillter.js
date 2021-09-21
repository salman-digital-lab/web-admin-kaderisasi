import React, { useContext } from "react"
import { Card, CardContent, TextField, Box } from "@material-ui/core"
import "../../../assets/scss/AddActivity.scss"
import { UniversitasContext } from "../../../context/AdminUniversitasContext"

const UniversitiesFillter = () => {
  const { filterActivity, setFilterActivity } = useContext(UniversitasContext)

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setFilterActivity({
        ...filterActivity,
        search: event.target.value,
        filter: true,
      })
    }
  }

  return (
    <>
      <Card className="card-filter">
        <CardContent className="filter-content">
          <Box pl={5} pr={5}>
            <TextField
              id="filled-basic"
              size="small"
              label="Cari Universitas"
              variant="outlined"
              className="filter-input"
              onKeyDown={handleKeyDown}
            />
            {/* <Button variant="contained" color="primary" className="btn-filter"  >Cari</Button> */}
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default UniversitiesFillter

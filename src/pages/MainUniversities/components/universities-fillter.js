import React from "react"
import { Card, CardContent, Box, Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import "../../../assets/scss/AddActivity.scss"
// import { UniversitasContext } from "../../../context/AdminUniversitasContext"

const UniversitiesFillter = () => (
  // const { filterActivity, setFilterActivity } = useContext(UniversitasContext)

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     setFilterActivity({
  //       ...filterActivity,
  //       search: event.target.value,
  //       filter: true,
  //     })
  //   }
  // }

  <>
    <Card>
      <CardContent className="filter-content">
        <Box pl={5} pr={5}>
          <Link to="/university">
            <Button
              variant="contained"
              className="btn-tambah-kegiatan primary-button"
            >
              TAMBAH UNIVERSITAS
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
    <br />
    {/* <Card>
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
          </Box>
        </CardContent>
      </Card> */}
  </>
)

export default UniversitiesFillter

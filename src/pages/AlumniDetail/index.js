import React from "react"
import { Card, Box, CardContent } from "@material-ui/core"
import "../../assets/scss/MemberDetail.scss"
import AlumniDetail from "./components/AlumniDetail"
import AlumniTimeline from "./components/AlumniTimeline"
import AdminAlumniProvider from "../../context/AdminAlumniContext"

const AlumniSalmanDetail = () => (
  <AdminAlumniProvider>
    <div className="userdetail">
      <Card>
        <CardContent className="filter-content">
          <Box pl={5} pr={5}>
            <div className="userdetail-data">
              <AlumniDetail />
            </div>
          </Box>
        </CardContent>
      </Card>
    </div>
  </AdminAlumniProvider>
)

export default AlumniSalmanDetail

import React from "react"
import { Card, Box, CardContent } from "@material-ui/core"
import "../../assets/scss/MemberDetail.scss"
import MemberDetail from "./components/MemberDetail"
import MemberTimeline from "./components/MemberTimeline"
import AdminMemberProvider from "../../context/AdminMemberContext"
import { UniversitasProvider } from "../../context/AdminUniversitasContext"
import AdminRegionProvider from "../../context/AdminRegionContext"

const MemberSalmanDetail = () => (
  <AdminMemberProvider>
    <UniversitasProvider>
      <AdminRegionProvider>
        <div className="userdetail">
          <Card>
            <CardContent className="filter-content">
              <Box pl={5} pr={5}>
                <div className="userdetail-data">
                  <MemberDetail />
                  <br />
                  <MemberTimeline />
                </div>
              </Box>
            </CardContent>
          </Card>
        </div>
      </AdminRegionProvider>
    </UniversitasProvider>
  </AdminMemberProvider>
)

export default MemberSalmanDetail

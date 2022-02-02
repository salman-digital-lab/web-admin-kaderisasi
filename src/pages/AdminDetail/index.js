import React from "react"
import { Card, Box, CardContent } from "@material-ui/core"
import "../../assets/scss/DetailAdmin.scss"
import DetailAdmin from "./components/AdminDetail"
import AdminProvider from "../../context/AdminContext"

const AdminSalmanDetail = () => (
  <AdminProvider>
    <div className="userdetail">
      <Card>
        <CardContent className="filter-content">
          <Box>
            <DetailAdmin />
          </Box>
        </CardContent>
      </Card>
    </div>
  </AdminProvider>
)

export default AdminSalmanDetail

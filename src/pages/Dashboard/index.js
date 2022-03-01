import React from "react"
import "../../assets/scss/Dashboard.scss"
import { AdminDashboardProvider } from "../../context/AdminDashboardContext"
import ShowStatisticsChartComponent from "./component/ShowStatisticsChart"
import ShowGenderChartComponent from "./component/ShowGenderChart"
import Card from "./component/index-card"
import { Grid } from "@material-ui/core"
// Function Pemanggilan Component Card Statistic dan Table Statistic

const Dashboard = () => (
  <AdminDashboardProvider>
    <h1 style={{ color: "#25223C", fontWeight: "bold", marginBottom: "30px" }}>
      Dashboard
    </h1>
    <Card />
    <div className="container-card">
      <Grid container spacing={4}>
        <Grid item xs>
          <ShowStatisticsChartComponent />
        </Grid>
        <Grid item xs lg={3}>
          <ShowGenderChartComponent />
        </Grid>
      </Grid>
    </div>
  </AdminDashboardProvider>
)

export default Dashboard

/* eslint-disable */
import React from "react"
import "../../assets/scss/Dashboard.scss"
import { AdminDashboardProvider } from "../../context/AdminDashboardContext"
import TableStatistic from "./component/tabel-statistic"
import Card from "./component/index-card"
// Function Pemanggilan Component Card Statistic dan Table Statistic

const Dashboard = () => (
  <AdminDashboardProvider>
    <h1 style={{ color: "#999999" }}>Dashboard</h1>
    <div className="container-card">
      <Card />
    </div>
    <div className="container-card">
      <TableStatistic />
    </div>
  </AdminDashboardProvider>
)

export default Dashboard

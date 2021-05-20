import React from "react"
import "../../assets/scss/Dashboard.scss"
import TableStatistic from "./component/tabel-statistic"
import Card from "./component/index-card"
import { AdminDashboardProvider } from "../../context/AdminDashboardContext"
import { AdminContext } from "../../context/AdminContext"

//Function Pemanggilan Component Card Statistic dan Table Statistic

const Dashboard = () => {
    const {token} = React.useContext(AdminContext)
    return (
        <AdminDashboardProvider>
            <h1 style={{ color: '#999999' }}>Dashboard</h1>
            <div className="container-card">
                <Card/>
            </div>
            <div className="container-card">
                <TableStatistic/>
            </div>
        </AdminDashboardProvider>
    )
}

export default Dashboard
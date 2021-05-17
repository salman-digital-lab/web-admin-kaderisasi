import React from "react"
import "../../assets/scss/Dashboard.scss"
import TableStatistic from "./component/tabel-statistic"
import Card from "./component/index-card"
import { AdminContext } from "../../context/AdminContext"

//Function Pemanggilan Component Card Statistic dan Table Statistic

const Dashboard = () => {
    const {token} = React.useContext(AdminContext)
    console.log(token)
    return (
        <>
            <h1 style={{ color: '#999999' }}>Dashboard</h1>
            <div className="container-card">
                <Card/>
            </div>
            <div className="container-card">
                <TableStatistic/>
            </div>
        </>
    )
}

export default Dashboard
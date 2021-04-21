import React from "react"
import "../../assets/scss/Dashboard.scss"
import TableStatistic from "./component/tabel-statistic"
import Card from "./component/index-card"

//Function Pemanggilan Component Card Statistic dan Table Statistic
const Dashboard = () => {
    console.log(process.env.REACT_APP_BASE_URL)
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
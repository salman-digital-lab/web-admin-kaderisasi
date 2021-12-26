import React, { useState } from "react"
import { Box, Typography } from "@material-ui/core"
import ActivistChart from "./chart/ActivistChart"
import CampusChart from "./chart/CampusChart"
import JoinChart from "./chart/JoinChart"
import DashboardChartTabs from "./DashboardChartTabs"

export default function ShowStatisticsChart() {
  const [chart, setChart] = useState(<ActivistChart />)
  const [tabValue, setTabValue] = React.useState(0)

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue)
    switch (newValue) {
      case 0:
        setChart(<ActivistChart />)
        break
      case 1:
        setChart(<CampusChart />)
        break
      case 2:
        setChart(<JoinChart />)
        break

      default:
        setChart(<ActivistChart />)
        break
    }
  }

  return (
    <Box
      component="div"
      style={{ backgroundColor: "#fff", borderRadius: "1em" }}
    >
      <Box
        component="div"
        style={{
          display: "flex",
          padding: "2em",
        }}
      >
        <Typography
          variant="h5"
          style={{
            fontWeight: "bold",
            color: "#25223C",
          }}
        >
          Tren Persebaran
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <DashboardChartTabs value={tabValue} onChange={handleChangeTab} />
      </Box>
      <div
        style={{ minHeight: "450px", boxSizing: "border-box", padding: "2em" }}
      >
        {chart}
      </div>
    </Box>
  )
}

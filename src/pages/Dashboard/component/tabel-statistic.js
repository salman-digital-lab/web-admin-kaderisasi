import React, { useState } from "react"
import { Button } from "@material-ui/core"
import AktivisChart from "./chart/Aktivis-chart"
import KampusChart from "./chart/Kampus-chart"
import JoinChart from "./chart/Join-chart"
import GenderChart from "./chart/Gender-chart"

const TableStatistic = () => {
  const [chart, setChart] = useState(<AktivisChart />)
  const [status, setStatus] = useState("aktivis")

  const btnAktivis = (e) => {
    e.preventDefault()
    setStatus("aktivis")
    setChart(<AktivisChart />)
  }
  const btnKampus = (e) => {
    e.preventDefault()
    setStatus("kampus")
    setChart(<KampusChart />)
  }
  const btnJoin = (e) => {
    e.preventDefault()
    setStatus("bergabung")
    setChart(<JoinChart />)
  }
  const btnGender = (e) => {
    e.preventDefault()
    setStatus("gender")
    setChart(<GenderChart />)
  }
  return (
    <div className="tabel-statistic">
      <div className="nav-tabel-statistic">
        <div className="container-button">
          <Button
            variant={status === "aktivis" ? "contained" : "outlined"}
            className="btn-statistic btn-chart"
            color="primary"
            onClick={btnAktivis}
          >
            Aktivis
          </Button>
          <Button
            variant={status === "kampus" ? "contained" : "outlined"}
            className="btn-statistic btn-chart"
            color="primary"
            onClick={btnKampus}
          >
            Kampus
          </Button>
          <Button
            variant={status === "bergabung" ? "contained" : "outlined"}
            className="btn-statistic btn-chart"
            color="primary"
            onClick={btnJoin}
          >
            Bergabung
          </Button>
          <Button
            variant={status === "gender" ? "contained" : "outlined"}
            className="btn-statistic btn-chart"
            color="primary"
            onClick={btnGender}
          >
            Gender
          </Button>
        </div>
      </div>
      <div className="content-tabel-statistic">{chart}</div>
    </div>
  )
}

export default TableStatistic

import React, { useState } from "react"
import { Box, Typography } from "@material-ui/core"
import GenderChart from "./chart/GenderChart"

export default function ShowGenderChartComponent() {
  const [male, setMale] = useState(0)
  const [female, setFemale] = useState(0)
  const malePercentage = () => {
    let percentage = 0
    if (male + female !== 0) {
      percentage = (100 * male) / (male + female)
    }
    return Math.round(percentage)
  }
  const femalePercentage = () => {
    let percentage = 0
    if (male + female !== 0) {
      percentage = (100 * female) / (male + female)
    }
    return Math.round(percentage)
  }

  return (
    <Box
      component="div"
      style={{
        backgroundColor: "#1F99CC",
        borderRadius: "1em",
        padding: "1em",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        style={{ fontWeight: "bold", color: "#fff" }}
      >
        Persebaran Gender
      </Typography>
      <Box
        component="span"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "15px 0 0 0",
        }}
      >
        <Box component="div" style={{ display: "flex" }}>
          <Box
            component="span"
            style={{
              display: "block",
              height: "12px",
              width: "40px",
              backgroundColor: "#FF7B40",
              margin: "3px 6px",
            }}
          ></Box>
          <Typography variant="body2" style={{ color: "#fff" }}>
            Pria
          </Typography>
        </Box>
        <Box component="div" style={{ display: "flex" }}>
          <Box
            component="span"
            style={{
              display: "block",
              height: "12px",
              width: "40px",
              backgroundColor: "#FFD600",
              margin: "3px 6px",
            }}
          ></Box>
          <Typography variant="body2" style={{ color: "#fff" }}>
            Wanita
          </Typography>
        </Box>
      </Box>
      <div
        style={{
          minHeight: 0,
          boxSizing: "border-box",
          padding: "2em 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GenderChart setMale={setMale} setFemale={setFemale} />
      </div>
      <Typography variant="body1" align="center" style={{ color: "#fff" }}>
        {`Persebaran gender terdiri dari ${malePercentage()}% pria dan ${femalePercentage()}% wanita`}
      </Typography>
    </Box>
  )
}

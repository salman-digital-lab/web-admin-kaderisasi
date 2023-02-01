import { Box, Typography } from "@material-ui/core"
import React from "react"

export default function CardDashboard({ icon, title, value }) {
  return (
    <Box
      style={{ backgroundColor: "#fff", borderRadius: "0.5em", padding: "1em" }}
    >
      <Box
        component="span"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E4F2F8",
          borderRadius: "5px",
          height: "54px",
          width: "54px",
          color: "#1F99CC",
          marginBottom: "10px",
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" style={{ color: "#9f9f9f", fontWeight: 400 }}>
        {title}
      </Typography>
      <Typography
        variant="h4"
        style={{ color: "#25223C", fontWeight: "bolder" }}
      >
        {value}
      </Typography>
    </Box>
  )
}

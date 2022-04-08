import React, { useContext, useEffect } from "react"
import CardDashboard from "./CardDashboard"
import { AdminDashboardContext } from "../../../context/AdminDashboardContext"
import { Grid } from "@material-ui/core"

const Card = () => {
  const { valueMapping, functions } = useContext(AdminDashboardContext)
  const { CardData, GetAllMember } = functions
  const data = [...CardData]
  useEffect(() => {
    if (valueMapping.status === null) {
      GetAllMember()
    }
  })

  return (
    <Grid
      container
      spacing={4}
      style={{ display: "flex", marginBottom: "30px" }}
    >
      {data.map((e) => (
        <Grid item xs={12} md={6} lg={3} key={`${e.value}_${e.title}`}>
          <CardDashboard
            color={e.color}
            icon={e.icon}
            title={e.title}
            text={e.text}
            value={e.value}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default Card

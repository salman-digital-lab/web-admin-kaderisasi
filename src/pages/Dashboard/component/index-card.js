import React, { useContext, useEffect } from "react"
import CardDashboard from "./CardDashboard"
import { AdminDashboardContext } from "../../../context/AdminDashboardContext"
import { Grid } from "@material-ui/core"

const Card = () => {
  const { cardData, functions } = useContext(AdminDashboardContext)
  const { GetAllMember } = functions

  useEffect(() => {
    GetAllMember()
  }, [])

  return (
    <Grid
      container
      spacing={4}
      style={{ display: "flex", marginBottom: "30px" }}
    >
      {cardData.map((e) => (
        <Grid item xs={12} md={6} lg={3} key={`${e.value}_${e.title}`}>
          <CardDashboard
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

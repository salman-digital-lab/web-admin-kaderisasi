import React, { useContext, useEffect } from "react"
import CardDashboard from "./CardDashboard"
import { AdminDashboardContext } from "../../../context/AdminDashboardContext"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Grid } from "@material-ui/core"

const Card = () => {
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.between("xs", "sm"))
  const sm = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const md = useMediaQuery(theme.breakpoints.between("md", "lg"))
  const lg = useMediaQuery(theme.breakpoints.up("lg"))
  const { functions } = useContext(AdminDashboardContext)
  const { CardData, GetAllMember } = functions
  const data = [...CardData]
  useEffect(() => {
    GetAllMember()
  }, [GetAllMember])

  const getWidthValues = () => {
    return (xs && "50%") || (sm && "40%") || (md && "40%") || (lg && "25%")
  }

  return (
    <Grid
      container
      spacing={4}
      style={{
        display: "flex",
        marginBottom: "30px",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {data.map((e) => (
        <Grid
          item
          xs
          md
          lg
          key={`${e.value}_${e.title}`}
          style={{
            minWidth: getWidthValues(),
          }}
        >
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

import React, { useContext, useEffect } from "react"
import CardDashboard from "./card-dashboard"
import { AdminDashboardContext } from "../../../context/AdminDashboardContext"

const Card = () => {
  const { valueMapping, functions } = useContext(AdminDashboardContext)
  const { CardData, GetAllMember } = functions
  const data = [...CardData]
  useEffect(() => {
    if (valueMapping.status === null) {
      GetAllMember()
    }
  }, [])

  return (
    <>
      {data.map((e) => (
        <CardDashboard
          key={e}
          color={e.color}
          icon={e.icon}
          title={e.title}
          text={e.text}
          value={e.value}
        />
      ))}
    </>
  )
}

export default Card

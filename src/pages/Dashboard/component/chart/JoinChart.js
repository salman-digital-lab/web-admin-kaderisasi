import React, { useEffect, useContext } from "react"
import { Line } from "react-chartjs-2"
import { AdminDashboardContext } from "../../../../context/AdminDashboardContext"

export default function JoinChart() {
  const { functions, joinBar } = useContext(AdminDashboardContext)
  const { GetJoin } = functions

  useEffect(() => {
    GetJoin()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Line
        data={joinBar}
        id="chart"
        base={10}
        options={{
          layout: {
            margin: {
              left: 50,
              right: 0,
              top: 0,
              bottom: 500,
            },
          },
          title: {
            display: true,
            text: "Trend Persebaran Data Jumlah Bergabung",
            fontSize: 25,
            padding: 20,
          },
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            onClick: (e) => e.stopPropagation(),
          },
          scales: {
            yAxes: [
              {
                position: "left",
                ticks: {
                  suggestedMin: 1,
                  beginAtZero: true,
                },
              },
            ],
          },
          skipNull: true,
        }}
      />
    </>
  )
}

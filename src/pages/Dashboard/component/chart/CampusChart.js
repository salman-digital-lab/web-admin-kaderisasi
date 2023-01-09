import React, { useContext, useEffect } from "react"
import { Bar } from "react-chartjs-2"
import { AdminDashboardContext } from "../../../../context/AdminDashboardContext"

export default function CampusChart() {
  const { functions, kampusBar } = useContext(AdminDashboardContext)
  const { GetKampus } = functions

  useEffect(() => {
    GetKampus()
  }, [])

  return (
    <>
      <Bar
        id="chart"
        data={kampusBar}
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
            text: "Trend Persebaran Data Kampus",
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
                ticks: {
                  suggestedMin: 1,
                  beginAtZero: true,
                  userCallback: function (value, index, values) {
                    value = value.toString()
                    value = value.split(/(?=(?:...)*$)/)
                    value = value.join(",")
                    return value
                  },
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

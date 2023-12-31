import React, { useEffect, useContext } from "react"
import { Line } from "react-chartjs-2"
import { AdminDashboardContext } from "../../../../context/AdminDashboardContext"

export default function JoinChart() {
  const { JoinState, functions, JoinBar, setJoinBar } = useContext(
    AdminDashboardContext
  )
  const { colors, GetJoin } = functions
  // sort by value
  function compare(a, b) {
    const valueA = a.tahun
    const valueB = b.tahun
    let comparison = 0
    if (valueA > valueB) {
      comparison = 1
    } else if (valueA < valueB) {
      comparison = -1
    }
    return comparison
  }
  if (JoinState !== undefined) {
    JoinState.sort(compare)
  }

  useEffect(() => {
    setJoinBar({
      labels: [],
      datasets: [],
      status: null,
    })
    if (JoinBar.status === null) {
      GetJoin()
    }
    // eslint-disable-next-line
  }, [])

  if (JoinState !== undefined) {
    JoinState.forEach((e) => {
      // create labels
      let labelIndex = JoinBar.labels.indexOf(e.tahun)
      if (labelIndex === -1) {
        labelIndex = JoinBar.labels.length
        JoinBar.labels.push(e.tahun)
        // dummy entries for each dataset for the label
        JoinBar.datasets.forEach((dataset) => {
          dataset.data.push(0)
        })
      }

      // get the area dataset
      let area = JoinBar.datasets.filter(
        (data) => data.label === e.jenis_member
      )[0]
      // otherwise create it
      if (area === undefined) {
        area = {
          label: e.jenis_member,
          data: JoinBar.labels.map(() => 0),
          fill: false,
          backgroundColor: colors[JoinBar.datasets.length],
          borderColor: colors[JoinBar.datasets.length],
        }
        JoinBar.datasets.push(area)
      }

      // set the value
      area.data[labelIndex] = e.jumlah_member
    })
  }

  return (
    <>
      <Line
        data={JoinBar}
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

import React, { useContext, useEffect } from "react"
import { Bar } from "react-chartjs-2"
import { AdminDashboardContext } from "../../../../context/AdminDashboardContext"

const KampusChart = () => {
  const { KampusState, functions, KampusBar, setKampusBar } = useContext(
    AdminDashboardContext
  )
  const { colors, GetKampus } = functions
  // sort by value
  function compare(a, b) {
    const valueA = a.jenis_member.toUpperCase()
    const valueB = b.jenis_member.toUpperCase()
    let comparison = 0
    if (valueA > valueB) {
      comparison = 1
    } else if (valueA < valueB) {
      comparison = -1
    }
    return comparison
  }
  if (KampusState !== undefined) {
    KampusState.sort(compare)
  }

  useEffect(() => {
    setKampusBar({
      labels: [],
      datasets: [],
      status: null,
    })

    if (KampusBar.status === null) {
      GetKampus()
    }
  }, [])

  if (KampusState !== undefined) {
    KampusState.forEach((e) => {
      // create labels
      let labelIndex = KampusBar.labels.indexOf(e.nama_universitas)
      if (labelIndex === -1) {
        labelIndex = KampusBar.labels.length
        KampusBar.labels.push(e.nama_universitas)
        // dummy entries for each dataset for the label
        KampusBar.datasets.forEach((dataset) => {
          dataset.data.push(0)
        })
      }

      // get the area dataset
      let area = KampusBar.datasets.filter(
        (data) => data.label === e.jenis_member
      )[0]
      // otherwise create it
      if (area === undefined) {
        area = {
          label: e.jenis_member,
          data: KampusBar.labels.map(() => 0),
          fill: false,
          backgroundColor: colors[KampusBar.datasets.length],
          borderColor: colors[KampusBar.datasets.length],
        }
        KampusBar.datasets.push(area)
      }

      // set the value
      area.data[labelIndex] = e.jumlah_permember
    })
  }
  return (
    <>
      <div className="container-chart">
        <Bar
          data={KampusBar}
          id="chart"
          base={10}
          aria-orientation="horizontal"
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
              xAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    min: 0,
                    callback: (value) => value.toLocaleString(),
                  },
                },
              ],
            },
            skipNull: true,
          }}
        />
      </div>
    </>
  )
}

export default KampusChart

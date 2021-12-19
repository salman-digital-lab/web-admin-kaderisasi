import axios from "axios"
import React, { useEffect, useState } from "react"
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

// ChartJS.register(ArcElement, Tooltip, Legend)

export default function GenderChart({
  setMale = () => {},
  setFemale = () => {},
}) {
  const [data, setData] = useState({})

  useEffect(() => {
    axios
      .get(
        "https://admin-api-kaderisasi-dev.salmanitb.com/v1/dashboard/get/all/gender"
      )
      .then((res) => {
        console.log(res.data.data)
        const result = res?.data?.data ?? []
        const male = result.find((value) => value.gender === "M").jumlah
        const female = result.find((value) => value.gender === "F").jumlah
        setMale(result.find((value) => value.gender === "M").jumlah)
        setFemale(result.find((value) => value.gender === "F").jumlah)
        data.datasets.data = [female, male]
        setData({
          labels: ["Wanita", "Pria"],
          datasets: [
            {
              label: "# of Genders",
              data: [female, male],
              backgroundColor: ["#FFD600", "#FF7B40"],
              borderWidth: 0,
            },
          ],
        })
      })
      .catch((error) => {
        console.log(error)
      })
    // eslint-disable-next-line
  }, [])

  return (
    <Pie
      data={data}
      options={{ responsive: true, legend: { display: false } }}
      redraw
    />
  )
}

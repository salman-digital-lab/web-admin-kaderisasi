import React, { useState } from "react"
import EqualizerIcon from "@material-ui/icons/Equalizer"
import axios from "axios"

export const AdminDashboardContext = React.createContext()
/* eslint-disable */
export const AdminDashboardProvider = (props) => {
  const [cardData, setCardData] = useState([])

  const [aktivisBar, setAktivisBar] = useState({
    labels: [],
    datasets: [],
    status: null,
  })

  const [kampusBar, setKampusBar] = useState({
    labels: [],
    datasets: [],
    status: null,
  })

  const [joinBar, setJoinBar] = useState({
    labels: [],
    datasets: [],
    status: null,
  })

  const colors = ["#61B15A", "#73C5D0", "#1C6C7D", "#FFA72E", "#FFD700"]
  const jenis_gender = ["Pria", "Wanita"] // add as many colors as there will be areas (maximum)

  const GetAllMember = () => {
    axios
      .get(
        process.env.REACT_APP_ADMIN_BACKEND_BASE_URL +
          "/v1/dashboard/get/all/member"
      )
      .then((res) => {
        if (res.data.status.toLowerCase() !== "success") {
          return
        }
        const data = res.data.data

        const tempCardData = data.map((e) => ({
          icon: <EqualizerIcon fontSize="large" />,
          color: "#61B15A",
          title: `Jumlah ${e.name}`,
          value: e.total,
        }))

        setCardData(tempCardData)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const GetAktivis = () => {
    axios
      .get(
        process.env.REACT_APP_ADMIN_BACKEND_BASE_URL +
          `/v1/dashboard/get/all/provinces`
      )
      .then((res) => {
        const data = res.data.data

        const labels = new Set()
        const roles = new Set()

        const tempBarData = {}
        const tempBarDataset = []

        data.forEach((e) => {
          labels.add(e.nama_provinsi)
          roles.add(e.jenis_member)
          tempBarData[e.jenis_member] =
            tempBarData[e.jenis_member] || Array.from(labels).map(() => 0)
          const labelIndex = [...labels].indexOf(e.nama_provinsi)
          tempBarData[e.jenis_member][labelIndex] = e.jumlah_member
        })

        Array.from(roles).forEach((role, i) => {
          tempBarDataset.push({
            label: role,
            data: tempBarData[role],
            fill: false,
            backgroundColor: colors[i],
            borderColor: colors[i],
          })
        })

        setAktivisBar({
          labels: [...labels],
          datasets: tempBarDataset,
          status: res.data.status,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const GetKampus = () => {
    axios
      .get(
        process.env.REACT_APP_ADMIN_BACKEND_BASE_URL +
          "/v1/dashboard/get/all/universities"
      )
      .then((res) => {
        const data = res.data.data

        const labels = new Set()
        const roles = new Set()

        const tempBarData = {}
        const tempBarDataset = []

        data.forEach((e) => {
          labels.add(e.nama_universitas)
          roles.add(e.jenis_member)
          tempBarData[e.jenis_member] =
            tempBarData[e.jenis_member] || Array.from(labels).map(() => 0)
          const labelIndex = [...labels].indexOf(e.nama_universitas)
          tempBarData[e.jenis_member][labelIndex] = e.jumlah_member
        })

        Array.from(roles).forEach((role, i) => {
          tempBarDataset.push({
            label: role,
            data: tempBarData[role],
            fill: false,
            backgroundColor: colors[i],
            borderColor: colors[i],
          })
        })

        setKampusBar({
          labels: [...labels],
          datasets: tempBarDataset,
          status: res.data.status,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const GetJoin = () => {
    axios
      .get(
        process.env.REACT_APP_ADMIN_BACKEND_BASE_URL +
          "/v1/dashboard/get/all/years"
      )
      .then((res) => {
        const data = res.data.data

        const labels = new Set()
        const roles = new Set()

        const tempBarData = {}
        const tempBarDataset = []

        data.forEach((e) => {
          labels.add(e.tahun)
          roles.add(e.jenis_member)
          tempBarData[e.jenis_member] =
            tempBarData[e.jenis_member] || Array.from(labels).map(() => 0)
          const labelIndex = [...labels].indexOf(e.tahun)
          tempBarData[e.jenis_member][labelIndex] = e.jumlah_member
        })

        Array.from(roles).forEach((role, i) => {
          tempBarDataset.push({
            label: role,
            data: tempBarData[role],
            fill: false,
            backgroundColor: colors[i],
            borderColor: colors[i],
          })
        })

        setJoinBar({
          labels: [...labels],
          datasets: tempBarDataset,
          status: res.data.status,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const functions = {
    colors,
    jenis_gender,
    GetAllMember,
    GetAktivis,
    GetKampus,
    GetJoin,
  }

  return (
    <AdminDashboardContext.Provider
      value={{
        cardData,
        setCardData,
        functions,
        aktivisBar,
        setAktivisBar,
        kampusBar,
        setKampusBar,
        joinBar,
        setJoinBar,
      }}
    >
      {props.children}
    </AdminDashboardContext.Provider>
  )
}

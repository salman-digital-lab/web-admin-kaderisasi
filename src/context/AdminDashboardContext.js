import React, { useState } from "react"
import EqualizerIcon from "@material-ui/icons/Equalizer"
import axios from "axios"

export const AdminDashboardContext = React.createContext()
/* eslint-disable */
export const AdminDashboardProvider = (props) => {
  const [valueMapping, setValueMapping] = useState({
    jumlah_member: 0,
    jamaah: 0,
    aktivis: 0,
    kader: 0,
    ssc: 0,
    lmd: 0,
    spectra: 0,
    status: null,
  })
  const [AktivisState, setAktivisState] = useState()
  const [KampusState, setKampusState] = useState()
  const [JoinState, setJoinState] = useState()

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

  const CardData = [
    {
      icon: <PeopleOutlineIcon fontSize="large" />,
      color: "#61B15A",
      title: "Jumlah Akun",
      text: "Akun",
      value: valueMapping.jumlah_member,
    },
    {
      icon: <EqualizerIcon fontSize="large" />,
      color: "#73C5D0",
      title: "Jumlah Jamaah",
      text: "Jamaah",
      value: valueMapping.jamaah,
    },
    {
      icon: <EqualizerIcon fontSize="large" />,
      color: "#1C6C7D",
      title: "Jumlah Aktivis",
      text: "Aktivis",
      value: valueMapping.aktivis,
    },
    {
      icon: <EqualizerIcon fontSize="large" />,
      color: "#FFA72E",
      title: "Jumlah Kader",
      text: "Kader",
      value: valueMapping.kader,
    },
    {
      icon: <EqualizerIcon fontSize="large" />,
      color: "#FFA72E",
      title: "Jumlah SSC",
      text: "SSC",
      value: valueMapping.ssc,
    },
    {
      icon: <EqualizerIcon fontSize="large" />,
      color: "#FFA72E",
      title: "Jumlah LMD",
      text: "LMD",
      value: valueMapping.lmd,
    },
    {
      icon: <EqualizerIcon fontSize="large" />,
      color: "#FFA72E",
      title: "Jumlah Spectra",
      text: "Spectra",
      value: valueMapping.spectra,
    },
  ]

  const colors = [
    "rgba(28, 108, 125, 1)",
    "rgba(115, 197, 208, 1)",
    "rgba(255, 167, 46, 1)",
  ]
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

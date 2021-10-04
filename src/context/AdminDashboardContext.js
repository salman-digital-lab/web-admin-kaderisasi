import React, { useState } from "react"
import EqualizerIcon from "@material-ui/icons/Equalizer"
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline"
import axios from "axios"

export const AdminDashboardContext = React.createContext()
/* eslint-disable */
export const AdminDashboardProvider = (props) => {
  const [valueMapping, setValueMapping] = useState({
    jumlah_member: 0,
    jamaah: 0,
    aktivis: 0,
    kader: 0,
    status: null,
  })
  const [AktivisState, setAktivisState] = useState()
  const [KampusState, setKampusState] = useState()
  const [JoinState, setJoinState] = useState()

  const [barData, setBarData] = useState({
    labels: [],
    datasets: [],
    status: null,
  })

  const [AktivisBar, setAktivisBar] = useState({
    labels: [],
    datasets: [],
    status: null,
  })

  const [KampusBar, setKampusBar] = useState({
    labels: [],
    datasets: [],
    status: null,
  })

  const [JoinBar, setJoinBar] = useState({
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
      color: "#1C6C7D",
      title: "Jumlah Aktivis",
      text: "Aktivis",
      value: valueMapping.aktivis,
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
      color: "#FFA72E",
      title: "Jumlah Member",
      text: "Member",
      value: valueMapping.kader,
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
        "https://admin-api-kaderisasi-dev.salmanitb.com/v1/dashboard/get/all/member"
      )
      .then((res) => {
        const data = res.data.data
        console.log(data)
        const tmp = {
          jumlah: 0,
          aktivis: 0,
          jamaah: 0,
          kader: 0,
        }

        data.forEach((e) => {
          if (e.name === "Aktivis") {
            tmp.aktivis = e.jumlah
          } else if (e.name === "Jamaah") {
            tmp.jamaah = e.jumlah
          } else if (e.name === "Kader") {
            tmp.kader = e.jumlah
          } else if (e.name === "jumlah_member") {
            tmp.jumlah = e.value
          }
        })

        setValueMapping({
          ...valueMapping,
          jumlah_member: tmp.jumlah,
          jamaah: tmp.jamaah,
          aktivis: tmp.aktivis,
          kader: tmp.kader,
          status: "success",
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const GetAktivis = () => {
    axios
      .get(
        `https://admin-api-kaderisasi-dev.salmanitb.com/v1/dashboard/get/all/provinces`
      )
      .then((res) => {
        const result = res.data.data

        setAktivisState(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const GetKampus = () => {
    axios
      .get(
        "https://admin-api-kaderisasi-dev.salmanitb.com/v1/dashboard/get/all/universities"
      )
      .then((res) => {
        const result = res.data.data

        setKampusState(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const GetJoin = () => {
    axios
      .get(
        "https://admin-api-kaderisasi-dev.salmanitb.com/v1/dashboard/get/all/years"
      )
      .then((res) => {
        let result = res.data.data
        setJoinState(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const functions = {
    barData,
    CardData,
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
        valueMapping,
        setValueMapping,
        functions,
        AktivisState,
        setAktivisState,
        KampusState,
        setKampusState,
        JoinState,
        setJoinState,
        barData,
        setBarData,
        AktivisBar,
        setAktivisBar,
        KampusBar,
        setKampusBar,
        JoinBar,
        setJoinBar,
      }}
    >
      {props.children}
    </AdminDashboardContext.Provider>
  )
}

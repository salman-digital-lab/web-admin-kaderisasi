import React, { createContext, useState } from "react"
import axios from "axios"
/* eslint-disable */
export const AdminRegionContext = createContext()
const AdminRegionProvider = (props) => {
  const [provinces, setProvinces] = useState({})
  const [regencies, setRegencies] = useState({})
  const [districts, setDistricts] = useState({})
  const [villages, setVillages] = useState({})

  /*
    Get all provinces
  */
  const getProvinces = async () => {
    setProvinces({})
    axios
      .get(`${process.env.REACT_APP_ADMIN_BACKEND_BASE_URL}/v1/regions/provinces`)
      .then((res) => {
        setProvinces(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /*
    Get all regency by id province
  */
  const getRegencies = async (id) => {
    setRegencies({})
    axios
      .get(`${process.env.REACT_APP_ADMIN_BACKEND_BASE_URL}/v1/regions/regencies/${id}`)
      .then((res) => {
        setRegencies(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /*
    Get all districts by id regency
  */
  const getDistricts = async (id) => {
    setDistricts({})
    axios
      .get(`${process.env.REACT_APP_ADMIN_BACKEND_BASE_URL}/v1/regions/districts/${id}`)
      .then((res) => {
        setDistricts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /*
    Get all villages by id district
  */
  const getVillages = async (id) => {
    setVillages({})
    axios
      .get(`${process.env.REACT_APP_ADMIN_BACKEND_BASE_URL}/v1/regions/villages/${id}`)
      .then((res) => {
        setVillages(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const functions = {
    getProvinces,
    getRegencies,
    getDistricts,
    getVillages,
  }

  return (
    <AdminRegionContext.Provider
      value={{
        provinces,
        regencies,
        districts,
        villages,
        functions,
      }}
    >
      {props.children}
    </AdminRegionContext.Provider>
  )
}
export default AdminRegionProvider

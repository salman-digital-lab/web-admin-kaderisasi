import React, { createContext, useState } from "react"
import axios from "axios"

export const AdminKomprofContext = createContext()
const AdminKomprofProvider = (props) => {
  const [state, setState] = useState(null)
  const [filterKomprof, setFilterKomprof] = useState({
    filter: false,
    name: "",
  })
  const [loading, setLoading] = useState(false)
  const [listKomprof, setListKomprof] = useState([])
  const [komprofForm, setKomprofForm] = useState([])
  const [openAlert, setOpenAlert] = useState(false)

  /* 
    Get all data Komprof
 */

  const getAllDataKomprof = (params) => {
    setLoading(true)
    let paramsQuery = "?"
    if (params) {
      Object.keys(params).map((x, i) => {
        i === Object.keys(params).length - 1
          ? (paramsQuery += x + "=" + params[x].toString())
          : (paramsQuery += x + "=" + params[x].toString() + "&")
      })
    }
    axios
      .get(
        process.env.REACT_APP_ADMIN_BACKEND_BASE_URL +
          `/v1/komprof` +
          paramsQuery
      )
      .then((res) => {
        setListKomprof(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /*
    @params
    id: integer

    Get data komprof where id = params.id
  */

  const getKomprofDetail = (id) => {
    setKomprofForm({})
    axios
      .get(process.env.REACT_APP_ADMIN_BACKEND_BASE_URL + `/v1/komprof/${id}`)
      .then((res) => {
        console.log("detail", res.data)
        const form = res.data
        setKomprofForm(form)
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }

  /*
    @params
    formdata: object

    Create new Komprof
  */
  const addDataKomprof = (formData) => {
    let result = null
    axios
      .post(
        process.env.REACT_APP_ADMIN_BACKEND_BASE_URL + `/v1/komprof/`,
        formData
      )
      .then((res) => {
        getAllDataKomprof({ page: 1, perPage: 10 })
        result = res
        return result
      })
      .catch((err) => {
        console.log(err)
        return result
      })
  }

  /*
    @params
    id: integer
    formData: object

    update data komprof where id = params.id
  */
  const editDataKomprof = (id, formData) => {
    let result = null
    axios
      .put(
        process.env.REACT_APP_ADMIN_BACKEND_BASE_URL + `/v1/komprof/${id}`,
        formData
      )
      .then((res) => {
        getAllDataKomprof({ page: 1, perPage: 5 })
        result = res
        return result
      })
      .catch((err) => {
        console.log(err)
        return result
      })
  }

  const functions = {
    getAllDataKomprof,
    getKomprofDetail,
    addDataKomprof,
    editDataKomprof,
  }

  return (
    <AdminKomprofContext.Provider
      value={{
        data: state,
        setData: setState,
        listKomprof,
        komprofForm,
        setKomprofForm,
        filterKomprof,
        setFilterKomprof,
        openAlert,
        setOpenAlert,
        loading,
        setLoading,
        functions,
      }}
    >
      {props.children}
    </AdminKomprofContext.Provider>
  )
}
export default AdminKomprofProvider

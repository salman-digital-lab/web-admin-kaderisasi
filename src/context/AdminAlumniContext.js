import React, { createContext, useState } from "react"
import axios from "axios"
/* eslint-disable */
export const AdminAlumniContext = createContext()
const AdminAlumniProvider = (props) => {
const [state, setState] = useState(null)
  const [filterAlumni, setFilterAlumni] = useState({
    filter: false,
    search_query: "",
  })
  const [alumni, setAlumni] = useState([])
  const [listAlumni, setListAlumni] = useState([])
  const [dataAlumni, setDataAlumni] = useState({})
  const [alumniForm, setAlumniForm] = useState({})
  const [updateAlumniResp, setUpdateAlumniResp] = useState({})
  const [errMessage, setErrMessage] = useState()
  const [alumniRoles, setAlumniRoles] = useState([])

  /*
    Get All Alumni
  */

const getAlumni = async (params) => {
    setAlumni({})
    let paramsQuery = "?"
    Object.keys(params).forEach((x, i) => {
        if (i === Object.keys(params).length - 1) {
        paramsQuery += `${x}=${params[x].toString()}`
        } else {
        paramsQuery += `${x}=${params[x].toString()}&`
        }
    })
    let result = null

    axios
        .get(`${process.env.REACT_APP_ADMIN_BACKEND_BASE_URL}/v1/alumni${paramsQuery}`)
        .then((res) => {
        result = res.data.data.data
        setListAlumni(result)
        setAlumni(res.data)
        })
        .catch((err) => {
        console.log(err)
        })
    }

    /*
      @params
      id: integer
    
      Get alumni where id = params.id
    */
  const getAlumniDetail = async (id) => {
    axios
      .get(`${process.env.REACT_APP_ADMIN_BACKEND_BASE_URL}/v1/alumni/${id}`)
      .then((res) => {
        const form = res.data.data
        setAlumniForm(form)
        return form
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }

  /*
    Add Alumni
  */
    const addDataAlumni = (formData) => {
      axios
        .post(`${process.env.REACT_APP_ADMIN_BACKEND_BASE_URL}/v1/alumni`, formData)
        .then((res) => {
          const { data } = res
          getAlumni({ page: 1, page_size: 5 })
          setDataAlumni(data)
          return dataAlumni
        })
        .catch((err) => {
          console.log(err)
          setErrMessage(err.response.status)
          return false
        })
    }

  /*
      @params
      id: integer
    
      update alumni where id = params.id
    */
      const updateAlumniById = (id, formData) => {
        setUpdateAlumniResp({})
        axios
          .put(`${process.env.REACT_APP_ADMIN_BACKEND_BASE_URL}/v1/alumni/${id}`, formData)
          .then((res) => {
            const { data } = res
            console.log(data)
            setUpdateAlumniResp(data)
            getAlumniDetail(id)
          })
          .catch((err) => {
            console.log(err)
            setErrMessage(err.response.status)
            return false
          })
      }

      /*
      @params
      id: integer
    
      delete alumni where id = params.id
    */
  const deleteAlumniById = (id) => {
    axios
      .delete(`${process.env.REACT_APP_ADMIN_BACKEND_BASE_URL}/v1/alumni/${id}`)
      .then((res) => {
        setState(null);
        setTimeout(() => {
          window.location.href = "/alumni"
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }

    const functions = {
        getAlumni,
        getAlumniDetail,
        updateAlumniById,
        deleteAlumniById,
        addDataAlumni,
    } 

    return (
        <AdminAlumniContext.Provider
         value={{
            data: state,
            setData: setState,
            alumni,
            listAlumni,
            alumniForm,
            filterAlumni,
            setFilterAlumni,
            errMessage,
            setErrMessage,
            updateAlumniResp,
            setUpdateAlumniResp,
            dataAlumni,
            setDataAlumni,
            alumniRoles,
            functions,
         }}
         >
            {props.children}
        </AdminAlumniContext.Provider>
    )

}
export default AdminAlumniProvider
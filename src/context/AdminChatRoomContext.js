import React, { createContext, useState } from "react"
import axios from "axios"
/* eslint-disable */
export const AdminChatRoomContext = createContext()
const AdminChatRoomProvider = (props) => {
  const [state, setState] = useState(null)
  const [filterStudentCare, setFilterStudentCare] = useState({
    filter: false,
    gender: "",
    name: "",
  })
  const [studentCare, setStudentCare] = useState({})
  const [listCounselors, setCounselors] = useState([])
  const [listStudentCare, setListStudentCare] = useState([])
  const [studentCareResp, setStudentCareResp] = useState({})
  const [loading, setLoading] = useState(false)

  /*
    Get all Counselor
  */
  const getCounselors = async () => {
    setLoading(true)
    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/student-care/counselors`)
      .then((res) => {
        let result = res.data.data
        setCounselors(result)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /*
    Get all Members
  */
  const getStudentCare = async (params) => {
    setLoading(true)
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
      .get(`${process.env.REACT_APP_BASE_URL}/v1/student-care${paramsQuery}`)
      .then((res) => {
        result = res.data.data
        setListStudentCare(result.data)
        setStudentCare(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /*
      @params
      id: integer
    
      Get member where id = params.id
    */
  const getStudentCareDetail = async (id) => {
    setLoading(true)
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/v1/student-care/${id}`)
      .then((res) => {
        const rp = res.data
        if (rp.status === "SUCCESS") {
          setStudentCare(rp.data)
        } else {
          setStudentCare(null)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /*
      @params
      id: integer
    
      unblock member where id = params.id
    */
  const editStudentCare = (id, formData) => {
    setStudentCareResp({})
    setLoading(true)
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/v1/student-care/${id}`, formData)
      .then((res) => {
        const { data } = res
        setStudentCareResp(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /*
      @params
      id: integer
    
      unblock member where id = params.id
    */
  const deleteStudentCare = (id) => {
    setStudentCareResp({})
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/v1/student-care/${id}`)
      .then((res) => {
        const { data } = res
        setStudentCareResp(data)
        setTimeout(() => {
          window.location.href = "/chat-room"
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const functions = {
    getCounselors,
    getStudentCare,
    getStudentCareDetail,
    editStudentCare,
    deleteStudentCare,
  }

  return (
    <AdminChatRoomContext.Provider
      value={{
        data: state,
        setData: setState,
        listCounselors,
        studentCare,
        listStudentCare,
        filterStudentCare,
        setFilterStudentCare,
        studentCareResp,
        setStudentCareResp,
        loading,
        functions,
      }}
    >
      {props.children}
    </AdminChatRoomContext.Provider>
  )
}
export default AdminChatRoomProvider

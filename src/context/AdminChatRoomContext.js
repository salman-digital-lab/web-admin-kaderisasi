import React, { createContext, useState } from "react"
import axios from "axios"
/* eslint-disable */
export const AdminChatRoomContext = createContext()
const AdminChatRoomProvider = (props) => {
  const [state, setState] = useState(null)
  const [filterStudentCare, setFilterStudentCare] = useState({
    filter: false,
    gender: "",
    ssc: -1,
    lmd: -1,
    search_query: "",
  })
  const [studentCare, setStudentCare] = useState({})
  const [listStudentCare, setListStudentCare] = useState([])
  const [studentCareResp, setStudentCareResp] = useState({})
  const [loading, setLoading] = useState(false)

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
      .get(`${process.env.REACT_APP_BASE_URL}/v1/studentCare${paramsQuery}`)
      .then((res) => {
        result = res.data.data
        setListStudentCare(result)
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
      .get(`${process.env.REACT_APP_BASE_URL}/v1/studentCare/${id}`)
      .then((res) => {
        const data = res.data.data
        if (data.length > 0){
          setStudentCare(data[0])
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
      .put(`${process.env.REACT_APP_BASE_URL}/v1/studentCare/${id}`, formData)
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
          .delete(`${process.env.REACT_APP_BASE_URL}/v1/studentCare/${id}`)
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
    getStudentCare,
    getStudentCareDetail,
    editStudentCare,
    deleteStudentCare
  }

  return (
    <AdminChatRoomContext.Provider
      value={{
        data: state,
        setData: setState,
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

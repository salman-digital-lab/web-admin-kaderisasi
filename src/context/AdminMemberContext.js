import React, { createContext, useState } from "react"
import axios from "axios"
/* eslint-disable */
export const AdminMemberContext = createContext()
const AdminMemberProvider = (props) => {
  const [state, setState] = useState(null)
  const [filterMember, setFilterMember] = useState({
    filter: false,
    gender: "",
    ssc: -1,
    lmd: -1,
    search_query: "",
  })
  const [members, setMembers] = useState([])
  const [listMembers, setListMembers] = useState([])
  const [memberForm, setMemberForm] = useState({})
  const [memberActivities, setMemberActivities] = useState(null)
  const [blockMemberResp, setBlockMemberResp] = useState({})
  const [unblockMemberResp, setUnblockMemberResp] = useState({})

  /*
    Get all Members
  */
  const getMembers = async (params) => {
    setMembers({})
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
      .get(`${process.env.REACT_APP_BASE_URL}/v1/members${paramsQuery}`)
      .then((res) => {
        result = res.data.data.data
        setListMembers(result)
        setMembers(res.data)
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
  const getMemberDetail = async (id) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/v1/member/${id}`)
      .then((res) => {
        const form = res.data.data
        setMemberForm(form)
        return form
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }

  /*
      @params
      id: integer
    
      Get member where id = params.id
    */
  const getMemberActivities = async (id) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/v1/member/${id}/activities`)
      .then((res) => {
        const form = res.data.data.activities
        setMemberActivities(form)
        return form
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }

  /*
      @params
      id: integer
    
      block member where id = params.id
    */
  const blockMemberById = (id) => {
    setBlockMemberResp({})
    axios
      .patch(`${process.env.REACT_APP_BASE_URL}/v1/member/${id}/block`)
      .then((res) => {
        const { data } = res
        setBlockMemberResp(data)
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }

  /*
      @params
      id: integer
    
      unblock member where id = params.id
    */
  const unblockMemberById = (id) => {
    setUnblockMemberResp({})
    axios
      .patch(`${process.env.REACT_APP_BASE_URL}/v1/member/${id}/unblock`)
      .then((res) => {
        const { data } = res
        setUnblockMemberResp(data)
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }

  const functions = {
    getMembers,
    getMemberDetail,
    getMemberActivities,
    blockMemberById,
    unblockMemberById,
  }

  return (
    <AdminMemberContext.Provider
      value={{
        data: state,
        setData: setState,
        members,
        listMembers,
        memberForm,
        memberActivities,
        filterMember,
        setFilterMember,
        blockMemberResp,
        unblockMemberResp,
        functions,
      }}
    >
      {props.children}
    </AdminMemberContext.Provider>
  )
}
export default AdminMemberProvider

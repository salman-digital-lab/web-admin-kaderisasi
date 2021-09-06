import React, { createContext, useState } from "react"
import axios from "axios"
/* eslint-disable */
export const AdminActivityContext = createContext()
const AdminActivityProvider = (props) => {
  const [state, setState] = useState(null)
  const [filterActivity, setFilterActivity] = useState({
    filter: false,
    category_id: -1,
    minimum_roles_id: -1,
    search: "",
  })
  const [filterParticipantsActivity, setFilterParticipantsActivity] = useState({
    filter: false,
    status: -1,
    role_id: -1,
    university_id: -1,
  })
  const [activity, setActivity] = useState([])
  const [listActivity, setListActivity] = useState([])
  const [activityParticipants, setActivityParticipants] = useState([])
  const [listParticipants, setListParticipants] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [formTemplateList, setFormTemplateList] = useState([])
  const [activityForm, setActivityForm] = useState([])
  const [universityList, setUniversityList] = useState([])

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
    Get all activity
  */
  const getActivity = async (params) => {
    setActivity({})
    let paramsQuery = "?"
    Object.keys(params).map((x, i) => {
      i === Object.keys(params).length - 1
        ? (paramsQuery += x + "=" + params[x].toString())
        : (paramsQuery += x + "=" + params[x].toString() + "&")
    })
    let result = null

    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/activity` + paramsQuery)
      .then((res) => {
        result = res.data.data.data
        const list = []
        if (result.length > 0) {
          result.forEach((x) => {
            list.push({
              id: x.id,
              judul: x.name,
              startDate: x.begin_date,
              endDate: x.end_date,
              jenjang: x.minimumRole?.name,
              kategori: x.activityCategory ? x.activityCategory.name : null,
              register: x.status.toLowerCase(),
              publish: x.is_published ? "published" : "unpublished",
            })
          })
        }
        setListActivity(list)
        setActivity(res.data)
      })
      .catch((err) => {
        console.log("Get Activity Error Cuy", err)
      })
  }

  /*
    Get all activity participants
  */
  const getActivityParticipants = async (activityId, params) => {
    setActivityParticipants({})
    let paramsQuery = "?"
    Object.keys(params).map((x, i) => {
      i === Object.keys(params).length - 1
        ? (paramsQuery += x + "=" + params[x].toString())
        : (paramsQuery += x + "=" + params[x].toString() + "&")
    })
    let result = null

    axios
      .get(
        process.env.REACT_APP_BASE_URL +
          `/v1/activity/${activityId}/participant` +
          paramsQuery
      )
      .then((res) => {
        result = res.data.data.data
        const list = []
        if (result.length > 0) {
          result.forEach((x) => {
            list.push({
              id: x.id,
              name: x.name,
              email: x.email,
              phone: x.phone,
              jenjang: x.role_name,
              jurusan: x.major,
              univ: x.university_name,
              status: x.status,
            })
          })
        }
        console.log(list)
        setListParticipants(list)
        setActivityParticipants(res.data)
      })
      .catch((err) => {
        console.log("Get Activity Participants Error Cuy", err)
      })
  }

  /*
    @params
    id: integer
  
    Get activity where id = params.id
  */
  const getActivityDetail = (id) => {
    setActivityForm({})
    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/activity/${id}`)
      .then((res) => {
        const form = res.data.data
        form[0].description =
          form[0].description === null
            ? "Description cannot be null"
            : form[0].description
        setActivityForm(form)
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }

  /*
    @params
    formData: object
  
    Create new activity
  */
  const addActivity = (formData) => {
    axios
      .post(process.env.REACT_APP_BASE_URL + `/v1/activity`, formData)
      .then((res) => {
        const form = res.data.data
        window.location.href =
          "http://localhost:3000/activity-detail/" + form[0].id
        setActivityForm(form)
      })
      .catch((err) => console.log(err))
  }

  /*
    @params
    id: integer
    formData: object
  
    Update activity where id = params.id
  */
  const editActivity = (id, formData) => {
    axios
      .put(process.env.REACT_APP_BASE_URL + `/v1/activity/${id}`, formData)
      .then((res) => {
        const form = res.data.data
        form[0].description =
          form[0].description === null
            ? "Description cannot be null"
            : form[0].description
        setActivityForm(form)
      })
      .catch((err) => console.log(err))
  }

  /*
    @params
    id: integer
  
    Delete activity where id = params.id
  */
  const deleteActivity = (id) => {
    axios
      .delete(process.env.REACT_APP_BASE_URL + `/v1/activity/${id}`)
      .then((res) => {
        console.log(res)
        setState(null)
      })
      .catch((err) => console.log(err))
  }

  /*
    Get all activity category
  */
  const getActivityCategory = () => {
    const categories = []
    setCategoryList(categories)
    categories.push({ value: -1, label: "Loading..." })
    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/activity-category`)
      .then((res) => {
        const response = res.data.data
        categories.push({ value: -1, label: "Semua Kategori" })
        response.map((x) => categories.push({ value: x.id, label: x.name }))
        setCategoryList(categories.slice(1, categories.length))
      })
      .catch((err) => {
        console.log("Get Activity Category Error Cuy", err)
        categories.push({ value: -1, label: "Kategori Tidak Ditemukan." })
        setCategoryList(categories.slice(1, categories.length))
      })
  }

  /*
    @params
    id: integer
  
    Get activity category where id = params.id
  */
  const getActivityCategoryDetail = (id) => {
    let result = null
    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/activity-category/${id}`)
      .then((res) => {
        result = res.data
        return result
      })
      .catch((err) => {
        console.log(err)
        return result
      })
  }

  /*
    @params
    formData: object
  
    Create new activity category
  */
  const addActivityCategory = (formData) => {
    let result = null
    axios
      .post(process.env.REACT_APP_BASE_URL + `/v1/activity-category`, formData)
      .then((res) => {
        getActivityCategory()
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
  
    Update activity category where id = params.id
  */
  const editActivityCategory = (id, formData) => {
    let result = null
    axios
      .put(
        process.env.REACT_APP_BASE_URL + `/v1/activity-category/${id}`,
        formData
      )
      .then((res) => {
        getActivityCategory()
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
  
    Delete activity category where id = params.id
  */
  const deleteActivityCategory = (id) => {
    let result = null
    axios
      .delete(process.env.REACT_APP_BASE_URL + `/v1/activity-category/${id}`)
      .then((res) => {
        getActivityCategory()
        result = res
        return result
      })
      .catch((err) => {
        console.log(err)
        return result
      })
  }

  /*
    Get all universites
  */
  const getAllUniversities = () => {
    const universities = []
    setUniversityList(universities)
    universities.push({ value: -1, label: "Loading..." })
    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/universities`)
      .then((res) => {
        const response = res.data.data
        universities.push({ value: -1, label: "Semua Universitas" })
        response.map((x) => universities.push({ value: x.id, label: x.name }))
        setUniversityList(universities.slice(1, universities.length))
      })
      .catch((err) => {
        console.log("Get Activity Category Error Cuy", err)
        universities.push({ value: -1, label: "Universitas Tidak Ditemukan." })
        setUniversityList(universities.slice(1, universities.length))
      })
  }

  /*
    Get all kuesioner
  */
  const getAllFormTemplate = () => {
    const template = []
    setFormTemplateList(template)
    template.push({ value: -1, label: "Loading..." })
    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/activity-form-template`)
      .then((res) => {
        const response = res.data.data
        template.push({ value: -1, label: "Pilih Template" })
        response.map((x) => template.push({ value: x.id, label: x.name }))
        setFormTemplateList(template.slice(1, template.length))
      })
      .catch((err) => {
        console.log("Get Activity Category Error Cuy", err)
        template.push({ value: -1, label: "Kategori Tidak Ditemukan." })
        setFormTemplateList(template.slice(1, template.length))
      })
  }

  /*
    Get all Members
  */
  const getMembers = async (params) => {
    setMembers({})
    let paramsQuery = "?"
    Object.keys(params).map((x, i) => {
      i === Object.keys(params).length - 1
        ? (paramsQuery += x + "=" + params[x].toString())
        : (paramsQuery += x + "=" + params[x].toString() + "&")
    })
    let result = null

    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/members` + paramsQuery)
      .then((res) => {
        result = res.data.data.data
        const list = []
        if (result.length > 0) {
          result.forEach((x) => {
            list.push({
              id: x.id,
              name: x.name,
              email: x.email,
              phone: x.phone,
              university: x.university,
              jenjang: x.role_id,
              ssc: x.ssc,
              lmd: x.lmd,
            })
          })
        }
        setListMembers(list)
        setMembers(res.data)
      })
      .catch((err) => {
        console.log("Get Members Error Cuy", err)
      })
  }

  /*
    @params
    id: integer
  
    Get member where id = params.id
  */
  const getMemberDetail = async (id) => {
    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/member/${id}`)
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
      .get(process.env.REACT_APP_BASE_URL + `/v1/member/${id}/activities`)
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
      .patch(process.env.REACT_APP_BASE_URL + `/v1/member/${id}/block`)
      .then((res) => {
        const data = res.data
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
      .patch(process.env.REACT_APP_BASE_URL + `/v1/member/${id}/unblock`)
      .then((res) => {
        const data = res.data
        setUnblockMemberResp(data)
      })
      .catch((err) => {
        console.log(err)
        return false
      })
  }

  const functions = {
    getActivity,
    getActivityDetail,
    getActivityParticipants,
    addActivity,
    editActivity,
    deleteActivity,
    getActivityCategory,
    getActivityCategoryDetail,
    addActivityCategory,
    editActivityCategory,
    deleteActivityCategory,
    getAllUniversities,
    getAllFormTemplate,
    getMembers,
    getMemberDetail,
    getMemberActivities,
    blockMemberById,
    unblockMemberById,
  }

  return (
    <AdminActivityContext.Provider
      value={{
        data: state,
        setData: setState,
        activityForm,
        setActivityForm,
        filterActivity,
        activity,
        listActivity,
        setFilterActivity,
        listParticipants,
        activityParticipants,
        filterParticipantsActivity,
        setFilterParticipantsActivity,
        categoryList,
        universityList,
        formTemplateList,
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
    </AdminActivityContext.Provider>
  )
}
export default AdminActivityProvider

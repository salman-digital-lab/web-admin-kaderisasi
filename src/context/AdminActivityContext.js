import React, { createContext, useState } from "react"
import axios from "axios"
import { saveAs } from "file-saver"

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
  })
  const [activity, setActivity] = useState([])
  const [listActivity, setListActivity] = useState([])
  const [activityParticipants, setActivityParticipants] = useState([])
  const [listParticipants, setListParticipants] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [formTemplateList, setFormTemplateList] = useState([])
  const [activityForm, setActivityForm] = useState([])
  const [activityBanner, setActivityBanner] = useState([])
  const [universityList, setUniversityList] = useState([])
  const [openAlert, setOpenAlert] = useState(false)

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
        console.log(err)
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
        setListParticipants(result)
        setActivityParticipants(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /*
    Get export all activity participants
  */
  const exportActivityParticipants = async (activityId) => {
    axios
      .get(
        process.env.REACT_APP_BASE_URL +
          `/v1/activity/${activityId}/participant/export`,
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        saveAs(
          res.data,
          `data-activity-${activityId}-participant-${new Date().getTime()}.xlsx`
        )
      })
      .catch((err) => {
        console.log(err)
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
        window.location.href = `/activity/${form[0].id}`
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
        if (res.data.status === "SUCCESS") {
          const form = res.data.data
          setOpenAlert(true)
          setActivityForm(form)
        }
      })
      .catch((err) => console.log(err))
  }

  /*
    @params
    id: integer
  
    Get banner where id activity = params.id
  */
  const getActivityBannerById = async (id) => {
    await axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/activity/${id}/banner`)
      .then((res) => {
        const banner = res.data.data
        setActivityBanner(banner)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /*
    @params
    id: integer
    formData: object
  
    Update activity where id = params.id
  */
  const uploadImageBanner = async (formData) => {
    await axios
      .post(process.env.REACT_APP_BASE_URL + `/v1/activity/banner`, formData)
      .then((res) => {
        const response = res.data
        // console.log(response)
      })
      .catch((err) => console.log(err))
  }

  /*
    @params
    id: integer
  
    Delete activity banner where id banner = params.id
  */
  const deleteBannerById = (id) => {
    axios
      .delete(process.env.REACT_APP_BASE_URL + `/v1/activity/banner/${id}`)
      .then((res) => {
        setState(null)
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
        setState(null)
      })
      .catch((err) => console.log(err))
  }

  /*
    Get all activity category
  */
  const getActivityCategory = (params) => {
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
        process.env.REACT_APP_BASE_URL + `/v1/activity-category` + paramsQuery
      )
      .then((res) => {
        res.data.data.data.unshift({ id: -1, name: "-- Pilih Kategori Kegiatan --" })
        setCategoryList(res.data)
      })
      .catch((err) => {
        console.log(err)
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
        getActivityCategory({ page: 1, perPage: 5 })
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
        getActivityCategory({ page: 1, perPage: 5 })
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
        getActivityCategory({ page: 1, perPage: 5 })
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
        console.log(err)
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
        console.log(err)
        template.push({ value: -1, label: "Kategori Tidak Ditemukan." })
        setFormTemplateList(template.slice(1, template.length))
      })
  }

  const functions = {
    getActivity,
    getActivityDetail,
    getActivityParticipants,
    addActivity,
    editActivity,
    deleteActivity,
    getActivityBannerById,
    uploadImageBanner,
    deleteBannerById,
    getActivityCategory,
    getActivityCategoryDetail,
    addActivityCategory,
    editActivityCategory,
    deleteActivityCategory,
    getAllUniversities,
    getAllFormTemplate,
    exportActivityParticipants,
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
        activityBanner,
        openAlert,
        setOpenAlert,
        functions,
      }}
    >
      {props.children}
    </AdminActivityContext.Provider>
  )
}
export default AdminActivityProvider

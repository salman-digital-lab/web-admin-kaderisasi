import React, {createContext, useState} from 'react'
import axios from 'axios'

export const AdminAktivisContext = createContext()
export const AdminAktivisProvider = (props) => {
  const [state, setState] = useState(null)
  const [filterAktivis, setFilterAktivis] = useState({status: false, university_id:-1, minimum_roles_id:-1, search:""})
  const [activity, setActivity] = useState({})
  const [listActivity, setListActivity] = useState([])
  const [universityList, setUniversityList] = useState([])

  /*
    Get all activity
  */
  const getActivity = async (params) => {
    let params_query = "?"
    Object.keys(params).filter(x => x !== "status").map((x,i) => i === Object.keys(params).length-2 ? 
                                    params_query += x+"="+params[x].toString() : 
                                    params_query += x+"="+params[x].toString()+"&")
    let result = null
    axios.get("https://admin-api-kaderisasi-dev.salmanitb.com/v1/activity"+params_query)
      .then(res => {
        result = res.data.data.data
        let list = []
        if (result.length > 0){
          result.forEach(x => {
            list.push({judul:x.name, startDate:x.begin_date, endDate:x.end_date, 
                      jenjang:"Aktivis", kategori:x.activityCategory.name, 
                      register:x.status.toLowerCase(), publish:x.is_published ? "published" : "unpublished", updatedAt:"1"})
          });
        }
        setListActivity(list)
        setActivity(res.data)
      })
      .catch(err => {
        console.log(err)
        return result
      })
  }


  /*
    @params
    id: integer
  
    Get activity where id = params.id
  */
  const getActivityDetail = (id) => {
    let result = null
    axios.get(process.env.REACT_APP_BASE_URL + `/v1/activity/${id}`)
      .then(res => {
        result = res.data
        return result
      })
      .catch(err => {
        console.log(err)
        return result
      })
  }


  /*
    @params
    formData: object
  
    Create new activity
  */
  const addActivity = (formData) => {
    axios.post(process.env.REACT_APP_BASE_URL + `/v1/activity`, formData)
      .then(res => {
        console.log(res)
        setState(null)
      })
      .catch(err => console.log(err))
  }


  /*
    @params
    id: integer
    formData: object
  
    Update activity where id = params.id
  */
  const editActivity = (id, formData) => {
    axios.put(process.env.REACT_APP_BASE_URL + `/v1/activity/${id}`, formData)
      .then(res => {
        console.log(res)
        setState(null)
      })
      .catch(err => console.log(err))
  }


  /*
    @params
    id: integer
  
    Delete activity where id = params.id
  */
  const deleteActivity = (id) => {
    axios.delete(process.env.REACT_APP_BASE_URL + `/v1/activity/${id}`)
      .then(res => {
        console.log(res)
        setState(null)
      })
      .catch(err => console.log(err))
  }


  /*
    Get all activity category
  */
  const getUniversityList = () => {
      let universities = []
      universities.push({value:-1, label:"Loading..."})
      setUniversityList(universities)
      axios.get(process.env.REACT_APP_BASE_URL + `/v1/universities`)
          .then((res) => {
          const response = res.data.data
          let universities = []
          universities.push({value:-1, label:"Semua Kampus"})
          response.map((x) => 
              universities.push({value:x.id, label:x.name})
          )
          setUniversityList(universities)
      })
      .catch(()=>{
          let universities = []
          universities.push({value:-1, label:"Kampus Tidak Ditemukan."})
          setUniversityList(universities)
      })
  }


  /*
    @params
    id: integer
  
    Get activity category where id = params.id
  */
  const getActivityCategoryDetail = (id) => {
    let result = null
    axios.get(process.env.REACT_APP_BASE_URL + `/v1/activity-category/${id}`)
      .then(res => {
        result = res.data
        return result
      })
      .catch(err => {
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
    axios.post(process.env.REACT_APP_BASE_URL + `/v1/activity-category`, formData)
      .then(res => {
        result = res
        return result
      })
      .catch(err => {
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
    axios.put(process.env.REACT_APP_BASE_URL + `/v1/activity-category/${id}`, formData)
      .then(res => {
        result = res
        return result
      })
      .catch(err => {
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
    axios.delete(process.env.REACT_APP_BASE_URL + `/v1/activity-category/${id}`)
      .then(res => {
        result = res
        return result
      })
      .catch(err => {
        console.log(err)
        return result
      })
  }

  const functions = {
    getActivity,
    getActivityDetail,
    addActivity,
    editActivity,
    deleteActivity,
    getUniversityList,
    getActivityCategoryDetail,
    addActivityCategory,
    editActivityCategory,
    deleteActivityCategory,
  }

  return (
    <AdminAktivisContext.Provider value={{
      data: state,
      setData: setState,
      filterAktivis,
      activity,
      listActivity,
      setFilterAktivis,
      universityList,
      functions
    }}>
      {props.children}
    </AdminAktivisContext.Provider>
  )
}
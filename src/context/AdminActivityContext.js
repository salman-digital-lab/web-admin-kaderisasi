import React, { createContext, useState } from "react";
import axios from "axios";

export const AdminActivityContext = createContext();
export const AdminActivityProvider = (props) => {
  const [state, setState] = useState(null);
  const [filterActivity, setFilterActivity] = useState({
    filter: false,
    category_id: -1,
    minimum_roles_id: -1,
    search: "",
  });
  const [filterParticipantsActivity, setFilterParticipantsActivity] = useState({
    filter: false,
    status: -1,
    role_id: -1,
    university_id: -1,
  });
  const [activity, setActivity] = useState([]);
  const [listActivity, setListActivity] = useState([]);
  const [activityParticipants, setActivityParticipants] = useState([]);
  const [listParticipants, setListParticipants] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [formTemplateList, setFormTemplateList] = useState([]);
  const [activityForm, setActivityForm] = useState([]);
  const [universityList, setUniversityList] = useState([]);
  /*
    Get all activity
  */
  const getActivity = async (params) => {
    setActivity({});
    let params_query = "?";
    Object.keys(params).map((x, i) =>
      i === Object.keys(params).length - 1
        ? (params_query += x + "=" + params[x].toString())
        : (params_query += x + "=" + params[x].toString() + "&")
    );
    let result = null;

    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/activity` + params_query)
      .then((res) => {
        result = res.data.data.data;
        let list = [];
        if (result.length > 0) {
          result.forEach((x) => {
            list.push({
              id: x.id,
              judul: x.name,
              startDate: x.begin_date,
              endDate: x.end_date,
              jenjang: x.minimumRole.name,
              kategori: x.activityCategory.name,
              register: x.status.toLowerCase(),
              publish: x.is_published ? "published" : "unpublished",
            });
          });
        }
        setListActivity(list);
        setActivity(res.data);
      })
      .catch((err) => {
        console.log("Get Activity Error Cuy", err);
      });
  };

  /*
    Get all activity participants
  */
  const getActivityParticipants = async (activity_id, params) => {
    setActivityParticipants({});
    let params_query = "?";
    Object.keys(params).map((x, i) =>
      i === Object.keys(params).length - 1
        ? (params_query += x + "=" + params[x].toString())
        : (params_query += x + "=" + params[x].toString() + "&")
    );
    let result = null;

    axios
      .get(
        process.env.REACT_APP_BASE_URL +
          `/v1/activity/participants/` +
          activity_id +
          params_query
      )
      .then((res) => {
        result = res.data.data.data;
        let list = [];
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
            });
          });
        }
        console.log(list);
        setListParticipants(list);
        setActivityParticipants(res.data);
      })
      .catch((err) => {
        console.log("Get Activity Participants Error Cuy", err);
      });
  };

  /*
    @params
    id: integer
  
    Get activity where id = params.id
  */
  const getActivityDetail = (id) => {
    setActivityForm({});
    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/activity/${id}`)
      .then((res) => {
        const form = res.data.data;
        form[0].description =
          form[0].description === null
            ? "Description cannot be null"
            : form[0].description;
        setActivityForm(form);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  /*
    @params
    formData: object
  
    Create new activity
  */
  const addActivity = (formData) => {
    axios
      .post(process.env.REACT_APP_BASE_URL + `/v1/activity`, formData)
      .then((res) => {
        const form = res.data.data;
        window.location.href = 'http://localhost:3000/detail-kegiatan/'+form[0].id
        setActivityForm(form);
      })
      .catch((err) => console.log(err));
  };

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
        const form = res.data.data;
        form[0].description =
          form[0].description === null
            ? "Description cannot be null"
            : form[0].description;
        setActivityForm(form);
      })
      .catch((err) => console.log(err));
  };

  /*
    @params
    id: integer
  
    Delete activity where id = params.id
  */
  const deleteActivity = (id) => {
    axios
      .delete(process.env.REACT_APP_BASE_URL + `/v1/activity/${id}`)
      .then((res) => {
        console.log(res);
        setState(null);
      })
      .catch((err) => console.log(err));
  };

  /*
    Get all activity category
  */
  const getActivityCategory = () => {
    let categories = [];
    setCategoryList(categories);
    categories.push({ value: -1, label: "Loading..." });
    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/activity-category`)
      .then((res) => {
        const response = res.data.data;
        categories.push({ value: -1, label: "Semua Kategori" });
        response.map((x) => categories.push({ value: x.id, label: x.name }));
        setCategoryList(categories.slice(1, categories.length));
      })
      .catch((err) => {
        console.log("Get Activity Category Error Cuy", err);
        categories.push({ value: -1, label: "Kategori Tidak Ditemukan." });
        setCategoryList(categories.slice(1, categories.length));
      });
  };

  /*
    @params
    id: integer
  
    Get activity category where id = params.id
  */
  const getActivityCategoryDetail = (id) => {
    let result = null;
    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/activity-category/${id}`)
      .then((res) => {
        result = res.data;
        return result;
      })
      .catch((err) => {
        console.log(err);
        return result;
      });
  };

  /*
    @params
    formData: object
  
    Create new activity category
  */
  const addActivityCategory = (formData) => {
    let result = null;
    axios
      .post(process.env.REACT_APP_BASE_URL + `/v1/activity-category`, formData)
      .then((res) => {
        result = res;
        return result;
      })
      .catch((err) => {
        console.log(err);
        return result;
      });
  };

  /*
    @params
    id: integer
    formData: object
  
    Update activity category where id = params.id
  */
  const editActivityCategory = (id, formData) => {
    let result = null;
    axios
      .put(
        process.env.REACT_APP_BASE_URL + `/v1/activity-category/${id}`,
        formData
      )
      .then((res) => {
        result = res;
        return result;
      })
      .catch((err) => {
        console.log(err);
        return result;
      });
  };

  /*
    @params
    id: integer
  
    Delete activity category where id = params.id
  */
  const deleteActivityCategory = (id) => {
    let result = null;
    axios
      .delete(process.env.REACT_APP_BASE_URL + `/v1/activity-category/${id}`)
      .then((res) => {
        result = res;
        return result;
      })
      .catch((err) => {
        console.log(err);
        return result;
      });
  };

  /*
    Get all universites
  */
  const getAllUniversities = () => {
    let universities = [];
    setUniversityList(universities);
    universities.push({ value: -1, label: "Loading..." });
    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/universities`)
      .then((res) => {
        const response = res.data.data;
        universities.push({ value: -1, label: "Semua Universitas" });
        response.map((x) => universities.push({ value: x.id, label: x.name }));
        setUniversityList(universities.slice(1, universities.length));
      })
      .catch((err) => {
        console.log("Get Activity Category Error Cuy", err);
        universities.push({ value: -1, label: "Universitas Tidak Ditemukan." });
        setUniversityList(universities.slice(1, universities.length));
      });
  };

/*
    Get all kuesioner
  */
    const getAllFormTemplate = () => {
      let template = [];
      setFormTemplateList(template);
      template.push({ value: -1, label: "Loading..." });
      axios
        .get(process.env.REACT_APP_BASE_URL + `/v1/activity-form-template`)
        .then((res) => {
          const response = res.data.data;
          template.push({ value: -1, label: "Pilih Template" });
          response.map((x) => template.push({ value: x.id, label: x.name }));
          setFormTemplateList(template.slice(1, template.length));
        })
        .catch((err) => {
          console.log("Get Activity Category Error Cuy", err);
          template.push({ value: -1, label: "Kategori Tidak Ditemukan." });
          setFormTemplateList(template.slice(1, template.length));
        });
    };

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
    getAllFormTemplate
  };

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
        functions,
      }}
    >
      {props.children}
    </AdminActivityContext.Provider>
  );
};

import React from "react"
import axios from "axios"

/* eslint-disable */
export const AdminQuestionnaireContext = React.createContext()
const AdminQuestionnaireProvider = (props) => {
  const ref = []
  const [state, setState] = React.useState({
    title: "The Question",
    subtitle: "This question is about...",
    form: [{ variant: "short_text", question: "", required: false }],
  })
  const [reload, setReload] = React.useState(true)
  const [idDelete, setIdDelete] = React.useState(null)
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [openSnackbar, setOpenSnackbar] = React.useState(false)

  const handleChangeTitleForm = (event) =>
    setState({ ...state, title: event.target.value })

  const handleChangeSubtitleForm = (event) =>
    setState({ ...state, subtitle: event.target.value })

  const handleChangeVariantForm = (id, event) => {
    const variant = event.target.value
    const form = state.form
    form[id] = {
      ...state.form[id],
      variant: variant,
    }
    if (variant === "radio_button" || variant === "checkbox") {
      form[id] = {
        ...state.form[id],
        answer: ["Yes of course"],
      }
    }
    if (variant === "slider") {
      form[id] = {
        ...state.form[id],
        minValue: 0,
        maxValue: 100,
      }
    }
    setState({ ...state, form })
  }

  const handleChangeQuestionForm = (id, event) => {
    const form = state.form
    form[id] = {
      ...state.form[id],
      question: event.target.value,
    }
    setState({ ...state, form })
  }

  const handleChangeMinValueForm = (id, event) => {
    const minValue = event.target.value
    const maxValue = state.form[id].maxValue
    if (!(minValue >= maxValue)) {
      const form = state.form
      form[id] = {
        ...state.form[id],
        minValue,
      }
      setState({ ...state, form })
    }
  }

  const handleChangeMaxValueForm = (id, event) => {
    const maxValue = event.target.value
    const minValue = state.form[id].minValue
    if (!(maxValue <= minValue)) {
      const form = state.form
      form[id] = {
        ...state.form[id],
        maxValue: event.target.value,
      }
      setState({ ...state, form })
    }
  }

  const handleChangeAnswerForm = (id, index, event) => {
    const form = state.form
    const answer = state.form[id].answer
    const currentValue = event.target.value
    answer[index] = currentValue
    form[id] = { ...form[id], answer }
    setState({ ...state, form })
  }

  const handleAddAnswerForm = (id) => {
    const form = state.form
    const answer = state.form[id].answer
    answer.push("Yes of course")
    form[id] = { ...form[id], answer }
    setState({ ...state, form })
  }

  const handleDeleteAnswerForm = (id, index) => {
    const form = state.form
    let answer = state.form[id].answer
    answer = answer.filter((value, indexFilter) => index !== indexFilter)
    form[id] = { ...form[id], answer }
    setState({ ...state, form })
  }

  const handleSaveQuestionnaire = () => {
    console.log(state)
  }

  const handleAddNewForm = () =>
    setState({
      ...state,
      form: [
        ...state.form,
        {
          variant: "short_text",
          question: "",
          required: false,
        },
      ],
    })

  const handleDeleteForm = (id) => {
    let form = state.form
    form = form.filter((value, index) => id !== index)
    setState({ ...state, form })
  }

  const handleRequiredForm = (id) => {
    const form = state.form
    const required = state.form[id].required
    form[id] = { ...form[id], required: !required }
    setState({ ...state, form })
  }

  const handleAddRef = (element) => {
    ref.push(element)
  }

  const getAllQuestionnaire = (callback) => {
    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/activity-form-template`)
      .then((res) => callback(res))
      .catch((err) => console.log(err))
  }

  const getQuestionnaire = (id, callback) => {
    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/activity-form-template/${id}`)
      .then((res) => {
        const { title, subtitle, form } = JSON.parse(res.data.data.data)
        setState({
          ...state,
          title,
          subtitle,
          form,
        })
        callback()
      })
      .catch((err) => console.log(err))
  }

  const createQuestionnaire = () => {
    const { title, subtitle, form } = state
    const body = { title, subtitle, form }
    axios
      .post(process.env.REACT_APP_BASE_URL + `/v1/activity-form-template`, {
        name: title,
        body: JSON.stringify(body),
      })
      .then((res) => {
        setOpenSnackbar(true)
      })
      .catch((err) => console.log(err))
  }

  const updateQuestionnaire = (id) => {
    const { title, subtitle, form } = state
    const body = { title, subtitle, form }
    axios
      .put(
        process.env.REACT_APP_BASE_URL + `/v1/activity-form-template/${id}`,
        {
          name: title,
          body: JSON.stringify(body),
        }
      )
      .then((res) => {
        setOpenSnackbar(true)
      })
      .catch((err) => console.log(err))
  }

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog)
  }

  const deleteQuestionnaire = (id) => {
    axios
      .delete(
        process.env.REACT_APP_BASE_URL + `/v1/activity-form-template/${id}`
      )
      .then((res) => {
        setOpenSnackbar(true)
        setReload(true)
      })
      .catch((err) => console.log(err))
    handleOpenDeleteDialog()
  }

  const agreeToDeleteQuestionnaire = () => {
    deleteQuestionnaire(idDelete)
  }

  const handleSnackbar = () => {
    setOpenSnackbar(!openSnackbar)
  }

  const functions = {
    handleChangeTitleForm,
    handleChangeSubtitleForm,
    handleChangeQuestionForm,
    handleChangeMinValueForm,
    handleChangeMaxValueForm,
    handleChangeVariantForm,
    handleChangeAnswerForm,
    handleAddAnswerForm,
    handleDeleteAnswerForm,
    handleSaveQuestionnaire,
    handleAddNewForm,
    handleDeleteForm,
    handleRequiredForm,
    handleAddRef,
    getAllQuestionnaire,
    getQuestionnaire,
    createQuestionnaire,
    updateQuestionnaire,
    deleteQuestionnaire,
    handleOpenDeleteDialog,
    agreeToDeleteQuestionnaire,
    handleSnackbar,
  }

  return (
    <AdminQuestionnaireContext.Provider
      value={{
        data: state,
        setData: setState,
        openDeleteDialog,
        openSnackbar,
        idDelete,
        setIdDelete,
        reload,
        setReload,
        ref,
        functions,
      }}
    >
      {props.children}
    </AdminQuestionnaireContext.Provider>
  )
}
export default AdminQuestionnaireProvider

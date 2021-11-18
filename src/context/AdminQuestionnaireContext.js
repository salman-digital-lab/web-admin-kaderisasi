import React from "react"
import axios from "axios"

function slug(Text) {
  return `${Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")}${new Date().getTime()}`
}

// eslint-disable-next-line
export default function AdminQuestionnaireProvider({ children }) {
  const initState = {
    title: "The Question",
    subtitle: "This question is about...",
    form: [
      {
        type: "text",
        label: "First question for you",
        name: slug("text"),
        required: false,
      },
    ],
  }

  const ref = []
  const [state, setState] = React.useState(initState)
  const [questionnaireReload, setQuestionnaireReload] = React.useState(true)
  const [questionnaireLoading, setQuestionnaireLoading] = React.useState(false)
  const [openQuestionnaireSuccesSnackbar, setOpenQuestionnaireSuccessSnackbar] =
    React.useState(false)

  const RESET_QUESTIONNAIRE = () => setState(initState)

  const SET_QUESTIONNAIRE_FORM_TITLE = (value) => {
    setState({ ...state, title: value })
  }

  const GET_QUESTIONNAIRE_FORM_TITLE = () => state?.title ?? "Default Title"

  const SET_QUESTIONNAIRE_FORM_SUBTITLE = (value) => {
    setState({ ...state, subtitle: value })
  }

  const GET_QUESTIONNAIRE_FORM_SUBTITLE = () =>
    state?.subtitle ?? "Default Subtitle"

  const SET_QUESTIONNAIRE_FORM_TYPE = (id, variant) => {
    const { form } = state
    form[id].type = variant
    if (variant === "radio_button" || variant === "checkbox") {
      form[id].data = [
        {
          label: "Yes of course",
          value: "yes_of_course",
          name: "",
        },
      ]
    }
    if (variant === "slider") {
      form[id].data = {
        min: 0,
        max: 100,
      }
    }
    setState({ ...state, form })
  }

  const SET_QUESTIONNAIRE_FORM_QUESTION = (id, value) => {
    const { form } = state
    form[id].label = value
    setState({ ...state, form })
  }

  const GET_QUESTIONNAIRE_FORM_QUESTION = (id) =>
    state?.form[id]?.label ?? "Default Question"

  const SET_QUESTIONNAIRE_ANSWER_MIN_VALUE = (id, value) => {
    const { form } = state
    const minValue = value
    const maxValue = form[id].data.max
    if (!(minValue >= maxValue)) {
      form[id].data = {
        ...form[id].data,
        min: minValue,
      }
      setState({ ...state, form })
    }
  }

  const GET_QUESTIONNAIRE_ANSWER_MIN_VALUE = (id) =>
    state?.form[id]?.data.min ?? 0

  const SET_QUESTIONNAIRE_ANSWER_MAX_VALUE = (id, value) => {
    const { form } = state
    const maxValue = value
    const minValue = form[id].data.min
    if (!(maxValue <= minValue)) {
      form[id].data = {
        ...form[id].data,
        max: maxValue,
      }
      setState({ ...state, form })
    }
  }

  const GET_QUESTIONNAIRE_ANSWER_MAX_VALUE = (id) =>
    state?.form[id]?.data.max ?? 100

  const SET_QUESTIONNAIRE_ANSWER_STRING_VALUE = (id, index, value) => {
    const { form } = state
    form[id].data[index] = {
      label: value,
      value: value.toLowerCase().split(" ").join("_"),
    }
    setState({ ...state, form })
  }

  const GET_QUESTIONNAIRE_ANSWER_STRING_VALUE = (id) =>
    state?.form[id]?.data ?? null

  const ADD_QUESTIONNAIRE_ANSWER_STRING_VALUE = (id) => {
    const { form } = state
    form[id].data.push({
      label: "Yes of course",
      value: "yes_of_course",
    })
    setState({ ...state, form })
  }

  const REMOVE_QUESTIONNAIRE_ANSWER_STRING_VALUE = (id, index) => {
    const { form } = state
    form[id].data = form[id].data.filter(
      (value, indexFilter) => index !== indexFilter
    )
    setState({ ...state, form })
  }

  const SAVE_QUESTIONNAIRE = () => {
    setOpenQuestionnaireSuccessSnackbar(true)
    // console.log(state)
  }

  const ADD_QUESTIONNAIRE_FORM = () => {
    const { form } = state
    form.push(initState.form[0])
    setState({ ...state, form })
  }

  const REMOVE_QUESTIONNAIRE_FORM = (id) => {
    const { form } = state
    setState({ ...state, form: form.filter((value, index) => id !== index) })
  }

  const TOGGLE_QUESTIONNAIRE_FORM_REQUIRED = (id) => {
    const { form } = state
    const { required } = form[id]
    form[id].required = !required
    setState({ ...state, form })
  }

  const GET_QUESTIONNAIRE_FORM_REQUIRED = (id) =>
    state?.form[id]?.required ?? false

  const ADD_QUESTIONNAIRE_REF = (element) => {
    ref.push(element)
  }

  const REQUEST_PUT_QUESTIONNAIRE = async ({
    id,
    resolve = () => null,
    reject = () => null,
    final = () => null,
  }) => {
    // eslint-disable-next-line
    const { title, subtitle, form } = state

    // prepare property name before send request
    const payload = state.form.map((value, index) => ({
      ...value,
      name: value.name ? value.name : `${slug(value.type)}${index}`,
    }))

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/v1/activity/${id}/questionnaire`,
        payload
      )
      if (response.status === 200) {
        setOpenQuestionnaireSuccessSnackbar(true)
        resolve()
      }
      reject()
    } catch (error) {
      reject()
    }
    final()
  }

  const TOGGLE_QUESTIONNAIRE_SNACKBAR = () => {
    setOpenQuestionnaireSuccessSnackbar(!openQuestionnaireSuccesSnackbar)
  }

  const REQUEST_GET_QUESTIONNAIRE = async ({
    id,
    resolve = () => null,
    reject = () => null,
    final = () => null,
  }) => {
    try {
      setQuestionnaireLoading(true)
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/activity/${id}/questionnaire`
      )
      // console.log(response)
      if (response.status === 200) {
        const form = response.data.data ?? null
        // console.log(response.data.data)
        setState({ ...state, form })
        // if (
        //   Object.prototype.hasOwnProperty.call(form, "title") &&
        //   Object.prototype.hasOwnProperty.call(form, "subtitle") &&
        //   Object.prototype.hasOwnProperty.call(form, "form")
        // ) {
        //   RESET_QUESTIONNAIRE()
        // } else {
        //   RESET_QUESTIONNAIRE()
        // }
        resolve()
      }
      reject()
    } catch (error) {
      reject()
    }
    setQuestionnaireLoading(false)
    final()
  }

  // function map
  const functions = {
    ADD_QUESTIONNAIRE_ANSWER_STRING_VALUE,
    ADD_QUESTIONNAIRE_FORM,
    ADD_QUESTIONNAIRE_REF,
    GET_QUESTIONNAIRE_FORM_TITLE,
    GET_QUESTIONNAIRE_FORM_SUBTITLE,
    GET_QUESTIONNAIRE_FORM_QUESTION,
    GET_QUESTIONNAIRE_ANSWER_MIN_VALUE,
    GET_QUESTIONNAIRE_ANSWER_MAX_VALUE,
    GET_QUESTIONNAIRE_ANSWER_STRING_VALUE,
    GET_QUESTIONNAIRE_FORM_REQUIRED,
    SET_QUESTIONNAIRE_FORM_TITLE,
    SET_QUESTIONNAIRE_FORM_SUBTITLE,
    SET_QUESTIONNAIRE_FORM_QUESTION,
    SET_QUESTIONNAIRE_ANSWER_MIN_VALUE,
    SET_QUESTIONNAIRE_ANSWER_MAX_VALUE,
    SET_QUESTIONNAIRE_FORM_TYPE,
    SET_QUESTIONNAIRE_ANSWER_STRING_VALUE,
    REMOVE_QUESTIONNAIRE_ANSWER_STRING_VALUE,
    REMOVE_QUESTIONNAIRE_FORM,
    RESET_QUESTIONNAIRE,
    REQUEST_GET_QUESTIONNAIRE,
    REQUEST_PUT_QUESTIONNAIRE,
    SAVE_QUESTIONNAIRE,
    TOGGLE_QUESTIONNAIRE_FORM_REQUIRED,
    TOGGLE_QUESTIONNAIRE_SNACKBAR,
  }

  return (
    <AdminQuestionnaireContext.Provider
      value={{
        data: state,
        setData: setState,
        openQuestionnaireSuccesSnackbar,
        questionnaireReload,
        setQuestionnaireReload,
        questionnaireLoading,
        ref,
        functions,
      }}
    >
      {children}
    </AdminQuestionnaireContext.Provider>
  )
}
export const AdminQuestionnaireContext = React.createContext()

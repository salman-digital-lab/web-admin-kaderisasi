import React from "react"
import FormTypePicker from "./FormTypePicker"
import { AdminQuestionnaireContext } from "../../../context/AdminQuestionnaireContext"

const Form = () => {
  const { data } = React.useContext(AdminQuestionnaireContext)
  return (
    <>
      {data.form.map((value, index) => (
        <FormTypePicker id={index} key={value} variant={value.variant} />
      ))}
    </>
  )
}
export default Form

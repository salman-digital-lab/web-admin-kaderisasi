import React from "react"
import { FormTypePicker } from "./FormTypePicker"
import { AdminQuestionnaireContext } from "../../../../../context/AdminQuestionnaireContext"
export const Form = () => {
  const { data } = React.useContext(AdminQuestionnaireContext)
  return (
    <>
      {data.form.map((value, index) => (
        <FormTypePicker id={index} key={index} variant={value.variant} />
      ))}
    </>
  )
}

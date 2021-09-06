import React from "react"
import AdminQuestionnaireProvider from "../../../context/AdminQuestionnaireContext"
import QuestionnaireFormChild from "./QuestionnaireFormChild"

const QuestionnaireForm = () => (
  <AdminQuestionnaireProvider>
    <QuestionnaireFormChild />
  </AdminQuestionnaireProvider>
)

export default QuestionnaireForm

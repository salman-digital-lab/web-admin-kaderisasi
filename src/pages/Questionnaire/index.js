import React from "react"
import AdminQuestionnaireProvider from "../../context/AdminQuestionnaireContext"
import QuestionnaireChild from "./QuestionnaireChild"

const Questionnaire = () => (
  <AdminQuestionnaireProvider>
    <QuestionnaireChild />
  </AdminQuestionnaireProvider>
)

export default Questionnaire

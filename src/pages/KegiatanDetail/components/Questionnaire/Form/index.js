import React from "react"
import { AdminQuestionnaireProvider } from "../../../../../context/AdminQuestionnaireContext"
import { QuestionnaireForm } from './QuestionnaireForm';

export default function Questionnaire () {
    return (
        <AdminQuestionnaireProvider>
            <QuestionnaireForm />
        </AdminQuestionnaireProvider>
    )
}
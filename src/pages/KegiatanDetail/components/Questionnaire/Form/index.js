import React from 'react'
import { AdminQuestionnaireProvider } from "../../../../../context/AdminQuestionnaireContext"
import { QuestionnaireFormChild } from './QuestionnaireFormChild'

export const QuestionnaireForm = () => {
    return (
        <AdminQuestionnaireProvider>
            <QuestionnaireFormChild />
        </AdminQuestionnaireProvider>
    )
}
import React from 'react'
import { AdminQuestionnaireProvider } from '../../context/AdminQuestionnaireContext'
import { QuestionnaireChild } from './QuestionnaireChild'

export const Questionnaire = () => {
    return (
        <AdminQuestionnaireProvider>
            <QuestionnaireChild />
        </AdminQuestionnaireProvider>
    )
}
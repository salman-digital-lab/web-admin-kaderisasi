/* eslint-disable */
import ProfileProvider from '../../context/ProfileContext'
import React from 'react'
import Profile from './Profile'

const index = () => {
    return (
        <ProfileProvider>
            <Profile/>
        </ProfileProvider>
    )
}

export default index

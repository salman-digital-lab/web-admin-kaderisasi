import React from 'react'
import { Topbar } from './Topbar/'
import { Sidebar } from '../components/Sidebar/'
import { Content } from './Content'
import { CssBaseline } from '@material-ui/core/'


export const AdminNavigation = (props) => {
  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <Topbar />
      <Sidebar />
      <Content>
        {props.children}
      </Content>
    </div>
  )
}

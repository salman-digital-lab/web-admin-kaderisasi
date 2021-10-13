/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core"
import { ArrowBack, AccountCircle } from "@material-ui/icons"
import { AdminStatus } from "../../components/Statuses"
import Cookies from "js-cookie"
import "../../assets/scss/Profile.scss"
import { ProfileContext } from "context/ProfileContext"

const Profile = () => {
  const { id } = JSON.parse(Cookies.get("user"))
  const { users, functions } = useContext(ProfileContext)
  const { getUserDetail } = functions
  useEffect(() => {
    getUserDetail(id)
  }, [])

  const [title] = useState({
    displayname: <b>Display Name</b>,
    username: <b>Username</b>,
    firstname: <b>First Name</b>,
    lastname: <b>Last Name</b>,
    email: <b>Email</b>,
    status: <b>Status</b>,
  })


  return (
    <>
      <div className="container-detail-profile">

        <div className="left-detail-profile">
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
          >
            <AccountCircle fontSize="large" className="logo-detail-profile" />
          </IconButton>
          <p className="heading-profile">{users?.username}</p>
          <p>Admin</p>
        </div>
        <div className="right-detail-profile">
          <div className="nav-detail-profile">
            <div className="button-group">
            </div>
          </div>
          <div className="content-detail-profile">
            <List
              component="nav"
              className="detail-profile"
              aria-label="mailbox folders"
            >
              <ListItem button>
                <ListItemText primary={title.displayname} />
                <p>{users?.display_name}</p>
              </ListItem>
              <Divider />
              <ListItem button divider>
                <ListItemText primary={title.firstname} />
                <p>{users?.first_name}</p>
              </ListItem>
              <ListItem button divider>
                <ListItemText primary={title.lastname} />
                <p>{users?.last_name}</p>
              </ListItem>
              <ListItem button divider>
                <ListItemText primary={title.email} />
                <p>{users?.email}</p>
              </ListItem>
              <ListItem button divider>
                <ListItemText primary={title.username} />
                <p>{users?.username}</p>
              </ListItem>
              <ListItem button divider>
                <ListItemText primary={title.status} />
                <AdminStatus status={users?.active} />
              </ListItem>
              <Divider light />
            </List>
          </div>
        </div>
      </div>

    </>
  )
}

export default Profile

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
import { useParams, Link } from "react-router-dom"
import ProfileModal from "./ProfileModal"
import { AdminContext } from "../../context/AdminContext"
import { AdminStatus } from "../../components/Statuses"
import Cookies from "js-cookie"
import "../../assets/scss/DetailAdmin.scss"

const Profile = () => {
  const { id } = JSON.parse(Cookies.get("user"))
  console.log(id)
  const { users, functions } = useContext(AdminContext)
  const { getUserDetail } = functions
  useEffect(() => {
    getUserDetail(id)
  }, [])

  const [open, setOpen] = useState(false)
  const [title] = useState({
    displayname: <b>Display Name</b>,
    username: <b>Username</b>,
    firstname: <b>First Name</b>,
    lastname: <b>Last Name</b>,
    email: <b>Email</b>,
    status: <b>Status</b>,
  })
  // const handleOpen = () => {
  //   setOpen(true)
  // }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <div className="container-detail-admin">

        <div className="left-detail-admin">
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
          >
            <AccountCircle fontSize="large" className="logo-detail-admin" />
          </IconButton>
          <p className="heading-admin">{users?.username}</p>
          <p>Admin</p>
        </div>
        <div className="right-detail-admin">
          <div className="nav-detail-admin">
            {/* <Button size="small" className="back-button" variant="outlined">
            <Link to="/user">
              <ArrowBack fontSize="inherit" />
              KEMBALI
            </Link>
          </Button> */}
            <div className="button-group">
              {/* <Button
              size="small"
              className="buttons"
              variant="contained"
              color="primary"
              onClick={handleOpen}
            >
              Akses Fitur
            </Button> */}
              {/* <Button
              size="small"
              className="edit-button"
              variant="contained"
              color="secondary"
            >
              <Link to={`/edit-admin/${user.id}`}>Edit</Link>
            </Button> */}
              {/* <Button
              size="small"
              className="delete-button"
              variant="contained"
              color="secondary"
            >
              <Delete fontSize="small" />
              Hapus
            </Button> */}
            </div>
          </div>
          <div className="content-detail-admin">
            <List
              component="nav"
              className="detail-admin"
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
              <ListItem button>
                <ListItemText primary={title.lastname} />
                <p>{users?.last_name}</p>
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary={title.email} />
                <p>{users?.email}</p>
              </ListItem>
              <ListItem button>
                <ListItemText primary={title.username} />
                <p>{users?.username}</p>
              </ListItem>
              <Divider light />
              <ListItem button>
                <ListItemText primary={title.status} />
                <AdminStatus status={users?.active} />
              </ListItem>
              <Divider light />
            </List>
          </div>
          <div>
            <ProfileModal open={open} onClose={handleClose} />
          </div>
        </div>
      </div>

    </>
  )
}

export default Profile

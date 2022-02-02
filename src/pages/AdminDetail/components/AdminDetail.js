import React, { useState, useContext, useEffect } from "react"
import { Button, List, ListItem, ListItemText } from "@material-ui/core"
import { ArrowBack } from "@material-ui/icons"
import { useParams, Link } from "react-router-dom"
import ModalAdmin from "./AdminModal"
import { AdminContext } from "../../../context/AdminContext"
import { AdminStatus } from "../../../components/statuses"
import profile from "../../../assets/images/profile.png"

const AdminDetail = () => {
  const { id } = useParams()
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-4 margin-auto">
          <div className="row flex-column align-items-center text-center">
            <img
              className="profile-image rounded-circle"
              src={profile}
              width="160px"
              height="160px"
              alt="profile"
            />
            <h5 className="mt-20">
              <strong>
                {users?.first_name} {users?.last_name}
              </strong>
            </h5>
            <span className="font-grey">{users?.username}</span>
            <span className="font-grey mt-10">{users?.group?.name}</span>
          </div>
        </div>
        <div className="col-8">
          <div className="button-area">
            <div className="button-left">
              <Button size="small" className="back-button" variant="outlined">
                <Link to="/user">
                  <ArrowBack fontSize="inherit" />
                  KEMBALI
                </Link>
              </Button>
            </div>
            <div className="button-right">
              {/* <Button
              size="small"
              className="buttons"
              variant="contained"
              color="primary"
              onClick={handleOpen}
            >
              Akses Fitur
            </Button> */}
              <Button
                size="small"
                className="edit-button"
                variant="contained"
                color="secondary"
              >
                <Link className="text-white" to={`/edit-admin/${id}`}>
                  Edit
                </Link>
              </Button>
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
              <ListItem button divider>
                <ListItemText primary={title.displayname} />
                {users?.display_name}
              </ListItem>
              <ListItem button divider>
                <ListItemText primary={title.firstname} />
                {users?.first_name}
              </ListItem>
              <ListItem button divider>
                <ListItemText primary={title.lastname} />
                {users?.last_name}
              </ListItem>
              <ListItem button divider>
                <ListItemText primary={title.email} />
                {users?.email}
              </ListItem>
              <ListItem button divider>
                <ListItemText primary={title.username} />
                {users?.username}
              </ListItem>
              <ListItem button divider>
                <ListItemText primary={title.status} />
                <AdminStatus status={users?.active} />
              </ListItem>
            </List>
          </div>
          <div>
            <ModalAdmin open={open} onClose={handleClose} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDetail

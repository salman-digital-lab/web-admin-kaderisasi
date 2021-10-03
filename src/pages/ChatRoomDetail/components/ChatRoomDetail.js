import React, { useState, useContext, useEffect } from "react"
import {
  Button,
  // Divider,
  // List,
  // ListItem,
  // ListItemText,
  // TextField,
} from "@material-ui/core"
import { ArrowBack, Delete } from "@material-ui/icons"
import { useParams, Link } from "react-router-dom"
import ModalAdmin from "./AdminModal"
import { AdminChatRoomContext } from "../../../context/AdminChatRoomContext"
// import { AdminStatus } from "../../../components/Statuses"
import { ConfirmationModal } from "./confirmation-modal"

const AdminDetail = () => {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [stateCanBeEdited, setStateCanBeEdited] = useState(false)
  const { studentCare, functions } = useContext(AdminChatRoomContext)
  const { getStudentCareDetail, deleteStudentCare } = functions
  useEffect(() => {
    getStudentCareDetail(id)
  }, [])

  const [open, setOpen] = useState(false)
  // const [title] = useState({
  //   displayname: <b>Display Name</b>,
  //   username: <b>Username</b>,
  //   firstname: <b>First Name</b>,
  //   lastname: <b>Last Name</b>,
  //   email: <b>Email</b>,
  //   status: <b>Status</b>,
  // })
  const studentCareDelete = () => {
    deleteStudentCare(id)
    setIsOpen(false)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleEdit = () => {
    setStateCanBeEdited(!stateCanBeEdited)
  }
  return (
    <>
      <div className="chat-room-detail">
        <div className="nav-chat-room-detail">
          <Button size="small" className="back-button" variant="outlined">
            <Link to="/chat-room">
              <ArrowBack fontSize="inherit" />
              KEMBALI
            </Link>
          </Button>
          <div className="button-group">
            {!stateCanBeEdited ? (
              <>
                <Button
                  size="small"
                  className="edit-button"
                  variant="contained"
                  color="secondary"
                  onClick={handleEdit}
                >
                  Sunting
                </Button>
                <Button
                  size="small"
                  className="delete-button"
                  variant="contained"
                  color="secondary"
                  onClick={() => setIsOpen(true)}
                >
                  <Delete fontSize="small" />
                  Hapus
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleEdit}
                >
                  Batalkan
                </Button>
                <Button
                  className="button-top-tambah-kegiatan"
                  variant="contained"
                  color="primary"
                  // onClick={handleSubmit}
                >
                  Simpan
                </Button>
              </>
            )}
          </div>
        </div>
        {/* <div className="content-detail-admin"> */}
        <div className="content-chat-room-detail">
          <div className="input-form">Deskripsi</div>
          <br />
          <div className="editor">
            <div>{studentCare.problem_category_desk}</div>
          </div>
        </div>
        {/* </div> */}
        <div>
          <ModalAdmin open={open} onClose={handleClose} />
          <ConfirmationModal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            title="Hapus Student Care"
            onSubmit={() => studentCareDelete()}
          />
        </div>
      </div>
    </>
  )
}

export default AdminDetail

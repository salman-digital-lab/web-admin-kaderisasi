import React, { useState, useContext, useEffect } from "react"
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  // TextField,
} from "@material-ui/core"
import { ArrowBack, Delete } from "@material-ui/icons"
import { useParams, Link } from "react-router-dom"
import moment from "moment"
import ModalAdmin from "./AdminModal"
import { AdminChatRoomContext } from "../../../context/AdminChatRoomContext"
import { StudentCareStatus } from "../../../components/Statuses"
import { ConfirmationModal } from "./confirmation-modal"
/* eslint-disable */
const AdminDetail = () => {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [stateCanBeEdited, setStateCanBeEdited] = useState(false)
  const { studentCare, functions } = useContext(AdminChatRoomContext)
  const { getStudentCareDetail, deleteStudentCare } = functions
  useEffect(() => {
    getStudentCareDetail(id)
  }, [])
  console.log(studentCare)
  const [open, setOpen] = useState(false)
  const [title] = useState({
    problem_owner_name: <b>Nama Client</b>,
    counselor_name: <b>Nama Konselor</b>,
    counselor_gender: <b>Preferensi Konselor</b>,
    problem_owner: <b>Pemilik Masalah</b>,
    problem_category: <b>Kategori</b>,
    technical_handling: <b>Metode Penanganan</b>,
    createdAt: <b>Dibuat</b>,
    updatedAt: <b>Diperbarui</b>,
    status: <b>Status Penanganan</b>,
  })
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
        <div className="container-detail-chatroom">
          <div className="left-detail-chatroom">
            <div className="content-detail-admin">
              <List
                component="nav"
                className="detail-admin"
                aria-label="mailbox folders"
              >
                <ListItem button divider>
                  <ListItemText primary={title.problem_owner_name} />
                  <p>{studentCare?.problem_owner_name}</p>
                </ListItem>
                <ListItem button divider>
                  <ListItemText primary={title.problem_category} />
                  <p>{studentCare?.problem_category}</p>
                </ListItem>
                <ListItem button divider>
                  <ListItemText primary={title.technical_handling} />
                  <p>{studentCare?.last_name}</p>
                </ListItem>
                <ListItem button divider>
                  <ListItemText primary={title.problem_owner} />
                  <p>{studentCare?.problem_owner}</p>
                </ListItem>
                <ListItem button divider>
                  <ListItemText primary={title.createdAt} />
                  <p>{moment(studentCare?.created_at).format("D MMM YYYY HH:mm")}</p>
                </ListItem>
                <Divider light />
              </List>
            </div>
          </div>
          <div className="right-detail-chatroom">
            <div className="content-detail-admin">
              <List
                component="nav"
                className="detail-admin"
                aria-label="mailbox folders"
              >
                <ListItem button divider>
                  <ListItemText primary={title.counselor_name} />
                  <p>{studentCare?.counselor_name}</p>
                </ListItem>
                <ListItem button divider>
                  <ListItemText primary={title.counselor_gender} />
                  <p>{studentCare?.counselor_gender}</p>
                </ListItem>
                <ListItem button divider>
                  <ListItemText primary={title.status} />
                  <StudentCareStatus status={studentCare?.status_handling} />
                </ListItem>
                <ListItem button divider>
                  <ListItemText primary={title.updatedAt} />
                  <p>{moment(studentCare?.updated_at).format("D MMM YYYY HH:mm")}</p>
                </ListItem>
                <Divider light />
              </List>
            </div>
          </div>
        </div>
        <div className="content-chat-room-detail">
          <div className="input-form">Deskripsi Masalah</div>
          <br />
          <div className="editor">
            <div>{studentCare.problem_category_desk}</div>
          </div>
        </div>
        <div className="content-chat-room-detail">
          <div className="input-form">Deskripsi Penanganan</div>
          <br />
          <div className="editor">
            <div>{studentCare.desk_handling}</div>
          </div>
        </div>
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

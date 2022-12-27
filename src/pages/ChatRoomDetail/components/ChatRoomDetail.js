/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  InputLabel,
  Select,
  Input,
  MenuItem,
  FormControl,
  Collapse,
  IconButton,
} from "@material-ui/core"
import { ArrowBack, Delete, Close } from "@material-ui/icons"
import { useParams, Link } from "react-router-dom"
import moment from "moment"
import { useTheme } from "@material-ui/core/styles"
import Alert from "@material-ui/lab/Alert"
import { AdminChatRoomContext } from "../../../context/AdminChatRoomContext"
import { StudentCareStatus } from "../../../components/statuses"
import { ConfirmationModal } from "./confirmation-modal"
import { MenuProps, getStyles } from "../../../components/select"
import styled from "./styled"

const AdminDetail = () => {
  const { id } = useParams()
  const classes = styled()
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [stateCanBeEdited, setStateCanBeEdited] = useState(false)
  const [success, setSuccess] = useState(false)
  const [title] = useState({
    problem_owner_name: <b>Nama Temhat</b>,
    counselor_name: <b>Nama Pendengar</b>,
    counselor_gender: <b>Preferensi Pendengar</b>,
    problem_owner: <b>Pemilik Masalah</b>,
    problem_category: <b>Kategori</b>,
    technical_handling: <b>Metode Penanganan</b>,
    createdAt: <b>Dibuat</b>,
    updatedAt: <b>Diperbarui</b>,
    status: <b>Status Penanganan</b>,
  })
  const [technicalHandlingList] = useState([
    { value: "Online", label: "Online" },
    { value: "Bertemu langsung", label: "Bertemu Langsung" },
  ])
  const [problemOwnerList] = useState([
    { value: "Diri Sendiri", label: "Diri Sendiri" },
    { value: "Teman", label: "Teman" },
  ])
  const [counselorGenderList] = useState([
    { value: "Laki-laki", label: "Laki-laki" },
    { value: "Perempuan", label: "Wanita" },
    { value: "Keduanya", label: "Keduanya" },
  ])
  const [statusHandlingList] = useState([
    { value: "Belum Ditangani", label: "Belum Ditangani" },
    { value: "Sedang Ditangani", label: "Sedang Ditangani" },
    { value: "Sudah Ditangani", label: "Sudah Ditangani" },
    { value: "Akan Ditangani", label: "Akan Ditangani" },
  ])

  const [payload, setPayload] = useState({})
  const {
    listCounselors,
    studentCare,
    studentCareResp,
    setStudentCareResp,
    functions,
  } = useContext(AdminChatRoomContext)
  const {
    getStudentCareDetail,
    deleteStudentCare,
    editStudentCare,
    getCounselors,
  } = functions
  useEffect(() => {
    getStudentCareDetail(id)
    if (studentCareResp.status === "SUCCESS") {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }
  }, [studentCareResp])

  useEffect(() => {
    getCounselors()
  }, [])

  const studentCareDelete = () => {
    deleteStudentCare(id)
    setIsOpen(false)
  }

  const handleEdit = () => {
    setStateCanBeEdited(!stateCanBeEdited)
  }
  const handleForm = (value, type) => {
    setPayload({ ...payload, [type]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStateCanBeEdited(!stateCanBeEdited)
    editStudentCare(id, payload)
    getStudentCareDetail(id)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="chat-room-detail">
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
                  color="primary"
                  onClick={handleEdit}
                >
                  Edit
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
                  size="small"
                  variant="contained"
                  color="secondary"
                  className="cancel-button"
                  onClick={handleEdit}
                >
                  Batal
                </Button>
                <Button
                  size="small"
                  className="button-top-tambah-kegiatan"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Simpan
                </Button>
              </>
            )}
          </div>
        </div>
        <Collapse in={success}>
          <Alert
            className="alert-popup"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setSuccess(false)
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
          >
            {studentCareResp.message}
          </Alert>
        </Collapse>
        <div className="container-detail-chatroom">
          <div className="left-detail-chatroom">
            <div className="content-detail-admin">
              <List
                component="nav"
                className="detail-admin"
                aria-label="mailbox folders"
              >
                <ListItem button divider>
                  {stateCanBeEdited ? (
                    <TextField
                      required
                      fullWidth
                      label="Nama Temhat"
                      placeholder="Nama Temhat"
                      defaultValue={studentCare?.problem_owner_name}
                      onChange={(event) =>
                        handleForm(event.target.value, "problem_owner_name")
                      }
                    />
                  ) : (
                    <>
                      <ListItemText primary={title.problem_owner_name} />
                      <p className="mb-0">{studentCare?.problem_owner_name}</p>
                    </>
                  )}
                </ListItem>
                <ListItem button divider>
                  {stateCanBeEdited ? (
                    <TextField
                      required
                      fullWidth
                      label="Kategori"
                      placeholder="Kategori"
                      defaultValue={studentCare?.problem_category}
                      onChange={(event) =>
                        handleForm(event.target.value, "problem_category")
                      }
                    />
                  ) : (
                    <>
                      <ListItemText primary={title.problem_category} />
                      <p className="mb-0">{studentCare?.problem_category}</p>
                    </>
                  )}
                </ListItem>
                <ListItem button divider>
                  {stateCanBeEdited ? (
                    <FormControl className={classes.EditFormControl}>
                      <InputLabel id="demo-mutiple-name-label">
                        Metode Penanganan
                      </InputLabel>
                      <Select
                        defaultValue={studentCare?.technical_handling}
                        onChange={(event) =>
                          handleForm(event.target.value, "technical_handling")
                        }
                        input={<Input />}
                        MenuProps={MenuProps}
                      >
                        {technicalHandlingList.map((method) => (
                          <MenuItem
                            key={`${method.value}`}
                            value={method.value}
                            label={method.label}
                            style={getStyles(
                              method,
                              technicalHandlingList,
                              theme
                            )}
                          >
                            {method.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <>
                      <ListItemText primary={title.technical_handling} />
                      <p className="mb-0">{studentCare?.technical_handling}</p>
                    </>
                  )}
                </ListItem>
                <ListItem button divider>
                  {stateCanBeEdited ? (
                    <FormControl className={classes.EditFormControl}>
                      <InputLabel id="demo-mutiple-name-label">
                        Pemilik Masalah
                      </InputLabel>
                      <Select
                        defaultValue={studentCare?.problem_owner}
                        onChange={(event) =>
                          handleForm(event.target.value, "problem_owner")
                        }
                        input={<Input />}
                        MenuProps={MenuProps}
                      >
                        {problemOwnerList.map((method) => (
                          <MenuItem
                            key={`${method.value}`}
                            value={method.value}
                            label={method.label}
                            style={getStyles(method, problemOwnerList, theme)}
                          >
                            {method.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <>
                      <ListItemText primary={title.problem_owner} />
                      <p className="mb-0">{studentCare?.problem_owner}</p>
                    </>
                  )}
                </ListItem>
                <ListItem button divider>
                  <ListItemText primary={title.createdAt} />
                  <p className="mb-0">
                    {moment(studentCare?.created_at).format("D MMM YYYY HH:mm")}
                  </p>
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
                  {stateCanBeEdited ? (
                    <FormControl className={classes.EditFormControl}>
                      <InputLabel id="demo-mutiple-name-label">
                        Nama Pendengar
                      </InputLabel>
                      <Select
                        defaultValue={studentCare?.id_counselor}
                        onChange={(event) =>
                          handleForm(Number(event.target.value), "id_counselor")
                        }
                        input={<Input />}
                        MenuProps={MenuProps}
                      >
                        {listCounselors.map((method) => (
                          <MenuItem
                            key={`${method.id}`}
                            value={method.user_id}
                            label={method.display_name}
                            style={getStyles(method, listCounselors, theme)}
                          >
                            {method.display_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <>
                      <ListItemText primary={title.counselor_name} />
                      <p className="mb-0">
                        {studentCare?.counselor?.display_name}
                      </p>
                    </>
                  )}
                </ListItem>
                <ListItem button divider>
                  {stateCanBeEdited ? (
                    <FormControl className={classes.EditFormControl}>
                      <InputLabel id="demo-mutiple-name-label">
                        Preferensi Pendengar
                      </InputLabel>
                      <Select
                        defaultValue={studentCare?.counselor_gender}
                        onChange={(event) =>
                          handleForm(event.target.value, "counselor_gender")
                        }
                        input={<Input />}
                        MenuProps={MenuProps}
                      >
                        {counselorGenderList.map((method) => (
                          <MenuItem
                            key={`${method.value}`}
                            value={method.value}
                            label={method.label}
                            style={getStyles(
                              method,
                              counselorGenderList,
                              theme
                            )}
                          >
                            {method.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <>
                      <ListItemText primary={title.counselor_gender} />
                      <p className="mb-0">{studentCare?.counselor_gender}</p>
                    </>
                  )}
                </ListItem>
                <ListItem button divider>
                  {stateCanBeEdited ? (
                    <FormControl className={classes.EditFormControl}>
                      <InputLabel id="demo-mutiple-name-label">
                        Status Penanganan
                      </InputLabel>
                      <Select
                        defaultValue={studentCare?.status_handling}
                        onChange={(event) =>
                          handleForm(event.target.value, "status_handling")
                        }
                        input={<Input />}
                        MenuProps={MenuProps}
                      >
                        {statusHandlingList.map((method) => (
                          <MenuItem
                            key={`${method.value}`}
                            value={method.value}
                            label={method.label}
                            style={getStyles(method, statusHandlingList, theme)}
                          >
                            {method.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <>
                      <ListItemText primary={title.status} />
                      <StudentCareStatus
                        status={studentCare?.status_handling}
                      />
                    </>
                  )}
                </ListItem>
                <ListItem button divider>
                  <ListItemText primary={title.updatedAt} />
                  <p className="mb-0">
                    {moment(studentCare?.updated_at).format("D MMM YYYY HH:mm")}
                  </p>
                </ListItem>
                <Divider light />
              </List>
            </div>
          </div>
        </div>
        <div className="content-chat-room-detail">
          {stateCanBeEdited ? (
            <TextField
              id="outlined-multiline-static"
              label="Deskripsi Masalah"
              multiline
              fullWidth
              rows={5}
              defaultValue={studentCare?.problem_category_desk}
              onChange={(event) =>
                handleForm(event.target.value, "problem_category_desk")
              }
            />
          ) : (
            <>
              <div className="input-form">Deskripsi Masalah</div>
              <br />
              <div className="editor">
                <div>{studentCare?.problem_category_desk}</div>
              </div>
            </>
          )}
        </div>
        <div className="content-chat-room-detail">
          {stateCanBeEdited ? (
            <TextField
              id="outlined-multiline-static"
              label="Deskripsi Penanganan"
              multiline
              fullWidth
              rows={5}
              defaultValue={studentCare?.desk_handling}
              onChange={(event) =>
                handleForm(event.target.value, "desk_handling")
              }
            />
          ) : (
            <>
              <div className="input-form">Deskripsi Penanganan</div>
              <br />
              <div className="editor">
                <div>{studentCare?.desk_handling}</div>
              </div>
            </>
          )}
        </div>

        <div>
          <ConfirmationModal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            title="Hapus Student Care?"
            onSubmit={() => studentCareDelete()}
          />
        </div>
      </form>
    </>
  )
}

export default AdminDetail

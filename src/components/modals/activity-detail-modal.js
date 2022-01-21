import React, { useState, useContext, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Modal,
  Fade,
  Backdrop,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { Delete, Visibility } from "@material-ui/icons"
import { EditorState } from "draft-js"
import "../../assets/scss/AddActivity.scss"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import moment from "moment"
import FormData from "form-data"
import RichEditor, {
  getEditorContent,
  getContentString,
} from "../rich-text-editor"
import { EnhancedTableHead, stableSort, getComparator } from "../table-design"
import { AdminActivityContext } from "../../context/AdminActivityContext"
import BaseImage from "./1056x816small.png"
import styled from "./styled"
/* eslint-disable */

const headCells = [
  { id: "id", numeric: false, label: "ID" },
  { id: "action", numeric: false, label: "Action" },
]

const initialErrors = {
  formRegistValidity: false, // flip to true if form incorrect
  dateRegistValidity: false,
  dateRegistErrorMsg: "",
  formActivityValidity: false, // flip to true if form incorrect
  dateActivityValidity: false,
  dateActivityErrorMsg: "",
}

export const DatePickerCustom = ({
  title: titleProps,
  value: valueProps,
  onChange: onChangeProps,
  helperText: helperTextProps,
  error: errorProps,
}) => (
  <div className="input-form">
    {titleProps}
    <br />
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className="form-modal"
        minDate={new Date()}
        format="dd/MM/yyyy"
        margin="normal"
        value={valueProps}
        onChange={onChangeProps}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        helperText={helperTextProps}
        error={errorProps}
      />
    </MuiPickersUtilsProvider>
  </div>
)

const DetailKegiatanModal = ({ open, onClose, data, categoryList }) => {
  const ref = useRef()
  const classes = styled()
  const { activityBanner, functions } = useContext(AdminActivityContext)
  const {
    editActivity,
    getActivityBannerById,
    uploadImageBanner,
    deleteBannerById,
  } = functions
  const [rows, setRows] = useState(activityBanner)
  const [uploadedImage, setUploadImage] = useState(BaseImage)
  const [submitError, setSubmitError] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [jenjang, setJenjang] = useState(data.minimum_role_id)
  const [title, setTitle] = useState(data.name)
  const [categoryId, setCategoryId] = useState(data.category_id)
  const [isPublished, setIsPublished] = useState(
    data.is_published === 1 ? true : false
  )
  const [status, setStatus] = useState(data.status === "OPENED" ? true : false)
  const { id } = useParams()
  const [formData, setFormData] = useState({})
  const [registerBeginDate, setStartDate] = useState(
    moment(data.register_begin_date).format("YYYY-MM-DD")
  )
  const [registerEndDate, setExpiredDate] = useState(
    moment(data.register_end_date).format("YYYY-MM-DD")
  )
  const [beginDate, setActivityStart] = useState(
    moment(data.begin_date).format("YYYY-MM-DD")
  )
  const [endDate, setActivityExpired] = useState(
    moment(data.end_date).format("YYYY-MM-DD")
  )
  const [errors, setErrors] = useState(initialErrors)
  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("created_at")
  const stateEdit = EditorState.createEmpty()
  const [editorState, setEditorState] = useState(
    getEditorContent(data?.description ?? "")
  )

  const validateDates = () => {
    // check dates via the dates{} state object
    let dateRegistErrorMsg = ""
    let dateRegistValidity = false
    let formRegistValidity = false

    let formActivityValidity = false // flip to true if form incorrect
    let dateActivityValidity = false
    let dateActivityErrorMsg = ""

    const dateRegistrationCheck =
      new Date(registerBeginDate) <= new Date(registerEndDate)
    const dateActivityCheck = new Date(beginDate) <= new Date(endDate)

    dateRegistErrorMsg = dateRegistrationCheck
      ? ""
      : `End registration date can't be before start registration date.`
    dateRegistValidity = dateRegistrationCheck ? false : true // true if error - end date before start date
    formRegistValidity = dateRegistValidity ? false : true // true if errors in the form

    dateActivityErrorMsg = dateActivityCheck
      ? ""
      : `End activity date can't be before start activity date.`
    dateActivityValidity = dateActivityCheck ? false : true // true if error - end date before start date
    formActivityValidity = dateActivityValidity ? false : true // true if errors in the form

    setErrors((prevState) => ({
      ...prevState,
      dateRegistValidity,
      dateRegistErrorMsg,
      formRegistValidity,
      dateActivityErrorMsg,
      dateActivityValidity,
      formActivityValidity,
    }))
  }

  useEffect(() => {
    validateDates()
  }, [registerBeginDate, registerEndDate, beginDate, endDate])

  useEffect(() => {
    getActivityBannerById(id)
  }, [])

  useEffect(() => {
    setRows(activityBanner)
  }, [activityBanner])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "desc"
    setOrder(isAsc ? "desc" : "desc")
    setOrderBy(property)
  }

  const handleForm = (value, type) => {
    setFormData({ ...formData, [type]: value })
  }

  const handleTitleChange = (event) => {
    handleForm(event.target.value, "name")
    setTitle(event.target.value)
  }

  const setEditor = (content) => {
    setEditorState(content)
    handleForm(getContentString(content), "description")
  }

  const handleStartRegistrationChange = (date) => {
    handleForm(moment(date).format("YYYY-MM-DD"), "register_begin_date")
    setStartDate(date)
  }

  const handleExpiredRegistrationChange = (date) => {
    handleForm(moment(date).format("YYYY-MM-DD"), "register_end_date")
    setExpiredDate(date)
  }

  const handleStartActivityChange = (date) => {
    handleForm(moment(date).format("YYYY-MM-DD"), "begin_date")
    setActivityStart(date)
  }

  const handleExpiredActivityChange = (date) => {
    handleForm(moment(date).format("YYYY-MM-DD"), "end_date")
    setActivityExpired(date)
  }

  const handleJenjangChange = (event) => {
    handleForm(Number(event.target.value), "minimum_role_id")
    setJenjang(event.target.value)
  }

  const handleCategoryChange = (event) => {
    handleForm(event.target.value, "category_id")
    setCategoryId(event.target.value)
  }

  const handleStatus = (event) => {
    handleForm(event.target.checked ? "OPENED" : "CLOSED", "status")
    setStatus(event.target.checked)
  }

  const handlePublished = (event) => {
    handleForm(event.target.checked ? "1" : "0", "is_published")
    setIsPublished(event.target.checked)
  }

  const handleRemoveImage = (idx) => {
    deleteBannerById(idx)
    const newBanner = rows.filter((x) => x.id !== idx)
    setRows(newBanner)
  }

  const showBanner = (banner_url) => {
    const canvas = document.createElement("canvas")
    canvas.width = 1056
    canvas.height = 816
    const imgTemp = document.createElement("img")
    imgTemp.setAttribute("src", banner_url)
    imgTemp.setAttribute("alt", "logo")
    imgTemp.setAttribute("className", "img-fluid")
    imgTemp.setAttribute("crossOrigin", "Anonymous")
    const ctx = canvas.getContext("2d")
    imgTemp.onload = async function () {
      ctx.drawImage(imgTemp, 0, 0, canvas.width, canvas.height)
      const url = canvas.toDataURL("image/png")
      setUploadImage(url)
    }
  }
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0])
      const canvas = document.createElement("canvas")
      canvas.width = 1056
      canvas.height = 816
      const imgTemp = document.createElement("img")
      imgTemp.setAttribute("src", file)
      const ctx = canvas.getContext("2d")
      imgTemp.onload = async function () {
        ctx.drawImage(imgTemp, 0, 0, canvas.width, canvas.height)
        const url = canvas.toDataURL("image/png")
        setUploadImage(url)
      }
    }
  }
  const submitForm = async (e) => {
    e.preventDefault()
    if (document.getElementById("logo").files[0]) {
      try {
        let formdata = new FormData()
        formdata.append("activity_id", id)
        formdata.append(
          "banner_image",
          document.getElementById("logo").files[0]
        )
        await uploadImageBanner(formdata)
        setSubmitSuccess(true)
        getActivityBannerById(id)
        ref.current.value = ""
      } catch (err) {
        setUploadImage(BaseImage)
        setSubmitError(true)
      }
    } else {
      setUploadImage(BaseImage)
      setSubmitError(true)
    }
  }

  const handleSubmit = () => {
    if (errors.formActivityValidity && errors.formRegistValidity) {
      editActivity(id, formData)
      onClose()
    }
  }

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div className="form-flex">
            <div className="left-form">
              <div className="container-gambar-detail">
                <img alt="logo" src={uploadedImage} className="img-fluid" />
              </div>
              <div>
                <br />
                <Paper style={{ maxHeight: 300, overflow: "auto" }}>
                  <TableContainer>
                    <Table
                      aria-labelledby="tableTitle"
                      size={"medium"}
                      aria-label="enhanced table"
                    >
                      <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        headCells={headCells}
                      />
                      <TableBody>
                        {stableSort(rows, getComparator(order, orderBy)).map(
                          (row, index) => {
                            return (
                              <TableRow hover tabIndex={-1} key={index}>
                                <TableCell className="table-cell">
                                  {row.id}
                                </TableCell>
                                {/* <TableCell className="table-cell">
                                  {row.filename}
                                </TableCell> */}
                                {/* <TableCell className="table-cell">{new Date(row.uploadedAt).toLocaleDateString()}</TableCell> */}
                                <TableCell className="table-cell">
                                  <Button
                                    color="primary"
                                    size="small"
                                    onClick={() => showBanner(row.filename)}
                                  >
                                    <Visibility fontSize="small" />
                                  </Button>
                                  <Button
                                    color="secondary"
                                    size="small"
                                    onClick={() => handleRemoveImage(row.id)}
                                  >
                                    <Delete fontSize="small" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )
                          }
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </div>
            <div className="right-form">
              <div className="container-button-kegiatan">
                {submitError && (
                  <Alert
                    className="button-kegiatan"
                    onClose={() => {
                      setSubmitError(false)
                    }}
                    severity="error"
                  >
                    Error! Silahkan lakukan unggah gambar kembali.
                  </Alert>
                )}
                {submitSuccess && (
                  <Alert
                    className="button-kegiatan"
                    onClose={() => {
                      setSubmitSuccess(false)
                    }}
                    severity="success"
                  >
                    Sukses mengunggah gambar.
                  </Alert>
                )}
                <form onSubmit={submitForm}>
                  <input
                    className="button-kegiatan"
                    type="file"
                    name="logo"
                    id="logo"
                    ref={ref}
                    onChange={onImageChange}
                  />
                  <Button
                    className="button-kegiatan primary-button"
                    variant="contained"
                    type="submit"
                  >
                    Upload Gambar
                  </Button>
                </form>
              </div>
              <div className="detail-activity">
                <div className="input-form">
                  <TextField
                    className="form-modal"
                    required
                    label="Nama Kegiatan"
                    fullWidth
                    placeholder="Nama Kegiatan"
                    defaultValue={title}
                    onChange={handleTitleChange}
                  />
                </div>
              </div>
              <div className="select-form">
                Kategori Kegiatan
                <br />
                {categoryList?.status === "SUCCESS" && (
                  <Select
                    className="select-input-form"
                    value={categoryId}
                    onChange={handleCategoryChange}
                  >
                    {categoryList?.data?.data?.map((category) => (
                      <MenuItem key={category} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </div>
              <div className="select-form">
                Jenjang Minimal
                <br />
                <Select
                  className="select-input-form"
                  value={jenjang}
                  onChange={handleJenjangChange}
                >
                  <MenuItem value={4}>Jamaah</MenuItem>
                  <MenuItem value={5}>Aktivis</MenuItem>
                  <MenuItem value={6}>Kader</MenuItem>
                  <MenuItem value={7}>Kader Lanjut</MenuItem>
                </Select>
              </div>
              <div className="detail-activity">
                <DatePickerCustom
                  title="Tanggal Mulai Kegiatan"
                  value={beginDate}
                  onChange={handleStartActivityChange}
                  error={errors.dateActivityValidity}
                />
                <DatePickerCustom
                  title="Tanggal Selesai Kegiatan"
                  value={endDate}
                  onChange={handleExpiredActivityChange}
                  error={errors.dateActivityValidity}
                  helperText={errors.dateActivityErrorMsg}
                />
              </div>
              <div className="detail-activity">
                <DatePickerCustom
                  title="Tanggal Mulai Registrasi"
                  value={registerBeginDate}
                  onChange={handleStartRegistrationChange}
                  error={errors.dateRegistValidity}
                />
                <DatePickerCustom
                  title="Tanggal Selesai Registrasi"
                  value={registerEndDate}
                  onChange={handleExpiredRegistrationChange}
                  error={errors.dateRegistValidity}
                  helperText={errors.dateRegistErrorMsg}
                />
              </div>
              <div className="detail-activity">
                <span>
                  <Checkbox
                    checked={isPublished}
                    color="primary"
                    onChange={handlePublished}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />{" "}
                  Published
                </span>
                <span>
                  <Checkbox
                    checked={status}
                    color="primary"
                    onChange={handleStatus}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />{" "}
                  Opened Registration
                </span>
              </div>

              <div className="detail-activity">
                <RichEditor
                  onEditorStateChange={setEditor}
                  editorState={editorState}
                />
              </div>
              <div className="button-bottom">
                <Button
                  onClick={onClose}
                  className="button-bottoms-kegiatan"
                  variant="contained"
                  color="secondary"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="button-bottoms-kegiatan primary-button"
                  variant="contained"
                  disabled={
                    !errors.formActivityValidity || !errors.formRegistValidity
                  }
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default DetailKegiatanModal

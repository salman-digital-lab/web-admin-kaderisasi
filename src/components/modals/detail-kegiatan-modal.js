import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router"
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
} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { Delete, Visibility } from "@material-ui/icons"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "../../assets/scss/AddActivity.scss"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import moment from "moment"
import { EnhancedTableHead, stableSort, getComparator } from "../TableDesign"
import { AdminActivityContext } from "../../context/AdminActivityContext"
import BaseImage from "./1056x816small.png"
/* eslint-disable */
function createData(id, value, uploadedAt) {
  return { id, value, uploadedAt }
}

const headCells = [
  { id: "id", numeric: false, label: "ID" },
  // { id: 'uploadedAt', numeric: false, label: 'Uploaded At' },
  { id: "action", numeric: false, label: "Action" },
]

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    position: "absolute",
    width: 900,
    height: 650,
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid white',
    outline: "none",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  root: {
    width: "100%",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    alignContent: "left",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}))

function getformStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

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

const DetailKegiatanModal = ({ open, onClose, data }) => {
  const { formTemplateList, functions } = useContext(AdminActivityContext)
  const { editActivity, getAllFormTemplate } = functions
  const [rows, setRows] = useState(
    JSON.parse(localStorage.getItem(0)) &&
      JSON.parse(localStorage.getItem(0)).length > 0
      ? JSON.parse(localStorage.getItem(0)).map((x) =>
          createData(x.id, x.value, x.uploadedAt)
        )
      : []
  )
  const [uploadedImage, setUploadImage] = useState(
    JSON.parse(localStorage.getItem(0)) &&
      JSON.parse(localStorage.getItem(0)).length > 0
      ? JSON.parse(localStorage.getItem(0))[
          JSON.parse(localStorage.getItem(0)).length - 1
        ].value
      : BaseImage
  )
  const [submitError, setSubmitError] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const classes = useStyles()
  const [formStyle] = useState(getformStyle)
  const [jenjang, setJenjang] = useState(data.minimum_role_id)
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

  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("uploadedAt")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const validateDates = () => {
    // check dates via the dates{} state object, line 33
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
    if (formTemplateList.length < 1) {
      getAllFormTemplate()
    }
    validateDates()
  }, [
    registerBeginDate,
    registerEndDate,
    beginDate,
    endDate,
    formTemplateList,
    getAllFormTemplate,
  ])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleForm = (value, type) => {
    setFormData({ ...formData, [type]: value })
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

  const handleKuisioner = (event) => {
    handleForm(event.target.value, "form_id")
  }

  const handleStatus = (event) => {
    handleForm(event.target.checked ? "OPENED" : "CLOSED", "status")
    setStatus(event.target.checked)
  }

  const handlePublished = (event) => {
    handleForm(event.target.checked ? "1" : "0", "is_published")
    setIsPublished(event.target.checked)
  }

  const handleRemoveImage = (id) => {
    const tmp = JSON.parse(localStorage.getItem(0)).filter((x) => x.id !== id)
    localStorage.setItem(0, JSON.stringify(tmp))
    setRows(tmp)
  }

  const submitForm = (e) => {
    e.preventDefault()
    if (document.getElementById("logo").files[0]) {
      const file = URL.createObjectURL(document.getElementById("logo").files[0])
      const canvas = document.createElement("canvas")
      canvas.width = 1056
      canvas.height = 816
      const imgTemp = document.createElement("img")
      imgTemp.setAttribute("src", file)
      const ctx = canvas.getContext("2d")
      imgTemp.onload = function () {
        ctx.drawImage(imgTemp, 0, 0)
        const url = canvas.toDataURL("image/png")
        const dataImage = JSON.parse(localStorage.getItem(0))
          ? JSON.parse(localStorage.getItem(0))
          : []
        try {
          dataImage.push({
            id: new Date().getTime(),
            value: url,
            uploadedAt: new Date(),
          })
          setUploadImage(url)
          window.localStorage.setItem(0, JSON.stringify(dataImage))
          setSubmitSuccess(true)
          setRows(
            JSON.parse(localStorage.getItem(0)).map((x) =>
              createData(x.id, x.value, x.uploadedAt)
            )
          )
        } catch (evt) {
          setUploadImage(BaseImage)
          setSubmitError(true)
        }
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
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Fade in={open}>
        <div style={formStyle} className={classes.paper}>
          <div className="form-flex">
            <div className="left-form">
              <div className="container-gambar-detail">
                <img alt="logo" src={uploadedImage} className="img-fluid" />
              </div>
              <div>
                <br />
                <Paper>
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
                        {stableSort(rows, getComparator(order, orderBy))
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            return (
                              <TableRow hover tabIndex={-1} key={index}>
                                <TableCell className="table-cell">
                                  {row.id.toString().slice(7, 13)}
                                </TableCell>
                                {/* <TableCell className="table-cell">{new Date(row.uploadedAt).toLocaleDateString()}</TableCell> */}
                                <TableCell className="table-cell">
                                  <Button
                                    color="primary"
                                    size="small"
                                    onClick={() => setUploadImage(row.value)}
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
                          })}
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
                  />
                  <Button
                    className="button-kegiatan"
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={
                      JSON.parse(localStorage.getItem(0)) &&
                      JSON.parse(localStorage.getItem(0)).length > 3
                    }
                  >
                    {JSON.parse(localStorage.getItem(0)) &&
                    JSON.parse(localStorage.getItem(0)).length > 3
                      ? "Max. Gambar hanya 4!"
                      : "Upload Gambar"}
                  </Button>
                </form>
              </div>
              <div>
                <Checkbox
                  checked={isPublished}
                  color="primary"
                  onChange={handlePublished}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />{" "}
                Published
                <Checkbox
                  checked={status}
                  color="primary"
                  onChange={handleStatus}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />{" "}
                Opened Registration
              </div>
              <br />
              <div className="detail-activity">
                <DatePickerCustom
                  title="Tanggal Mulai Kegiatan"
                  value={beginDate}
                  onChange={handleStartActivityChange}
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
                />
                <DatePickerCustom
                  title="Tanggal Selesai Registrasi"
                  value={registerEndDate}
                  onChange={handleExpiredRegistrationChange}
                  error={errors.dateRegistValidity}
                  helperText={errors.dateRegistErrorMsg}
                />
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
              <div className="select-form">
                Kuisioner
                <br />
                <Select
                  className="select-input-form"
                  defaultValue={-1}
                  onChange={handleKuisioner}
                >
                  {formTemplateList.map((value, index) => (
                    <MenuItem key={index} value={value.value}>
                      {value.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="button-bottom">
                <Button
                  onClick={onClose}
                  className="button-bottoms-kegiatan"
                  variant="contained"
                  color="secondary"
                >
                  Batalkan
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="button-bottoms-kegiatan"
                  variant="contained"
                  color="primary"
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

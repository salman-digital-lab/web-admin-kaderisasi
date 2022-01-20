import React, { useState, useEffect, useContext } from "react"
import {
  Button,
  Modal,
  Fade,
  Backdrop,
  Select,
  TextField,
  MenuItem,
  Checkbox,
} from "@material-ui/core"
import moment from "moment"
import DateFnsUtils from "@date-io/date-fns"
import PropTypes from "prop-types"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import { EditorState } from "draft-js"
import RichEditor, {
  getPlainText,
  getContentString,
} from "../../../components/rich-text-editor"
import "../../../assets/scss/AddActivity.scss"
import styled from "./styled"
import { AdminActivityContext } from "../../../context/AdminActivityContext"

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

DatePickerCustom.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
}

export const KegiatanModal = ({ open, onClose }) => {
  const classes = styled()
  const [state, setState] = useState({
    name: "",
    begin_date: moment().format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
    register_begin_date: moment().format("YYYY-MM-DD"),
    register_end_date: moment().format("YYYY-MM-DD"),
    category_id: -1,
    minimum_role_id: -1,
  })
  const { categoryList, functions } = useContext(AdminActivityContext)
  const { getActivityCategory, addActivity } = functions
  const [errors, setErrors] = useState(initialErrors)
  const stateEdit = EditorState.createEmpty()
  const [editorState, setEditorState] = useState(stateEdit)

  const validateDates = () => {
    // check dates via the dates{} state object, line 33
    let dateRegistErrorMsg = ""
    let dateRegistValidity = false
    let formRegistValidity = false

    let formActivityValidity = false // flip to true if form incorrect
    let dateActivityValidity = false
    let dateActivityErrorMsg = ""

    const dateRegistrationCheck =
      new Date(state.register_begin_date) <= new Date(state.register_end_date)
    const dateActivityCheck =
      new Date(state.begin_date) <= new Date(state.end_date)

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
    getActivityCategory()
  }, [])
  useEffect(() => {
    validateDates()
  }, [state])

  const handleForm = (value, type) => {
    setState({ ...state, [type]: value })
  }

  const setEditor = (content) => {
    setEditorState(content)
    handleForm(getContentString(content), "description")
  }

  const handleSubmit = async () => {
    await addActivity(state)
    onClose()
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
            <div>
              <div className="detail-activity">
                <div className="input-form">
                  <TextField
                    className="form-modal"
                    required
                    label="Nama Kegiatan"
                    fullWidth
                    placeholder="Nama Kegiatan"
                    value={state.name}
                    onChange={(event) => handleForm(event.target.value, "name")}
                  />
                </div>
              </div>
              <div className="select-form">
                Kategori Kegiatan
                <br />
                {categoryList?.status === "SUCCESS" && (
                  <Select
                    className="select-input-form"
                    value={state.category_id}
                    onChange={(event) =>
                      handleForm(event.target.value, "category_id")
                    }
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
                  value={state.minimum_role_id}
                  onChange={(event) =>
                    handleForm(event.target.value, "minimum_role_id")
                  }
                >
                  <MenuItem value={-1}>-- Pilih Minimum Jenjang --</MenuItem>
                  <MenuItem value={4}>Jamaah</MenuItem>
                  <MenuItem value={5}>Aktivis</MenuItem>
                  <MenuItem value={6}>Kader</MenuItem>
                  <MenuItem value={7}>Kader Lanjut</MenuItem>
                </Select>
              </div>
              <div className="detail-activity">
                <DatePickerCustom
                  title="Tanggal Mulai Kegiatan"
                  value={state.begin_date}
                  onChange={(event) =>
                    handleForm(moment(event).format("YYYY-MM-DD"), "begin_date")
                  }
                  error={errors.dateActivityValidity}
                />
                <DatePickerCustom
                  title="Tanggal Selesai Kegiatan"
                  value={state.end_date}
                  onChange={(event) =>
                    handleForm(moment(event).format("YYYY-MM-DD"), "end_date")
                  }
                  error={errors.dateActivityValidity}
                  helperText={errors.dateActivityErrorMsg}
                />
              </div>
              <div className="detail-activity">
                <DatePickerCustom
                  title="Tanggal Mulai Registrasi"
                  value={state.register_begin_date}
                  onChange={(event) =>
                    handleForm(
                      moment(event).format("YYYY-MM-DD"),
                      "register_begin_date"
                    )
                  }
                  error={errors.dateRegistValidity}
                />
                <DatePickerCustom
                  title="Tanggal Registrasi Selesai"
                  value={state.register_end_date}
                  onChange={(event) =>
                    handleForm(
                      moment(event).format("YYYY-MM-DD"),
                      "register_end_date"
                    )
                  }
                  error={errors.dateRegistValidity}
                  helperText={errors.dateRegistErrorMsg}
                />
              </div>
              <div className="detail-activity">
                <span>
                  <Checkbox
                    color="primary"
                    onChange={(event) =>
                      handleForm(
                        event.target.checked ? "1" : "0",
                        "is_published"
                      )
                    }
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />{" "}
                  Published
                </span>
                <span>
                  <Checkbox
                    color="primary"
                    onChange={(event) =>
                      handleForm(
                        event.target.checked ? "OPENED" : "CLOSED",
                        "status"
                      )
                    }
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

KegiatanModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
}

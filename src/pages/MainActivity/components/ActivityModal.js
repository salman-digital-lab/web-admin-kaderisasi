import React, { useState, useEffect, useContext } from "react"
import {
  Button,
  Modal,
  Fade,
  Backdrop,
  Select,
  TextField,
  MenuItem,
} from "@material-ui/core"
import moment from "moment"
import DateFnsUtils from "@date-io/date-fns"
import PropTypes from "prop-types"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
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
/* eslint-disable */
export const KegiatanModal = ({ open, onClose }) => {
  const classes = styled()
  const [state, setState] = useState({
    name: "",
    begin_date: moment().format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
    register_begin_date: moment().format("YYYY-MM-DD"),
    register_end_date: moment().format("YYYY-MM-DD"),
    category_id: 1,
    minimum_role_id: 4,
  })
  const { categoryList, functions } = useContext(AdminActivityContext)
  const { getActivityCategory, addActivity } = functions
  const [errors, setErrors] = useState(initialErrors)

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
    if (categoryList.length < 1) {
      getActivityCategory()
    }
    validateDates()
  }, [state, categoryList])

  const handleForm = (value, type) => {
    setState({ ...state, [type]: value })
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
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div className="form-flex">
            <div>
              <div className="detail-activity">
                <div className="input-form">
                  Nama Kegiatan
                  <br />
                  <TextField
                    className="form-modal"
                    value={state.name}
                    onChange={(event) => handleForm(event.target.value, "name")}
                  />
                </div>
              </div>
              <div className="select-form">
                Kategori Kegiatan
                <br />
                {categoryList.length > 0 && (
                  <Select
                    className="select-input-form"
                    value={state.category_id}
                    onChange={(event) =>
                      handleForm(event.target.value, "category_id")
                    }
                  >
                    {categoryList.map((name) => (
                      <MenuItem key={name} value={name.value}>
                        {name.label}
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

KegiatanModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.bool.isRequired,
}

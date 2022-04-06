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
  FormHelperText,
  Input,
  InputLabel,
  FormControl,
} from "@material-ui/core"
import moment from "moment"
import DateFnsUtils from "@date-io/date-fns"
import PropTypes from "prop-types"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import { useForm, Controller } from "react-hook-form"
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
  helperText: PropTypes.string,
  error: PropTypes.bool.isRequired,
}

export const KegiatanModal = ({ open, onClose }) => {
  const classes = styled()
  const [state, setState] = useState({
    name: "",
    begin_date: moment().format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
    register_begin_date: moment().format("YYYY-MM-DD"),
    register_end_date: moment().format("YYYY-MM-DD"),
    category_id: "",
    minimum_role_id: "",
    is_published: "0",
    status: "CLOSED",
  })
  const { categoryList, functions } = useContext(AdminActivityContext)
  const { getActivityCategory, addActivity } = functions
  const [errors, setErrors] = useState(initialErrors)
  const stateEdit = EditorState.createEmpty()
  const [editorState, setEditorState] = useState(stateEdit)
  const { handleSubmit, control } = useForm()

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

  const onSubmit = async (data) => {
    console.log(data)
    const payload = {
      ...state,
      ...data,
    }
    await addActivity(payload)
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-flex">
              <div>
                <div className="detail-activity">
                  <div className="input-form">
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          className="form-modal"
                          // required
                          label="Nama Kegiatan"
                          fullWidth
                          placeholder="Nama Kegiatan"
                          value={value}
                          onChange={onChange}
                          error={!!error}
                          helperText={error ? error.message : null}
                        />
                      )}
                      rules={{ required: "Mohon isi Nama Kegiatan" }}
                    />
                  </div>
                </div>
                <FormControl className="select-dropdown pr-20 ml-10">
                  {categoryList?.status === "SUCCESS" && (
                    <>
                      <Controller
                        name="category_id"
                        control={control}
                        defaultValue={state.category_id}
                        render={({
                          field: { onChange, value, name },
                          fieldState: { error },
                        }) => (
                          <>
                            <InputLabel id="category-id-label">
                              -- Pilih Kategori --
                            </InputLabel>
                            <Select
                              className="select-input-form"
                              value={value ? value : ""}
                              labelId="category-id-label"
                              required
                              onChange={onChange}
                              name={name}
                              input={<Input />}
                            >
                              {categoryList?.data?.data
                                ?.filter(({ id }) => id != -1)
                                .map((category) => (
                                  <MenuItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    {category.name}
                                  </MenuItem>
                                ))}
                            </Select>
                            {/* {!!(value === -1) && (
                              <FormHelperText>This is required!</FormHelperText>
                            )} */}
                          </>
                        )}
                      />
                    </>
                  )}
                </FormControl>
                <FormControl className="select-dropdown pr-20 ml-10">
                  {categoryList?.status === "SUCCESS" && (
                    <>
                      <Controller
                        name="minimum_role_id"
                        control={control}
                        defaultValue={state.minimum_role_id}
                        render={({
                          field: { onChange, value, name },
                          fieldState: { error },
                        }) => (
                          <>
                            <InputLabel id="level-id-label">
                              -- Pilih Minimum Jenjang --
                            </InputLabel>
                            <Select
                              className="select-input-form"
                              value={value ? value : ""}
                              labelId="level-id-label"
                              required
                              onChange={onChange}
                              name={name}
                              input={<Input />}
                            >
                              <MenuItem value={4}>Jamaah</MenuItem>
                              <MenuItem value={5}>Aktivis</MenuItem>
                              <MenuItem value={6}>Kader</MenuItem>
                              <MenuItem value={7}>Kader Lanjut</MenuItem>
                            </Select>
                          </>
                        )}
                      />
                    </>
                  )}
                </FormControl>
                <div className="detail-activity">
                  <DatePickerCustom
                    title="Tanggal Mulai Kegiatan"
                    value={new Date(state.begin_date)}
                    onChange={(event) =>
                      handleForm(
                        moment(event).format("YYYY-MM-DD"),
                        "begin_date"
                      )
                    }
                    error={errors.dateActivityValidity}
                  />
                  <DatePickerCustom
                    title="Tanggal Selesai Kegiatan"
                    value={new Date(state.end_date)}
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
                    value={new Date(state.register_begin_date)}
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
                    value={new Date(state.register_end_date)}
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
                    type="submit"
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
          </form>
        </div>
      </Fade>
    </Modal>
  )
}

KegiatanModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

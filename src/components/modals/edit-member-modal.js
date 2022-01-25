import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  Modal,
  Fade,
  Backdrop,
  Button,
  TextField,
  Select,
  MenuItem,
  Input,
  TextareaAutosize,
  Chip,
} from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import moment from "moment"
import { AdminMemberContext } from "../../context/AdminMemberContext"
import { MenuProps, getStyles } from "../select"
import styled from "./styled"
/* eslint-disable */

export const DatePickerCustom = ({
  title: titleProps,
  value: valueProps,
  onChange: onChangeProps,
  helperText: helperTextProps,
  error: errorProps,
}) => (
  <div className="input-form">
    <span className="font-grey">{titleProps}</span>
    <br />
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className="form-modal"
        maxDate={new Date()}
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

const EditMemberModal = ({ open, onClose, data }) => {
  const classes = styled()
  const theme = useTheme()
  const [payload, setPayload] = useState({ ...data })
  const { id } = useParams()
  const { updateMemberResp, functions } = useContext(AdminMemberContext)
  const { updateMemberById } = functions
  const handleBirthDate = (date) => {
    setPayload({
      ...payload,
      date_of_birthday: moment(date).format("YYYY-MM-DD"),
    })
  }

  useEffect(() => {
    if (data) {
      setPayload({ ...data })
    }
  }, [data])

  const handleSubmit = () => {
    delete payload.province_name
    delete payload.district_name
    delete payload.regency_name
    delete payload.village_name
    delete payload.komprof
    delete payload.student_id
    delete payload.university
    delete payload.role_name
    updateMemberById(id, payload)
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
          {/* <div className="row flex-column align-items-center text-center">
            <img
              className="profile-image rounded-circle"
              src={data.file_image ? data.file_image : profile}
              width="160px"
              height="160px"
              alt="profile"
            />
          </div> */}
          <h3 className="mt-20">Detail Member</h3>
          <div className="row">
            <div className="col-12 col-sm-6">
              <div className="row mt-10">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <h5 className="font-grey">
                    <strong>Data Umum</strong>
                  </h5>
                  <TextField
                    className="input-register"
                    label="Nama"
                    fullWidth
                    size="small"
                    defaultValue={payload?.name}
                    onChange={(e) =>
                      setPayload({ ...payload, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <span className="font-grey">Jenjang</span>{" "}
                  <Select
                    value={payload?.role_id}
                    onChange={(e) =>
                      setPayload({ ...payload, role_id: e.target.value })
                    }
                    input={<Input />}
                    MenuProps={MenuProps}
                  >
                    {[
                      { label: "Jamaah", value: 4 },
                      { label: "Aktivis", value: 5 },
                      { label: "Kader", value: 6 },
                    ].map((jenjang) => (
                      <MenuItem
                        key={`${jenjang.value}`}
                        value={jenjang.value}
                        label={jenjang.label}
                        style={getStyles(
                          jenjang,
                          [
                            { label: "Jamaah", value: 4 },
                            { label: "Aktivis", value: 5 },
                            { label: "Kader", value: 6 },
                          ],
                          theme
                        )}
                      >
                        {jenjang.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <span className="font-grey">Jenis Kelamin</span>{" "}
                  <Select
                    value={payload?.gender}
                    onChange={(e) =>
                      setPayload({ ...payload, gender: e.target.value })
                    }
                    input={<Input />}
                    MenuProps={MenuProps}
                  >
                    {[
                      { label: "Pria", value: "M" },
                      { label: "Wanita", value: "F" },
                    ].map((gender) => (
                      <MenuItem
                        key={`${gender.value}`}
                        value={gender.value}
                        label={gender.label}
                        style={getStyles(
                          gender,
                          [
                            { label: "Pria", value: "M" },
                            { label: "Wanita", value: "F" },
                          ],
                          theme
                        )}
                      >
                        {gender.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <DatePickerCustom
                    title="Tanggal Lahir"
                    value={payload?.date_of_birthday}
                    onChange={handleBirthDate}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <TextField
                    className="input-register"
                    label="Tempat Lahir"
                    fullWidth
                    size="small"
                    defaultValue={payload?.city_of_birth}
                    onChange={(e) =>
                      setPayload({ ...payload, city_of_birth: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row mt-10">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <h5 className="font-grey">
                    <strong>Kontak</strong>
                  </h5>
                  <TextField
                    className="input-register"
                    label="Email"
                    fullWidth
                    size="small"
                    defaultValue={payload?.email}
                    onChange={(e) =>
                      setPayload({ ...payload, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <TextField
                    className="input-register"
                    label="ID Line"
                    fullWidth
                    size="small"
                    defaultValue={payload?.line_id}
                    onChange={(e) =>
                      setPayload({ ...payload, line_id: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <TextField
                    className="input-register"
                    label="Whatsapp"
                    fullWidth
                    size="small"
                    defaultValue={payload?.phone}
                    onChange={(e) =>
                      setPayload({ ...payload, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mt-10">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <h5 className="font-grey">
                    <strong>Data Perguruan Tinggi</strong>
                  </h5>
                  <span>Perguruan Tinggi</span>{" "}
                  <span className="font-grey">{payload?.university}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <TextField
                    className="input-register"
                    label="Fakultas"
                    fullWidth
                    size="small"
                    defaultValue={payload?.faculty}
                    onChange={(e) =>
                      setPayload({ ...payload, faculty: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <TextField
                    className="input-register"
                    label="Jurusan"
                    fullWidth
                    size="small"
                    defaultValue={payload?.major}
                    onChange={(e) =>
                      setPayload({ ...payload, major: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <TextField
                    className="input-register"
                    label="Angkatan"
                    fullWidth
                    size="small"
                    defaultValue={payload?.intake_year}
                    onChange={(e) =>
                      setPayload({ ...payload, intake_year: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="row mt-10">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <h5 className="font-grey">
                    <strong>Alamat</strong>
                  </h5>
                  {/* <TextField
                    className="input-register"
                    label="Provinsi"
                    fullWidth
                    size="small"
                    defaultValue={payload?.province_name}
                  /> */}
                  <span>Provinsi</span>{" "}
                  <span className="font-grey">{payload?.province_name}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  {/* <TextField
                    className="input-register"
                    label="Kota/Kabupaten"
                    fullWidth
                    size="small"
                    defaultValue={payload?.district_name}
                  /> */}
                  <span>Kota/Kabupaten</span>{" "}
                  <span className="font-grey">{payload?.district_name}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  {/* <TextField
                    className="input-register"
                    label="Kecamatan"
                    fullWidth
                    size="small"
                    defaultValue={payload?.village_name}
                  /> */}
                  <span>Kecamatan</span>{" "}
                  <span className="font-grey">{payload?.village_name}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  {/* <TextField
                    className="input-register"
                    label="Kelurahan"
                    fullWidth
                    size="small"
                    defaultValue={payload?.regency_name}
                  /> */}
                  <span>Kelurahan</span>{" "}
                  <span className="font-grey">{payload?.regency_name}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <span className="font-grey">Alamat Sekarang</span>{" "}
                  <TextareaAutosize
                    maxRows={4}
                    minRows={4}
                    placeholder="Alamat Sekarang"
                    defaultValue={payload?.current_address}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        current_address: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <span className="font-grey">Alamat Sesuai KTP</span>{" "}
                  <TextareaAutosize
                    maxRows={4}
                    minRows={4}
                    placeholder="Alamat Sesuai KTP"
                    defaultValue={payload?.from_address}
                    onChange={(e) =>
                      setPayload({ ...payload, from_address: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mt-10">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <h5 className="font-grey">
                    <strong>Keanggotaan</strong>
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <span>Ikut Serta Kegiatan</span>{" "}
                  <div className="row">
                    <div className="col-4 d-flex flex-column py-5 px-15">
                      <TextField
                        className="input-register"
                        label="SSC"
                        fullWidth
                        size="small"
                        defaultValue={payload?.ssc}
                        onChange={(e) =>
                          setPayload({ ...payload, ssc: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-4 d-flex flex-column py-5 px-15">
                      <TextField
                        className="input-register"
                        label="LMD"
                        fullWidth
                        size="small"
                        defaultValue={payload?.lmd}
                        onChange={(e) =>
                          setPayload({ ...payload, lmd: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-4 d-flex flex-column py-5 px-15">
                      <TextField
                        className="input-register"
                        label="SPC"
                        fullWidth
                        size="small"
                        defaultValue={payload?.spectra}
                        onChange={(e) =>
                          setPayload({ ...payload, spectra: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
            >
              Simpan
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default EditMemberModal

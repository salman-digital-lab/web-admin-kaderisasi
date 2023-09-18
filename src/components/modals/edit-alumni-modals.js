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
} from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import moment from "moment"
import { AdminMemberContext } from "../../context/AdminMemberContext"
import { AdminRegionContext } from "../../context/AdminRegionContext"
import { MenuProps, getStyles } from "../select"
import {
  SelectUniversity,
  SelectProvince,
  SelectRegency,
  SelectDistrict,
  SelectVillage,
} from "../selector"
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

const EditAlumniModal = ({ open, onClose, data }) => {
  const classes = styled()
  const theme = useTheme()
  const [payload, setPayload] = useState({ ...data })
  const { id } = useParams()
  const { functions, memberRoles } = useContext(AdminMemberContext)
  const { updateMemberById, getAllMemberRoles } = functions

  const { functions: regionFunctions } = useContext(AdminRegionContext)
  const { getRegencies, getDistricts, getVillages } = regionFunctions

  const handleBirthDate = (date) => {
    setPayload({
      ...payload,
      date_of_birthday: moment(date).format("YYYY-MM-DD"),
    })
  }

  const handleUniversity = (university_id) => {
    setPayload({
      ...payload,
      university_id,
    })
  }

  const handleProvince = (province_id) => {
    setPayload({
      ...payload,
      province_id,
      regency_name: "",
      district_name: "",
      village_name: "",
    })
    getRegencies(province_id)
  }

  const handleRegency = (value) => {
    console.log(value)
    setPayload({
      ...payload,
      regency_id: value?.id,
      regency_name: value?.name,
      district_name: "",
      village_name: "",
    })
    getDistricts(value?.id)
  }

  const handleDistrict = (value) => {
    setPayload({
      ...payload,
      district_id: value?.id,
      district_name: value?.name,
      village_name: "",
    })
    getVillages(value?.id)
  }

  const handleVillage = (value) => {
    setPayload({
      ...payload,
      village_id: value?.id,
      village_name: value?.name,
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
    delete payload.file_image
    if (!payload.university_id) {
      delete payload.university_id
    }
    updateMemberById(id, payload)
    onClose()
  }

  useEffect(() => {
    getAllMemberRoles()
  }, [])

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
                    {memberRoles.map((jenjang) => (
                      <MenuItem
                        key={jenjang.id}
                        value={jenjang.id}
                        label={jenjang.name}
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
                        {jenjang.name}
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
                    type="email"
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
                  <SelectUniversity
                    data={{
                      id: payload?.university_id,
                      name: payload?.university,
                    }}
                    handleSelect={handleUniversity}
                  />
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
                  <SelectProvince
                    data={{
                      id: payload?.province_id,
                      name: payload?.province_name,
                    }}
                    handleSelect={handleProvince}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <SelectRegency
                    provinceId={payload?.province_id}
                    data={{
                      id: payload?.regency_id,
                      name: payload?.regency_name,
                    }}
                    handleSelect={handleRegency}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <SelectDistrict
                    regencyId={payload?.regency_id}
                    data={{
                      id: payload?.district_id,
                      name: payload?.district_name,
                    }}
                    handleSelect={handleDistrict}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <SelectVillage
                    districtId={payload?.district_id}
                    data={{
                      id: payload?.village_id,
                      name: payload?.village_name,
                    }}
                    handleSelect={handleVillage}
                  />
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

export default EditAlumniModal

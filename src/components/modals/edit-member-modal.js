import React, { useState, useContext, useEffect } from "react"
import { Modal, Fade, Backdrop, Button, TextField } from "@material-ui/core"
import moment from "moment"
import { AdminMemberContext } from "../../context/AdminMemberContext"
import styled from "./styled"
/* eslint-disable */

const EditMemberModal = ({ open, onClose, data }) => {
  const classes = styled()

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
          <div className="row flex-column align-items-center text-center">
            {/* <img
              className="profile-image rounded-circle"
              src={data.file_image ? data.file_image : profile}
              width="160px"
              height="160px"
              alt="profile"
            /> */}
            <h5 className="mt-20">
              <strong>{data.name}</strong>
            </h5>
            <span className="font-grey">{data.role_name}</span>
            <span className="font-grey mt-10">{data.university}</span>
            <span className="font-grey">
              {data.gender === "M" ? "Laki-laki" : "Perempuan"}
            </span>
            <span className="font-grey">
              {data.city_of_birth},{" "}
              {moment(data.date_of_birthday).format("D MMMM YYYY")}
            </span>
          </div>
          <h3 className="mt-20">Detail Member</h3>
          <div className="row">
            <div className="col-12 col-sm-6">
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
                    defaultValue={data?.email}
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
                    defaultValue={data?.line_id}
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
                    defaultValue={data?.phone}
                  />
                </div>
              </div>

              <div className="row mt-10">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <h5 className="font-grey">
                    <strong>Data Perguruan Tinggi</strong>
                  </h5>
                  <span>Perguruan Tinggi</span>{" "}
                  <span className="font-grey">{data?.university}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <TextField
                    className="input-register"
                    label="Fakultas"
                    fullWidth
                    size="small"
                    defaultValue={data?.faculty}
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
                    defaultValue={data?.major}
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
                    defaultValue={data?.intake_year}
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
                  <TextField
                    className="input-register"
                    label="Alamat Sekarang"
                    fullWidth
                    size="small"
                    defaultValue={data?.current_address}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <TextField
                    className="input-register"
                    label="Alamat Sesuai KTP"
                    fullWidth
                    size="small"
                    defaultValue={data?.from_address}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <TextField
                    className="input-register"
                    label="Kelurahan"
                    fullWidth
                    size="small"
                    defaultValue={data?.regency_name}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <TextField
                    className="input-register"
                    label="Kecamatan"
                    fullWidth
                    size="small"
                    defaultValue={data?.village_name}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <TextField
                    className="input-register"
                    label="Kota/Kabupaten"
                    fullWidth
                    size="small"
                    defaultValue={data?.district_name}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <TextField
                    className="input-register"
                    label="Provinsi"
                    fullWidth
                    size="small"
                    defaultValue={data?.province_name}
                  />
                </div>
              </div>

              <div className="row mt-10">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <h5 className="font-grey">
                    <strong>Keanggotaan</strong>
                  </h5>
                  <span>Tahun Mendaftar</span>{" "}
                  <span className="font-grey">{data?.intake_year}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex flex-column py-5 px-15">
                  <span>Ikut Serta Kegiatan</span>{" "}
                  <span>
                    {data.ssc ? (
                      <Chip label={`SSC~${data.ssc}`} size="small" />
                    ) : (
                      ""
                    )}
                    {data.lmd ? (
                      <Chip label={`LMD~${data.lmd}`} size="small" />
                    ) : (
                      ""
                    )}
                    {data.spectra ? (
                      <Chip label={`SPC~${data.spectra}`} size="small" />
                    ) : (
                      ""
                    )}
                  </span>
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
              // onClick={handleSubmit}
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

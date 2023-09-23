import React, { useContext, useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowBack, Delete } from "@material-ui/icons"
import { Button, Chip } from "@material-ui/core"
import LoadingAnimation from "../../../components/loading-animation"
import AlertToast from "../../../components/alert"
import profile from "../../../assets/images/profile.png"
import { AdminAlumniContext } from "../../../context/AdminAlumniContext"
import { ConfirmationModal } from "../../ChatRoomDetail/components/confirmation-modal"
import AlumniModal from "../../../components/modals/alumni-modals"

const AlumniDetail = () => {
  const { id } = useParams()
  const [status, setStatus] = useState(true)
  const { alumniForm, updateAlumniResp, setUpdateAlumniResp, functions } =
    useContext(AdminAlumniContext)
  const { getAlumniDetail, deleteAlumniById } = functions
  const [open, setOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)

  console.log("alumni", alumniForm)

  let data = {}
  if (alumniForm?.id) {
    data = alumniForm
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const alumniDelete = () => {
    console.log("id alumni", id)
    deleteAlumniById(id)
    setConfirm(false)
  }

  useEffect(() => {
    if (updateAlumniResp?.status === "SUCCESS") {
      setTimeout(() => {
        setUpdateAlumniResp({})
      }, 3000)
    }
  }, [updateAlumniResp])

  useEffect(() => {
    if (status) {
      getAlumniDetail(id)
      setStatus(false)
    }
  }, [alumniForm, status])

  return alumniForm?.id ? (
    <>
      <div className="button-area">
        <div className="button-left">
          <Button size="small" className="back-button" variant="outlined">
            <Link to="/alumni">
              <ArrowBack fontSize="inherit" />
              KEMBALI
            </Link>
          </Button>
        </div>
        <div className="button-right">
          <Button
            className="edit-button"
            variant="contained"
            color="primary"
            size="small"
            onClick={handleOpen}
          >
            Edit
          </Button>
          <Button
            size="small"
            className="delete-button"
            variant="contained"
            color="secondary"
            onClick={() => setConfirm(true)}
          >
            <Delete fontSize="small" />
            Hapus
          </Button>
        </div>
      </div>
      <div className="row flex-column align-items-center text-center">
        <img
          className="profile-image rounded-circle"
          src={profile}
          width="160px"
          height="160px"
          alt="profile"
        />
        <h5 className="mt-20">
          <strong>{data.name}</strong>
        </h5>
        <span className="font-grey mt-10">{data.occupation}</span>
        <span className="font-grey mt-10">{data.current_instance}</span>
      </div>
      <h3 className="mt-20">Detail Alumni</h3>
      <div className="row">
        <div className="col-12 col-sm-6">
          <div className="row mt-10">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <h5 className="font-grey">
                <strong>Kontak</strong>
              </h5>
              <span>Email</span>{" "}
              <span className="font-grey">{data?.email}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <span>Whatsapp</span>{" "}
              <span className="font-grey">{data?.whatsapp_number}</span>
            </div>
          </div>

          <div className="row mt-10">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <h5 className="font-grey">
                <strong>Informasi Tambahan</strong>
              </h5>
              <span>Lama Bekerja</span>{" "}
              <span className="font-grey">{data?.notes}</span>
            </div>
          </div>

          <div className="row mt-10">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <h5 className="font-grey">
                <strong>Data Riwayat Pendidikan</strong>
              </h5>
              <span>Riwayat Pendidikan S1</span>{" "}
              <span className="font-grey">{data?.bachelor_degree}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <span>Riwayat Pendidikan S2</span>{" "}
              <span className="font-grey">{data?.master_degree}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <span>Riwayat Pendidikan S3</span>{" "}
              <span className="font-grey">{data?.doctoral_degree}</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6">
          <div className="row mt-10">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <h5 className="font-grey">
                <strong>Alamat</strong>
              </h5>
              <span>Alamat Sekarang</span>{" "}
              <span className="font-grey">{data?.full_address}</span>
            </div>
          </div>

          <div className="row mt-10">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <h5 className="font-grey">
                <strong>Kontribusi</strong>
              </h5>
              {data?.contributions !== null && (
                <div>
                  {data?.contributions?.map((data) => (
                    <li>
                      <span className="font-grey">{data}</span>
                    </li>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <span>Bersedia Mengikuti Program Sedekah</span>{" "}
              {data.is_donor === 1 ? "Ya" : "Tidak"}
            </div>
            <div className="col-12 d-flex flex-column py-5 px-15">
              <span>Subscriber</span>
              {data.is_subscriber === 1 ? "Ya" : "Tidak"}
            </div>
          </div>
        </div>
      </div>
      <AlumniModal open={open} onClose={handleClose} data={alumniForm} />
      <AlertToast
        isOpen={updateAlumniResp?.status === "SUCCESS"}
        status="success"
        message="Data alumni berhasil dirubah."
        onClose={() => setUpdateAlumniResp({})}
      />
      <ConfirmationModal
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Hapus Data Alumni?"
        onSubmit={() => alumniDelete()}
      />
    </>
  ) : (
    <div className="loading-table">
      <LoadingAnimation facebook />
    </div>
  )
}

export default AlumniDetail

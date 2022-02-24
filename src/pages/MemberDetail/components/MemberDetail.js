import React, { useContext, useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Block, ArrowBack, Close } from "@material-ui/icons"
import { Button, Collapse, IconButton, Chip } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import moment from "moment"
import LoadingAnimation from "../../../components/loading-animation"
import EditMemberModal from "../../../components/modals/edit-member-modal"
import AlertToast from "../../../components/alert"
import { AdminMemberContext } from "../../../context/AdminMemberContext"
import { ConfirmationModal } from "./confirmation-modal"
import profile from "../../../assets/images/profile.png"

const MemberDetail = () => {
  const { id } = useParams()
  const [status, setStatus] = useState(true)
  const {
    memberForm,
    blockMemberResp,
    updateMemberResp,
    setUpdateMemberResp,
    functions,
  } = useContext(AdminMemberContext)
  const [successBlockMember, setSuccessBlockMember] = useState(false)
  const [failedBlockMember, setFailedBlockMember] = useState(false)
  const [blockMember, setBlockMember] = useState(false)
  const [loading, setLoading] = useState(false)
  const { getMemberDetail, blockMemberById, unblockMemberById } = functions
  const [open, setOpen] = useState(false)

  let data = {}
  if (memberForm?.member?.id) {
    data = memberForm.member
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleBlockMember = () => {
    setLoading(true)
    blockMemberById(id)
    setBlockMember(false)
  }

  const handleUnblockMember = () => {
    setLoading(true)
    unblockMemberById(id)
    setBlockMember(false)
  }

  const handleCloseBlock = () => {
    setBlockMember(false)
  }

  useEffect(() => {
    if (updateMemberResp?.status === "SUCCESS") {
      setTimeout(() => {
        setUpdateMemberResp({})
      }, 3000)
    }
  }, [updateMemberResp])

  useEffect(() => {
    if (status) {
      getMemberDetail(id)
      setStatus(false)
    }
    if (blockMemberResp.status === "SUCCESS") {
      setSuccessBlockMember(true)
      setTimeout(() => {
        setSuccessBlockMember(false)
      }, 3000)
      setLoading(false)
    } else if (blockMemberResp.status === "FAILED") {
      setFailedBlockMember(true)
      setTimeout(() => {
        setFailedBlockMember(false)
      }, 3000)
      setLoading(false)
    }
  }, [blockMemberResp, memberForm, status])

  return memberForm?.member?.id ? (
    <>
      <Collapse in={successBlockMember}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccessBlockMember(false)
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          {blockMemberResp.message}
        </Alert>
      </Collapse>
      <Collapse in={failedBlockMember}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setFailedBlockMember(false)
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          {blockMemberResp.message}
        </Alert>
      </Collapse>
      <div className="button-area">
        <div className="button-left">
          <Button size="small" className="back-button" variant="outlined">
            <Link to="/member">
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
          {data.is_active ? (
            <Button
              color="secondary"
              size="small"
              className="delete-button"
              variant="contained"
              onClick={() => setBlockMember(true)}
              disabled={loading}
            >
              <Block fontSize="small" /> BLOKIR
            </Button>
          ) : (
            <Button
              color="primary"
              size="small"
              className="delete-button"
              variant="contained"
              onClick={() => setBlockMember(true)}
              disabled={loading}
            >
              AKTIFKAN
            </Button>
          )}
        </div>
      </div>
      <div className="row flex-column align-items-center text-center">
        <img
          className="profile-image rounded-circle"
          src={data.file_image ? data.file_image : profile}
          width="160px"
          height="160px"
          alt="profile"
        />
        <h5 className="mt-20">
          <strong>{data.name}</strong>
        </h5>
        <span className="font-grey">{data.role_name}</span>
        <span className="font-grey mt-10">{data.university}</span>
        <span className="font-grey">
          {data.gender === "M" ? "Laki-laki" : "Wanita"}
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
              <span>Email</span>{" "}
              <span className="font-grey">{data?.email}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <span>ID Line</span>{" "}
              <span className="font-grey">{data?.line_id}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <span>Whatsapp</span>{" "}
              <span className="font-grey">{data?.phone}</span>
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
              <span>Fakultas</span>{" "}
              <span className="font-grey">{data?.faculty}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <span>Jurusan</span>{" "}
              <span className="font-grey">{data?.major}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <span>Angkatan</span>{" "}
              <span className="font-grey">{data?.intake_year}</span>
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
              <span className="font-grey">{data?.current_address}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <span>Alamat Sesuai KTP</span>{" "}
              <span className="font-grey">{data?.from_address}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <span>Kelurahan</span>{" "}
              <span className="font-grey">{data?.village_name}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <span>Kecamatan</span>{" "}
              <span className="font-grey">{data?.district_name}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <span>Kota/Kabupaten</span>{" "}
              <span className="font-grey">{data?.regency_name}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex flex-column py-5 px-15">
              <span>Provinsi</span>{" "}
              <span className="font-grey">{data?.province_name}</span>
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
                {data.komprof && data.komprof.length > 0 ? (
                  <>
                    <span className="font-grey">Komprof :</span>
                    <ol className="font-grey">
                      {data.komprof.map((x) => (
                        <li className="font-grey">{x}</li>
                      ))}
                    </ol>
                  </>
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <EditMemberModal
        open={open}
        onClose={handleClose}
        data={memberForm?.member}
      />
      <AlertToast
        isOpen={updateMemberResp?.status === "SUCCESS"}
        status="success"
        message="Data member berhasil dirubah."
        onClose={() => setUpdateMemberResp({})}
      />
      <ConfirmationModal
        open={blockMember}
        onClose={handleCloseBlock}
        title={
          data.is_active
            ? `Block ${data.name} sebagai member?`
            : `Aktifkan ${data.name} sebagai member?`
        }
        onSubmit={
          data.is_active
            ? () => handleBlockMember()
            : () => handleUnblockMember()
        }
      />
    </>
  ) : (
    <div className="loading-table">
      <LoadingAnimation facebook />
    </div>
  )
}

export default MemberDetail

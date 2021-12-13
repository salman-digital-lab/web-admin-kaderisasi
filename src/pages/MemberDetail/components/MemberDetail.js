import React, { useContext, useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Block, ArrowBack, Close } from "@material-ui/icons"
import { Button, Collapse, IconButton } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import LoadingAnimation from "../../../components/loading-animation"
import { AdminMemberContext } from "../../../context/AdminMemberContext"
import { ConfirmationModal } from "./confirmation-modal"
import profile from "../profile.png"

const MemberDetail = () => {
  const { id } = useParams()
  const [status, setStatus] = useState(true)
  const { memberForm, blockMemberResp, functions } =
    useContext(AdminMemberContext)
  const [successBlockMember, setSuccessBlockMember] = useState(false)
  const [failedBlockMember, setFailedBlockMember] = useState(false)
  const [blockMember, setBlockMember] = useState(false)
  const [loading, setLoading] = useState(false)
  const { getMemberDetail, blockMemberById } = functions

  let data = {}
  if (memberForm?.member?.length > 0) {
    ;[data] = memberForm.member
  }

  const handleBlockMember = () => {
    setLoading(true)
    blockMemberById(id)
    setStatus(true)
    setBlockMember(false)
  }

  const handleCloseBlock = () => {
    setBlockMember(false)
  }

  useEffect(() => {
    if (status) {
      getMemberDetail(id)
      setStatus(false)
    }
    if (blockMemberResp.status === "SUCCESS") {
      setSuccessBlockMember(true)
      setLoading(false)
    }
  }, [blockMemberResp, memberForm, status])

  return memberForm?.member?.length > 0 ? (
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
          Close me!
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
          Close me!
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
            color="secondary"
            size="small"
            className="edit-button"
            variant="contained"
          >
            SUNTING
          </Button>
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
        </div>
      </div>
      <div className="head-aktivis">
        <div className="head-left">
          <img
            className="profile-image"
            src={data.file_image ? data.file_image : profile}
            width="160px"
            height="160px"
            alt="profile"
          />
        </div>
        <div className="head-right">
          <div className="head-aktivis-data">
            <div className="input-group-title-head">Nama Jamaah</div>
            <div className="input-group-text-head">
              <span>{data.name}</span>
            </div>
          </div>
          <div className="head-aktivis-data">
            <div className="input-group-title-head">Jenis Kelamin</div>
            <div className="input-group-text-head">
              <span>{data.gender}</span>
            </div>
          </div>
          <div className="head-aktivis-data">
            <div className="input-group-title-head">Tempat, Tanggal Lahir</div>
            <div className="input-group-text-head">
              <span>
                {data.city_of_birth},{" "}
                {new Date(data.date_of_birthday).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="head-aktivis-data">
            <div className="input-group-title-head">Phone/Whatsapp</div>
            <div className="input-group-text-head">
              <span>{data.phone}</span>
            </div>
          </div>
        </div>
      </div>
      <br />
      <h3>Detail Member</h3>
      <div className="body-aktivis">
        <div className="body-aktivis-data">
          <div className="input-group-title-body">Email</div>
          <div className="input-group-text-body">
            <span>{data.email}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body">ID Line</div>
          <div className="input-group-text-body">
            <span>{data.line_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body">Perguruan Tinggi/Univ</div>
          <div className="input-group-text-body">
            <span>{data.university}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body">Fakultas</div>
          <div className="input-group-text-body">
            <span>{data.faculty}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body">Jurusan</div>
          <div className="input-group-text-body">
            <span>{data.major}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body">NIM</div>
          <div className="input-group-text-body">
            <span>{data.student_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body">Angkatan</div>
          <div className="input-group-text-body">
            <span>{data.intake_year}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body">Jenjang</div>
          <div className="input-group-text-body">
            <span>{data.role_name}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body">Ikut Serta Kegiatan</div>
          <div className="input-group-text-body">
            <span>{data.kegiatan}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body">Alamat Sesuai KTP</div>
          <div className="input-group-text-body">
            <span>{data.from_address}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body">Alamat Sekarang</div>
          <div className="input-group-text-body">
            <span>{data.current_address}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body">Provinsi</div>
          <div className="input-group-text-body">
            <span>{data.province_name}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body">Kota/Kabupaten</div>
          <div className="input-group-text-body">
            <span>{data.district_name}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body">Kecamatan</div>
          <div className="input-group-text-body">
            <span>{data.village_name}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body">Kelurahan</div>
          <div className="input-group-text-body">
            <span>{data.regency_name}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body">Tanggal Mendaftar</div>
          <div className="input-group-text-body">
            <span>{data.intake_year}</span>
          </div>
        </div>
      </div>
      <br />
      <ConfirmationModal
        open={blockMember}
        onClose={handleCloseBlock}
        title={`Block ${data.name} sebagai member?`}
        onSubmit={() => handleBlockMember()}
      />
    </>
  ) : (
    <div className="loading-table">
      <LoadingAnimation facebook />
    </div>
  )
}

export default MemberDetail

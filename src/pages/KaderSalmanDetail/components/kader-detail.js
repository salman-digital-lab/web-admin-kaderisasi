import React, { useContext, useState, useEffect } from "react";
import profile from "../profile.png";
import { useParams } from "react-router-dom";
import LoadingAnimation from "../../../components/loading-animation";
import { AdminActivityContext } from "../../../context/AdminActivityContext";
import { Link } from "react-router-dom";
import { Block, ArrowBack, Close } from "@material-ui/icons";
import { Button, Collapse, IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const KaderDetail = () => {
  const { id } = useParams();
  const [status, setStatus] = useState(true);
  const { memberForm, blockMemberResp, functions } =
    useContext(AdminActivityContext);
  const [successBlockMember, setSuccessBlockMember] = useState(false);
  const [failedBlockMember, setFailedBlockMember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getMemberDetail, blockMemberById } = functions;

  let data = {};
  if (memberForm?.member?.length > 0) {
    data = memberForm.member[0];
  }

  const handleBlockMember = (id) => {
    setLoading(true);
    blockMemberById(id);
    setStatus(true);
  };

  useEffect(() => {
    if (status) {
      getMemberDetail(id);
      setStatus(false);
    }
    if (blockMemberResp.status === "SUCCESS") {
      setSuccessBlockMember(true);
      setLoading(false);
    }
  }, [blockMemberResp, memberForm, status]);

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
                setSuccessBlockMember(false);
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
                setFailedBlockMember(false);
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
            <Link to={"/aktivis"}>
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
            onClick={() => handleBlockMember(id)}
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
          ></img>
        </div>
        <div className="head-right">
          <div className="head-aktivis-data">
            <div className="input-group-title-head" id="basic-addon1">
              Nama Jamaah
            </div>
            <div className="input-group-text-head" id="basic-addon1">
              <span className="editable">{data.name}</span>
            </div>
          </div>
          <div className="head-aktivis-data">
            <div className="input-group-title-head" id="basic-addon1">
              Jenis Kelamin
            </div>
            <div className="input-group-text-head" id="basic-addon1">
              <span className="editable">{data.gender}</span>
            </div>
          </div>
          <div className="head-aktivis-data">
            <div className="input-group-title-head" id="basic-addon1">
              Tempat, Tanggal Lahir
            </div>
            <div className="input-group-text-head" id="basic-addon1">
              <span className="editable">
                {data.city_of_birth},{" "}
                {new Date(data.date_of_birthday).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="head-aktivis-data">
            <div className="input-group-title-head" id="basic-addon1">
              Phone/Whatsapp
            </div>
            <div className="input-group-text-head" id="basic-addon1">
              <span className="editable">{data.phone}</span>
            </div>
          </div>
        </div>
      </div>
      <br />
      <h3>Detail Aktivis</h3>
      <div className="body-aktivis">
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Email
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.email}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            ID Line
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.line_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Perguruan Tinggi/Univ
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.university}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Fakultas
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.faculty}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Jurusan
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.major}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            NIM
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.student_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Angkatan
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.intake_year}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Jenjang
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.role_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Ikut Serta Kegiatan
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.kegiatan}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Alamat Sesuai KTP
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.from_address}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Alamat Sekarang
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.current_address}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Provinsi
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.province_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Kota/Kabupaten
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.district_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Kecamatan
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.village_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Kelurahan
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.regency_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Tanggal Mendaftar
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data.intake_year}</span>
          </div>
        </div>
      </div>
      <br />
    </>
  ) : (
    <div className="loading-table">
      <LoadingAnimation facebook />
    </div>
  );
};

export default KaderDetail;

import React, { useContext, useState } from "react";
import data from "../data.json";
import profile from "../images.jpg";
import { useParams } from "react-router-dom";
import LoadingAnimation from "../../../components/loading-animation";
import { AdminActivityContext } from "../../../context/AdminActivityContext";

const KaderDetail = () => {
  const {id} = useParams();
  const [status, setStatus] = useState(true);
  const { memberForm, functions } =
    useContext(AdminActivityContext);
  const { getMemberDetail } = functions;

  if (memberForm.length < 1 && status) {
    getMemberDetail(id);
    setStatus(false);
  }
  
  return (
    memberForm?.member?.length > 0 ? (
      <>
      <div className="head-aktivis">
        <div className="head-left">
          <img
            className="profile-image"
            src={profile}
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
              <span className="editable">{memberForm?.member[0].name}</span>
            </div>
          </div>
          <div className="head-aktivis-data">
            <div className="input-group-title-head" id="basic-addon1">
              Jenis Kelamin
            </div>
            <div className="input-group-text-head" id="basic-addon1">
              <span className="editable">{memberForm?.member[0].gender}</span>
            </div>
          </div>
          <div className="head-aktivis-data">
            <div className="input-group-title-head" id="basic-addon1">
              Tempat, Tanggal Lahir
            </div>
            <div className="input-group-text-head" id="basic-addon1">
              <span className="editable">{memberForm?.member[0].city_of_birth}, {new Date(memberForm?.member[0].date_of_birthday).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="head-aktivis-data">
            <div className="input-group-title-head" id="basic-addon1">
              Phone/Whatsapp
            </div>
            <div className="input-group-text-head" id="basic-addon1">
              <span className="editable">{memberForm?.member[0].phone}</span>
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
            <span className="editable">{memberForm?.member[0].email}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            ID Line
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{memberForm?.member[0].line_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Perguruan Tinggi/Univ
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{memberForm?.member[0].university}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Fakultas
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{memberForm?.member[0].faculty}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Jurusan
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{memberForm?.member[0].major}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            NIM
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{memberForm?.member[0].student_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Angkatan
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{memberForm?.member[0].intake_year}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Jenjang
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{memberForm?.member[0].role_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Ikut Serta Kegiatan
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{memberForm?.member[0].kegiatan}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Alamat Sesuai KTP
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{memberForm?.member[0].from_address}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Alamat Sekarang
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{memberForm?.member[0].current_address}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Provinsi
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{memberForm?.member[0].province_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Kota/Kabupaten
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{memberForm?.member[0].district_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Kecamatan
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{memberForm?.member[0].village_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Kelurahan
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{memberForm?.member[0].regency_id}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Tanggal Mendaftar
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{memberForm?.member[0].intake_year}</span>
          </div>
        </div>
      </div>
      <br />
    </>
    ) : (
      <div className="loading-table">
        <LoadingAnimation facebook/>
      </div>
    )
  );
};

export default KaderDetail;

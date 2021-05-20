import React from "react";
import data from "../data.json";
import profile from "../images.jpg";

const KaderDetail = () => {
  return (
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
              <span className="editable">{data[0].name}</span>
            </div>
          </div>
          <div className="head-aktivis-data">
            <div className="input-group-title-head" id="basic-addon1">
              Jenis Kelamin
            </div>
            <div className="input-group-text-head" id="basic-addon1">
              <span className="editable">{data[0].jenkel}</span>
            </div>
          </div>
          <div className="head-aktivis-data">
            <div className="input-group-title-head" id="basic-addon1">
              Tanggal Lahir
            </div>
            <div className="input-group-text-head" id="basic-addon1">
              <span className="editable">{data[0].tanggal_lahir}</span>
            </div>
          </div>
          <div className="head-aktivis-data">
            <div className="input-group-title-head" id="basic-addon1">
              Phone/Whatsapp
            </div>
            <div className="input-group-text-head" id="basic-addon1">
              <span className="editable">{data[0].phone}</span>
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
            <span className="editable">{data[0].email}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            ID Line
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].line}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Perguruan Tinggi/Univ
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].univ}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Fakultas
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].fakultas}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Jurusan
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].jurusan}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            NIM
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].nim}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Angkatan
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].angkatan}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Pendidikan Terakhir
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].pend_terakhir}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Jenjang
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].jenjang}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Ikut Serta Kegiatan
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].kegiatan}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Alamat Sesuai KTP
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].alamat_ktp}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Alamat Sekarang
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].alamat}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Provinsi
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].provinsi}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Kota/Kabupaten
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].kota}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Kecamatan
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].kecamatan}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Kelurahan
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].kelurahan}</span>
          </div>
        </div>
        <div className="body-aktivis-data">
          <div className="input-group-title-body" id="basic-addon1">
            Tanggal Mendaftar
          </div>
          <div className="input-group-text-body" id="basic-addon1">
            <span className="editable">{data[0].tanggal_mendaftar}</span>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default KaderDetail;

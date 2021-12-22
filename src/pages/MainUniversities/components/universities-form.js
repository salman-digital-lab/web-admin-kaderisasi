import React, { useContext, useEffect, useState } from "react"
import { Button, TextField } from "@material-ui/core"
import axios from "axios"
import { useParams } from "react-router-dom"
import logo from "../../../assets/images/logo-header.png"
import "../../../assets/scss/MainUniversities.scss"
import {
  UniversitasContext,
  UniversitasProvider,
} from "../../../context/AdminUniversitasContext"
import AlertToast from "../../../components/alert"

/* eslint-disable */

const CardFormUniversities = () => {
  const formRef = React.useRef()
  const { rows, setRows, openAlert, setOpenAlert } =
    useContext(UniversitasContext)
  const { id } = useParams()
  const [idRef] = useState(id)

  const [NameState, setNameState] = useState({
    name: "",
  })

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/universities`)
      .then((res) => {
        const { data } = res.data
        data.forEach((e) => {
          if (Number(e.id) === Number(idRef)) {
            setNameState({
              name: e.name,
            })
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [rows, setRows])

  const handleChange = (event) => {
    const inputan = event.target.value
    setNameState({
      ...NameState,
      name: inputan,
    })
  }

  const handleAdd = (event) => {
    event.preventDefault()
    formRef.current.reportValidity()

    const { name } = NameState

    if (idRef === undefined) {
      axios
        .post(
          process.env.REACT_APP_BASE_URL + `/v1/universities`,
          { name }
        )
        .then(() => {
          setOpenAlert(true)
          setTimeout(() => {
            window.location.href = '/universites'
          }, 4000)
        })
    } else if (idRef !== undefined) {
      axios
        .put(
          process.env.REACT_APP_BASE_URL + `/v1/universities/${id}`,
          { name }
        )
        .then(() => {
          setOpenAlert(true)
          setTimeout(() => {
            window.location.href = '/universites'
          }, 4000)
        })
    }
  }
  return (
    <div className="card-register-universitas">
      <img src={logo} alt="logo" className="logo-universitas" />
      <form
        ref={formRef}
        className="form-register-universitas"
        noValidate
        autoComplete="off"
      >
        <TextField
          value={NameState.name}
          onChange={handleChange}
          className="input-register"
          required
          label="Nama Universitas"
          fullWidth
          placeholder="Nama Universitas"
        />
        <Button
          variant="contained"
          className="btn-register primary-button"
          onClick={handleAdd}
        >
          {id ? "Rubah" : "Tambah"} Universitas
        </Button>
      </form>
      <AlertToast
        isOpen={openAlert}
        status="success"
        message={`Universitas berhasil di ${id ? "rubah." : "tambah."}`}
        onClose={() => {
          setOpenAlert(false)
          window.location.href = '/universites'
        }}
      />
    </div>
  )
}

const Formuniversitas = () => {
  return (
    <UniversitasProvider>
      <div className="container-register-universitas">
        <div className="content-register-universitas">
          <CardFormUniversities />
        </div>
      </div>
    </UniversitasProvider>
  )
}

export default Formuniversitas

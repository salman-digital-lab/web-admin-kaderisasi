import React, { useContext, useEffect, useState } from "react"
import { Button, TextField } from "@material-ui/core"
import axios from "axios"
import { useHistory, useParams } from "react-router"
import logo from "../../../assets/images/logo-header.png"
import "../../../assets/scss/MainUniversities.scss"
import {
  UniversitasContext,
  UniversitasProvider,
} from "../../../context/AdminUniversitasContext"
import AlertToast from "../../../components/Alert"

/* eslint-disable */

const CardFormUniversities = () => {
  const formRef = React.useRef()
  const history = useHistory()
  const { rows, setRows, openAlert, setOpenAlert } =
    useContext(UniversitasContext)
  const { id } = useParams()
  const [idRef] = useState(id)

  const [NameState, setNameState] = useState({
    name: "",
  })

  useEffect(() => {
    axios
      .get(`https://admin-api-kaderisasi-dev.salmanitb.com/v1/universities`)
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
          `https://admin-api-kaderisasi-dev.salmanitb.com/v1/universities`,
          { name }
        )
        .then(() => {
          setOpenAlert(true)
          setTimeout(() => {
            history.push("/universities")
          }, 4000)
        })
    } else if (idRef !== undefined) {
      axios
        .put(
          `https://admin-api-kaderisasi-dev.salmanitb.com/v1/universities/${id}`,
          { name }
        )
        .then(() => {
          setOpenAlert(true)
          setTimeout(() => {
            history.push("/universities")
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
          color="primary"
          className="btn-register"
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
          history.push("/universities")
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

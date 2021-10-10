import { Button, TextField } from "@material-ui/core"
import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import logo from "../../../assets/images/logo-header.png"
import "../../../assets/scss/MainUniversities.scss"
import {
  UniversitasContext,
  UniversitasProvider,
} from "../../../context/AdminUniversitasContext"
/* eslint-disable */
// const text = (
//   <p className="helpertext">Password yang digunakan minimal 6 digit</p>
// )

// function createData(id, universitas) {
//   return { id, universitas }
// }

const CardFormUniversities = () => {
  const formRef = React.useRef()
  const history = useHistory()
  const { id } = useParams()
  const [idRef] = useState(id)

  const { rows, setRows } = useContext(UniversitasContext)

  const [NameState, setNameState] = useState({
    name: "",
  })

  useEffect(() => {
    axios
      .get(`https://admin-api-kaderisasi-dev.salmanitb.com/v1/universities`)
      .then((res) => {
        const data = res.data.data
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

    const name = NameState.name

    if (idRef === undefined) {
      axios
        .post(
          `https://admin-api-kaderisasi-dev.salmanitb.com/v1/universities`,
          { name }
        )
        .then(() => {
          setNameState({
            name: "",
          })

          history.push("/university")
        })
    } else if (idRef !== undefined) {
      axios
        .put(
          `https://admin-api-kaderisasi-dev.salmanitb.com/v1/universities/${id}`,
          { name }
        )
        .then(() => {
          setNameState({
            name: "",
          })

          history.push("/university")
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
          Tambah Universitas
        </Button>
      </form>
    </div>
  )
}

const Formuniversitas = () => (
  <UniversitasProvider>
    <div className="container-register-universitas">
      <h1 style={{ color: "#999999" }}>Form Universities</h1>
      <div className="content-register-universitas">
        <CardFormUniversities />
      </div>
    </div>
  </UniversitasProvider>
)

export default Formuniversitas

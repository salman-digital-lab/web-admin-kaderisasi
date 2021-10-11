/* eslint-disable */

import React, { useEffect, useContext, useState } from "react"
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Collapse,
  IconButton,
} from "@material-ui/core"
import { ArrowBack, Close } from "@material-ui/icons"
import { Link } from "react-router-dom"
import Alert from "@material-ui/lab/Alert"
import PropTypes from "prop-types"
import logo from "../../../assets/images/logo-header.png"
import LoadingAnimation from "../../../components/LoadingAnimation"
import { AdminContext } from "../../../context/AdminContext"

const text = (
  <p className="helpertext">Password yang digunakan minimal 6 digit</p>
)
const Card = (props) => {
  const { id } = props
  const { users, loading, isSubmitSucces, SetIsSubmitSuccess, functions } =
    useContext(AdminContext)
  const [isUpdate] = useState(id ? true : false)
  const [payload, setPayload] = useState(
    id
      ? {
          display_name: users?.display_name,
          first_name: users?.first_name,
          last_name: users?.last_name,
          email: users?.email,
          username: users?.username,
          group_id: users?.group?.id,
        }
      : {
          display_name: "",
          first_name: "",
          last_name: "",
          email: "",
          username: "",
          group_id: 1,
        }
  )

  const { getUserDetail, editUser, addUser } = functions
  useEffect(() => {
    if (isUpdate) {
      getUserDetail(id)
    } else {
      setPayload({
        display_name: "",
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        group_id: 1,
      })
    }
    SetIsSubmitSuccess("")
  }, [])
  useEffect(() => {
    if (users?.id) {
      setPayload({
        display_name: users?.display_name,
        first_name: users?.first_name,
        last_name: users?.last_name,
        email: users?.email,
        username: users?.username,
        group_id: users?.group?.id,
      })
    }
  }, [users])

  const handleSubmit = async () => {
    if (isUpdate) {
      payload.active = 1
      await editUser(id, payload)
    } else {
      await addUser(payload)
    }
  }

  const handleForm = (value, type) => {
    setPayload({ ...payload, [type]: value })
  }
  if (loading) {
    return <LoadingAnimation />
  }

  return (
    <div className="card-register-admin">
      <Collapse in={isSubmitSucces === "SUCCESS"}>
        <Alert
        className="alert-popup"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                SetIsSubmitSuccess("")
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          Close me!
        </Alert>
      </Collapse>
      <Collapse in={isSubmitSucces === "FAILED"}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                SetIsSubmitSuccess("")
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          Close me!
        </Alert>
      </Collapse>
      {/* <img src={logo} alt="logo" className="logo-admin" /> */}
      <div className="nav-detail-admin">
        <Button size="small" className="back-button" variant="outlined">
          <Link to={id ? `/user/${id}` : "/user"}>
            <ArrowBack fontSize="inherit" />
            KEMBALI
          </Link>
        </Button>
      </div>
      <form className="form-register-admin" noValidate autoComplete="off">
        <TextField
          className="input-register"
          required
          label="Display Name"
          fullWidth
          placeholder="Display Name"
          defaultValue={payload?.display_name}
          onChange={(event) => handleForm(event.target.value, "display_name")}
        />
        <TextField
          className="input-register"
          required
          label="First Name"
          fullWidth
          placeholder="First Name"
          defaultValue={payload?.first_name}
          onChange={(event) => handleForm(event.target.value, "first_name")}
        />
        <TextField
          className="input-register"
          required
          label="Last Name"
          fullWidth
          placeholder="Last Name"
          defaultValue={payload?.last_name}
          onChange={(event) => handleForm(event.target.value, "last_name")}
        />
        <TextField
          className="input-register"
          required
          label="Email"
          fullWidth
          placeholder="Email"
          defaultValue={payload?.email}
          onChange={(event) => handleForm(event.target.value, "email")}
        />
        <TextField
          className="input-register"
          required
          label="Username"
          fullWidth
          placeholder="Username"
          defaultValue={payload?.username}
          onChange={(event) => handleForm(event.target.value, "username")}
        />
        <TextField
          className="input-register"
          required
          label="Password"
          type="password"
          helperText={text}
          fullWidth
          placeholder="Password"
          onChange={(event) => handleForm(event.target.value, "password")}
        />
        <Select
          className="input-register"
          required
          fullWidth
          label="Group"
          placeholder="Group"
          value={payload?.group_id ? payload.group_id : 1}
          onChange={(event) => handleForm(event.target.value, "group_id")}
        >
          <MenuItem value={1}>Admin</MenuItem>
          <MenuItem value={2}>Pendengar</MenuItem>
          <MenuItem value={3}>Kapro</MenuItem>
          <MenuItem value={4}>Manajer</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          className="btn-register"
          onClick={() => handleSubmit()}
        >
          {id ? "Edit Admin Account" : "Register Admin Account"}
        </Button>
      </form>
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.string,
}

export default Card

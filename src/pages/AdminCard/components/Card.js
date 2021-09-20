/* eslint-disable */

import React, { useEffect, useContext, useState } from "react"
import { Button, TextField, Select, MenuItem } from "@material-ui/core"
import PropTypes from "prop-types"
import logo from "../../../assets/images/logo-header.png"
import LoadingAnimation from "../../../components/LoadingAnimation"
import { AdminContext } from "../../../context/AdminContext"

const text = (
  <p className="helpertext">Password yang digunakan minimal 6 digit</p>
)
const Card = (props) => {
  const { id } = props
  const { users, loading, functions } = useContext(AdminContext)
  const [payload, setPayload] = useState(
    id
      ? {
          first_name: users?.first_name,
          last_name: users?.last_name,
          email: users?.email,
          username: users?.username,
          group_id: users?.group?.id,
        }
      : null
  )
  const { getUserDetail } = functions
  useEffect(() => {
    if (id) {
      getUserDetail(id)
    }
  }, [])
  useEffect(() => {
    if (users) {
      setPayload(users)
    }
  }, [users])

  const handleForm = (value, type) => {
    setPayload({ ...payload, [type]: value })
  }
  if (loading || !payload){
    return <LoadingAnimation/>
  }

  return (
    <div className="card-register-admin">
      <img src={logo} alt="logo" className="logo-admin" />
      <form className="form-register-admin" noValidate autoComplete="off">
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
        />
        <Select
          className="input-register"
          required
          fullWidth
          label="Group"
          placeholder="Group"
          defaultValue={payload && payload.group_id ? payload.group_id : 1}
          // onChange={handleJenjangChange}
        >
          <MenuItem value={1}>Admin</MenuItem>
          <MenuItem value={2}>Konselor</MenuItem>
          <MenuItem value={3}>Kapro</MenuItem>
          <MenuItem value={4}>Manajer</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          className="btn-register"
          onClick={() => formRef.current.reportValidity()}
        >
          {id ? "Edit Admin Account" : "Register Admin Account"}
        </Button>
      </form>
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
}

export default Card

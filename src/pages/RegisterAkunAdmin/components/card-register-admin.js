import { Button, TextField } from "@material-ui/core";
import React from "react";
import logo from "../../../assets/images/logo-header.png"

const text = <p className="helpertext">Password yang digunakan minimal 6 digit</p>
const CardRegisterAdmin = () => {
    const formRef = React.useRef();
    return(
        <div className="card-register-admin">
            <img src={logo} alt="logo" className="logo-admin"/>
            <form ref={formRef} className="form-register-admin" noValidate autoComplete="off">
                <TextField className="input-register" required label="First Name" fullWidth placeholder="First Name"/>
                <TextField className="input-register" required label="Last Name" fullWidth placeholder="Last Name"/>
                <TextField className="input-register" required label="Email" fullWidth placeholder="Email"/>
                <TextField className="input-register" required label="Username" fullWidth placeholder="Username"/>
                <TextField className="input-register" required label="Password" type="password" helperText={text} fullWidth placeholder="Password"/>
                <Button variant="contained" color="primary" className="btn-register"
                onClick={() => formRef.current.reportValidity()}
                >REGISTER AKUN ADMIN</Button>
            </form>
        </div>
    )
}

export default CardRegisterAdmin
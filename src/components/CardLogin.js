import React, { useState } from 'react';
import axios from 'axios';
import '../assets/scss/Login.scss'
import { useHistory } from 'react-router-dom';

import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    "&$focused $notchedOutline": {
      borderColor: "#5E91F8",
    },
    "&:hover $notchedOutline": {
      borderColor: "#5E91F8"
    },
  },
  focused: {},
  notchedOutline: {}
}));

export const CardLogin = () => {
  let history = useHistory()
  const outlinedInputClasses = useOutlinedInputStyles();
  const [displayEror, setDisplayEror] = useState(false)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    username:'',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleLogin = (event) => {
    event.preventDefault()
    setLoading(true)

    let username = values.username
    let password = values.password
    
    axios.post(`https://backend-example.salmanitb.com/api/user-login`,{
      email: username,
      password: password
    })
    .then((res) => {
      let data = res.data
      let token = data.token
      localStorage.setItem("token", token)
      setValues({username:'',password: '',showPassword: false,})
      setDisplayEror(false)
      setLoading(false)
      history.push("/")
    })
    .catch(()=>{
      setDisplayEror(true)
      setLoading(false)
      setValues({username:'',password: '',showPassword: false,})
    })
  }
  
  const Alert = (props) => {
    return <MuiAlert style={{minWidth:"100%"}} elevation={1} variant="filled" {...props} />;
  }

  return (
    <Card  className="container-card">
      <CardContent className={"container-input"}>
        {displayEror ? (<><Alert severity="error">Username atau Password anda salah, coba lagi!</Alert></>) : false}
        <FormControl className="input-field" variant="outlined">
          <InputLabel style={{color: "#aaa", marginLeft: "-1px"}}>Username</InputLabel>
          <OutlinedInput
            required
            type={'text'}
            value={values.username}
            onChange={handleChange('username')}
            classes={outlinedInputClasses}
            labelWidth={70}
          />
        </FormControl>
        <FormControl className="input-field" variant="outlined">
          <InputLabel style={{color: "#aaa"}} htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            required
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            classes={outlinedInputClasses}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >   
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <br/>
        <Button variant="contained"
          onClick={handleLogin} 
          style={{
            backgroundColor:"#5E91F8",
            color:"#ffffff",
            minWidth: "100%",
            minHeight: 50,
          }} disableElevation>
          Login 
          {loading ?  <CircularProgress size={10} color="inherit" style={{marginLeft:"10px"}}/> : false}
        </Button>
      </CardContent>
    </Card>
  );
}
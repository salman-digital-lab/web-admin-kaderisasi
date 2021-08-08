import React, { useContext } from "react"
import "../../assets/scss/Login.scss"
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import MuiAlert from "@material-ui/lab/Alert"
import CircularProgress from "@material-ui/core/CircularProgress"
import { AdminLoginContext } from "../../context/AdminLoginContext"
/* eslint-disable */
const useOutlinedInputStyles = makeStyles(() => ({
  root: {
    "&$focused $notchedOutline": {
      borderColor: "#5E91F8",
    },
    "&:hover $notchedOutline": {
      borderColor: "#5E91F8",
    },
  },
  focused: {},
  notchedOutline: {},
}))

const CardLogin = () => {
  const outlinedInputClasses = useOutlinedInputStyles()
  const { displayEror, loading, setLoading, values, setValues, functions } =
    useContext(AdminLoginContext)
  const { HandleLogin } = functions

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleLogin = (event) => {
    event.preventDefault()
    setLoading(true)

    const email = values.email
    const password = values.password

    HandleLogin(email, password)
  }

  const Alert = (props) => (
    <MuiAlert
      className={"pop-up-error"}
      elevation={1}
      variant="filled"
      {...props}
    />
  )

  return (
    <Card className="container-card">
      <CardContent className={"container-input"}>
        {displayEror ? (
          <>
            <Alert severity="error">
              Email atau Password anda salah, coba lagi!
            </Alert>
          </>
        ) : (
          false
        )}
        <FormControl className="input-field" variant="outlined">
          <InputLabel className="input-label">Email</InputLabel>
          <OutlinedInput
            required
            type={"text"}
            value={values.email}
            onChange={handleChange("email")}
            classes={outlinedInputClasses}
            labelWidth={70}
          />
        </FormControl>
        <FormControl className="input-field" variant="outlined">
          <InputLabel
            className="input-label"
            htmlFor="outlined-adornment-password"
          >
            Password
          </InputLabel>
          <OutlinedInput
            required
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
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
        <br />
        <Button
          variant="contained"
          onClick={handleLogin}
          className="button-login"
          disableElevation
        >
          Login
          {loading ? (
            <CircularProgress
              size={10}
              color="inherit"
              className="circular-Progress"
            />
          ) : (
            false
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
export default CardLogin

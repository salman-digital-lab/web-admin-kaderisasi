import React from "react"
import DateFnsUtils from "@date-io/date-fns"
import moment from "moment"
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers"
import { makeStyles } from "@material-ui/core"

const DatePicker = (props) => {
  const {
    name,
    label,
    value,
    onChange,
    disableFuture,
    disablePast,
    inputValue,
  } = props

  const useInputStyles = makeStyles({
    root: {
      width: 130,
      verticalAlign: "middle",
      fontSize: "13px",
    },
  })

  const inputClasses = useInputStyles()

  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={DateFnsUtils}>
      <KeyboardDatePicker
        autoOk
        variant="inline"
        format="dd/MM/yyyy"
        name={name}
        value={value}
        onChange={onChange}
        inputValue={inputValue}
        disableFuture={disableFuture ? true : false}
        disablePast={disablePast ? true : false}
        label={label}
        InputProps={{ classes: inputClasses }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker

import React, { useContext, useEffect, Fragment, useState } from "react"
import { TextField, CircularProgress } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { AdminRegionContext } from "../../context/AdminRegionContext"
// import { debounce } from "lodash"

export const SelectRegency = ({ provinceId, data, handleSelect }) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const { regencies, functions } = useContext(AdminRegionContext)
  const { getRegencies } = functions
  const loading = !regencies.status

  useEffect(() => {
    if (!regencies.status) {
      getRegencies(provinceId)
    }
  }, [])

  useEffect(() => {
    if (regencies.status === "SUCCESS") {
      setOptions([...regencies?.data])
    }
  }, [regencies])

  return (
    <Autocomplete
      key={provinceId}
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      value={data}
      onChange={(e, value) => handleSelect(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Kota/Kabupaten"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  )
}

import React, { useContext, useEffect, Fragment, useState } from "react"
import { TextField, CircularProgress } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { AdminRegionContext } from "../../context/AdminRegionContext"
// import { debounce } from "lodash"

export const SelectProvince = ({ data, handleSelect }) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const { provinces, functions } = useContext(AdminRegionContext)
  const { getProvinces } = functions
  const loading = !provinces.status

  useEffect(() => {
    if (!provinces.status) {
      getProvinces()
    }
  }, [])

  useEffect(() => {
    if (provinces.status === "SUCCESS") {
      setOptions([...provinces?.data])
    }
  }, [provinces])

  return (
    <Autocomplete
      key={data}
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
      defaultValue={data}
      onChange={(e, value) => handleSelect(value?.id)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Provinsi"
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

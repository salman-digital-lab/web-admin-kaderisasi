import React, { useContext, useEffect, Fragment, useState } from "react"
import { TextField, CircularProgress } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { AdminRegionContext } from "../../context/AdminRegionContext"
// import { debounce } from "lodash"

export const SelectDistrict = ({ regencyId, data, handleSelect }) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const { districts, functions } = useContext(AdminRegionContext)
  const { getDistricts } = functions
  const loading = !districts.status

  useEffect(() => {
    if (!districts.status) {
      getDistricts(regencyId)
    }
  }, [])

  useEffect(() => {
    if (districts.status === "SUCCESS") {
      setOptions([...districts?.data])
    }
  }, [districts])

  return (
    <Autocomplete
      key={regencyId}
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
          label="Kecamatan"
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

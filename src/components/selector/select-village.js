import React, { useContext, useEffect, Fragment, useState } from "react"
import { TextField, CircularProgress } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { AdminRegionContext } from "../../context/AdminRegionContext"
// import { debounce } from "lodash"

export const SelectVillage = ({ districtId, data, handleSelect }) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const { villages, functions } = useContext(AdminRegionContext)
  const { getVillages } = functions
  const loading = !villages.status

  useEffect(() => {
    if (!villages.status) {
      getVillages(districtId)
    }
  }, [])

  useEffect(() => {
    if (villages.status === "SUCCESS") {
      setOptions([...villages?.data])
    }
  }, [villages])

  return (
    <Autocomplete
      key={districtId}
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
          label="Kelurahan"
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

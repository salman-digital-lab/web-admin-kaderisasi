import React, { useContext, useEffect, Fragment, useState } from "react"
import { TextField, CircularProgress } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { UniversitasContext } from "../../context/AdminUniversitasContext"
// import { debounce } from "lodash"

export const SelectUniversity = ({ data, handleSelect }) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  let params = {
    page: 1,
    perPage: 10000,
  }
  const { universitiesState, functions } = useContext(UniversitasContext)
  const { getUniversities } = functions
  const loading = !universitiesState.status
  useEffect(() => {
    if (!universitiesState.status) {
      getUniversities(params)
    }
  }, [])

  useEffect(() => {
    if (universitiesState.status === "SUCCESS") {
      setOptions([...universitiesState?.data?.data])
    }
  }, [universitiesState])

  return (
    <Autocomplete
      id="asynchronous-demo"
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
          label="Universitas"
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

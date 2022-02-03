import axios from "axios"
import React, { createContext, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { Button } from "@material-ui/core"
import { Delete } from "@material-ui/icons"

/* eslint-disable */
export const UniversitasContext = createContext()

export const UniversitasProvider = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  }))

  const headCells = [
    { id: "no", numeric: true, label: "No." },
    { id: "universitas", numeric: false, label: "Universitas" },
    { id: "action", numeric: false, label: "Action" },
  ]

  const createData = (id, universitas) => {
    return { id, universitas }
  }

  const [rows, setRows] = useState([])
  const [openAlert, setOpenAlert] = useState(false)
  const [universitiesState, setUniversitiesState] = useState({
    tmp: null,
  })
  const [loading, setLoading] = useState(false)

  const [filterUniversities, setFilterUniversities] = React.useState({
    filter: false,
    search: "",
  })

  const getUniversities = async (params) => {
    setLoading(true)
    let paramsQuery = "?"
    Object.keys(params).forEach((x, i) => {
      if (i === Object.keys(params).length - 1) {
        paramsQuery += `${x}=${params[x].toString()}`
      } else {
        paramsQuery += `${x}=${params[x].toString()}&`
      }
    })
    await axios
      .get(process.env.REACT_APP_BASE_URL + `/v1/universities` + paramsQuery)
      .then((res) => {
        setUniversitiesState(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /*
    @params
    formData: object
  
    Create new activity category
  */
  const addUniversity = (formData) => {
    let result = null
    axios
      .post(process.env.REACT_APP_BASE_URL + `/v1/universities`, formData)
      .then((res) => {
        getUniversities({ page: 1, perPage: 5 })
        result = res
        return result
      })
      .catch((err) => {
        console.log(err)
        return result
      })
  }

  /*
      @params
      id: integer
      formData: object
    
      Update activity category where id = params.id
    */
  const editUniversity = (id, formData) => {
    let result = null
    axios
      .put(process.env.REACT_APP_BASE_URL + `/v1/universities/${id}`, formData)
      .then((res) => {
        getUniversities({ page: 1, perPage: 5 })
        result = res
        return result
      })
      .catch((err) => {
        console.log(err)
        return result
      })
  }

  /*
      @params
      id: integer
    
      Delete activity category where id = params.id
    */
  const deleteUniversity = (id) => {
    let result = null
    axios
      .delete(process.env.REACT_APP_BASE_URL + `/v1/universities/${id}`)
      .then((res) => {
        getUniversities({ page: 1, perPage: 5 })
        result = res
        return result
      })
      .catch((err) => {
        console.log(err)
        return result
      })
  }

  const Action = ({ Id }) => {
    const handleDelete = (event) => {
      event.preventDefault()

      axios
        .delete(process.env.REACT_APP_BASE_URL + `/v1/universities/${Id}`)
        .then((res) => {
          const dataBaru = rows.filter((e) => {
            return e.id !== Id
          })
          setRows([...dataBaru])
          setOpenAlert(true)
        })
    }

    return (
      <>
        <Button
          size="small"
          className="edit-button buttons"
          variant="contained"
          color="secondary"
        >
          <Link to={`/university/${Id}`} className="edit">
            Edit
          </Link>
        </Button>
        <Button
          onClick={handleDelete}
          size="small"
          className="delete-button"
          variant="contained"
          color="secondary"
        >
          <Delete fontSize="small" />
          Hapus
        </Button>
      </>
    )
  }

  const functions = {
    getUniversities,
    addUniversity,
    editUniversity,
    deleteUniversity,
    createData,
    headCells,
    useStyles,
    Action,
  }

  return (
    <UniversitasContext.Provider
      value={{
        rows,
        setRows,
        universitiesState,
        setUniversitiesState,
        filterUniversities,
        setFilterUniversities,
        openAlert,
        setOpenAlert,
        loading,
        functions,
      }}
    >
      {props.children}
    </UniversitasContext.Provider>
  )
}

import axios from "axios"
import React, { createContext, useEffect, useState } from "react"
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
    { id: "no", numeric: true, label: "ID." },
    { id: "universitas", numeric: false, label: "Universitas" },
  ]

  const createData = (id, universitas) => {
    return { id, universitas }
  }

  const [rows, setRows] = useState([])
  const [universitiesState, setUniversitiesState] = useState({
    tmp: null,
  })

  const [filterActivity, setFilterActivity] = React.useState({
    filter: false,
    category_id: -1,
    minimum_roles_id: -1,
    search: "",
  })

  const getUniversities = () => {
    axios
      .get(`https://admin-api-kaderisasi-dev.salmanitb.com/v1/universities`)
      .then((res) => {
        const data = res.data.data
        data.forEach((e) => {
          rows.push(createData(e.id, e.name))
        })
        setUniversitiesState({ ...universitiesState, id: "notNull" })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (filterActivity.filter === true) {
      rows.forEach((e) => {
        if (e.universitas === filterActivity.search) {
          setRows(createData(e.id, e.name))
        }
      })
    }

    // const tmp = "University of Zizavu"
    // const respons = ""
    rows.forEach((e) => {
      if (e.universitas === "University of Zizavu") {
        // let nameUniv = e.universitas
        // let res = nameUniv.toLowerCase()
        // console.log(res.length)
        // console.log(tmp.length)
        // for (let i = 0; i < res.length; i++) {
        //     for (let j = 0; j < tmp.length; j++) {
        //         if (res[i] === tmp[j]) {
        //             respons.push(res[i])
        //         }
        //     }
        // }
      }
    })

    // let tmpObj = [
    //     { id: 1, universitas: "University of Calmugibs" },
    //     { id: 2, universitas: "Kertapati" },
    // ]

    // function linearSearch(arr, val) {
    //     let data = []
    //     for (let i = 0; i < arr.length; i++) {
    //         for (let j = 0; j < val.length; j++) {
    //             if (val[j] === arr[i]) {
    //                 data.push(val[j])
    //             }
    //         }
    //     }
    //     let res = data.join('').toString()
    //     console.log(res)
    //     return -1;
    // }

    // tmpObj.forEach((e) => {
    //     if (e.universitas === "University of Calmugibs") {
    //         let nameUniv = e.universitas
    //         let res = nameUniv.toLowerCase()
    //         console.log(res.length)
    //         console.log(tmp.length)
    //         linearSearch(res, tmp)
    //         // for (let i = 0; i < res.length; i++) {
    //         //     console.log(`${res[i]}`)
    //         // }
    //         console.log(e.id)
    //     }
    // })
  })
  const Action = ({ Id }) => {
    const handleDelete = (event) => {
      event.preventDefault()

      axios
        .delete(
          `https://admin-api-kaderisasi-dev.salmanitb.com/v1/universities/${Id}`
        )
        .then((res) => {
          const dataBaru = rows.filter((e) => {
            return e.id !== Id
          })
          setRows([...dataBaru])
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
          <Link to={`/university/university-form/${Id}`} className="edit">
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
        filterActivity,
        setFilterActivity,
        functions,
      }}
    >
      {props.children}
    </UniversitasContext.Provider>
  )
}

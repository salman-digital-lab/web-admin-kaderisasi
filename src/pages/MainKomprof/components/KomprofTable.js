/* eslint-disable */
import React, { useState, useContext, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Button,
  Box,
  Stack,
} from "@mui/material"
import { Edit, Delete, AddCircleOutline } from "@material-ui/icons"
import { AdminKomprofContext } from "../../../context/AdminKomprofContext"
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/table-design"
import LoadingAnimation from "../../../components/loading-animation"
import { KomprofModal } from "./KomprofModal"

const headCells = [
  { id: "id", numeric: true, label: "ID" },
  { id: "program_name", numeric: false, label: "Program" },
  { id: "program_desc", numeric: false, label: "Deskripsi" },
  { id: "action", numeric: true, label: "Action" },
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  table: {
    minWidth: 750,
  },
}))

let params = {
  page: 1,
  perPage: 10,
}

const KomprofTable = () => {
  
  const { 
    listKomprof, 
    functions, 
    loading,
    filterKomprof,
    setFilterKomprof, 
    openAlert, 
    setOpenAlert, 
  } = useContext(AdminKomprofContext)
  const { getAllDataKomprof } = functions

  useEffect(() => {
    params = {
      page: 1,
      perPage: 10,
    }
      getAllDataKomprof(params)
  }, [])

  const classes = useStyles()
  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("created_at")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [dataEdit, setDataEdit] = useState({})
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if(filterKomprof.filter) {
      params.page = 1
      setPage(0)
      params = {...params, ...filterKomprof}
      if (params.name === "") {
        delete params.name
        delete params.filter
      }
      if (Object.keys(params).length > 1) {
        delete params.filter
        getAllDataKomprof(params)
      }
      setFilterKomprof({ ...filterKomprof, filter: false })
    }
  }, [filterKomprof, setFilterKomprof, getAllDataKomprof])

  const handleClose = () => {
    setOpen(false)
  }


  const handleEditKomprof = (id, name, desc) => {
    setDataEdit({ id, name, desc })
    setOpen(true)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    params.page = newPage + 1
    getActivityCategory(params)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    params.page = 1
    params.perPage = parseInt(event.target.value, 10)
    getActivityCategory(params)
  }

  return (
    <div className="tableuser">
      {loading ? (
        <div className="loading-table">
          <LoadingAnimation table />
        </div>
      ) : (
        <Box
          component="div"
          sx={{
            borderRadius: "0.75em",
            width: "auto",
            overflowX: "auto",
            backgroundColor: "#fff",
            padding: "2em",
            marginBottom: "2em",
          }}
        >
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size={"medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={listKomprof?.data?.total}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(
                  listKomprof?.data?.data 
                    ? listKomprof?.data?.data 
                    : [], 
                  getComparator(order, orderBy)).map(
                  (row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell component="th" scope="row">
                        {index + 1 + rowsPerPage * page}
                      </TableCell>
                      <TableCell>{row.program_name}</TableCell>
                      <TableCell>
                        {row.program_desc}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2}>
                          <Button
                            size="small"
                            variant="contained"
                            disableElevation
                            sx={{
                              backgroundColor: "#FF7B40",
                            }}
                            onClick={() => handleEditKomprof(row.id, row.program_name, row.program_desc)}
                          >
                            <Edit fontSize="small" style={{marginRight: "6px", marginBottom: "2px"}}/>
                            Edit
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            disableElevation
                            sx={{
                              backgroundColor: "#FF5576",
                            }}
                            // onClick={() => handleEditKomprof(row.id, row.name)}
                          >
                            <Delete fontSize="small" style={{marginRight: "6px", marginBottom: "2px"}}/>
                            Hapus
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            disableElevation
                            sx={{
                              backgroundColor: "#5599FF",
                            }}
                            // onClick={() => handleEditKomprof(row.id, row.program_name, row.program_desc)}
                          >
                            <AddCircleOutline fontSize="small" style={{marginRight: "6px", marginBottom: "2px"}}/>
                            Alumni
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={listKomprof?.data?.total ? listKomprof?.data?.total : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
      <KomprofModal open={open} onClose={handleClose} data={dataEdit} />
    </div>
  )
}

export default KomprofTable

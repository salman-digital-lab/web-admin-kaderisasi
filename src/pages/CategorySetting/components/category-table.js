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
import { Edit } from "@material-ui/icons"
import { AdminActivityContext } from "../../../context/AdminActivityContext"
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/table-design"
import { KategoriModal } from "./kategori-modal"
import LoadingAnimation from "../../../components/loading-animation"

const headCells = [
  { id: "no", numeric: true, label: "No." },
  { id: "name", numeric: false, label: "Nama Kategori" },
  { id: "status", numeric: false, label: "Status" },
  { id: "action", numeric: true, label: "Action" },
]

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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

let params = {
  page: 1,
  perPage: 5,
}

const CategoryTable = () => {
  const classes = useStyles()
  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("created_at")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [dataEdit, setDataEdit] = useState({})
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const { categoryList, functions } = useContext(AdminActivityContext)
  const { getActivityCategory, changeStatusActivityCategory } = functions

  useEffect(() => {
    params = {
      page: 1,
      perPage: 5,
    }
    if (!categoryList.status) {
      getActivityCategory(params)
    }
  }, [])

  const handleEditCategory = (id, name) => {
    setDataEdit({ id, name })
    setOpen(true)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "desc"
    setOrder(isAsc ? "desc" : "desc")
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
      {!categoryList.status ? (
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
                rowCount={categoryList?.data?.total}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(
                  categoryList?.data?.data?.filter(({ id }) => id !== -1),
                  getComparator(order, orderBy)
                ).map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell component="th" scope="row">
                        {index + 1 + rowsPerPage * page}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <label className="switch switch-flat">
                          <input
                            className="switch-input"
                            type="checkbox"
                            checked={row.is_active}
                            onChange={() =>
                              changeStatusActivityCategory(
                                row.id,
                                page + 1,
                                rowsPerPage
                              )
                            }
                          />
                          <span
                            className="switch-label"
                            data-on="On"
                            data-off="Off"
                          ></span>
                          <span className="switch-handle"></span>
                        </label>
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
                            onClick={() => handleEditCategory(row.id, row.name)}
                          >
                            <Edit fontSize="small" />
                            Edit
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
            count={categoryList?.data?.total ? categoryList?.data?.total : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
      <KategoriModal open={open} onClose={handleClose} data={dataEdit} />
    </div>
  )
}

export default CategoryTable

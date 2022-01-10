import React, { useContext, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core"
import { Delete, Edit } from "@material-ui/icons"
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/table-design"
import { UniversitasContext } from "../../../context/AdminUniversitasContext"
import AlertToast from "../../../components/alert"
import LoadingAnimation from "../../../components/loading-animation"
import { UniversitiesModal } from "./universities-modal"
import { ConfirmationModal } from "./confirmation-modal"
/* eslint-disable */

let params = {
  page: 1,
  perPage: 5,
}

const UniversitiesTable = () => {
  const { universitiesState, openAlert, setOpenAlert, functions } =
    useContext(UniversitasContext)
  const { getUniversities, headCells, useStyles, deleteUniversity } = functions
  if (!universitiesState.status) {
    getUniversities(params)
  }

  const classes = useStyles()
  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("created_at")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [open, setOpen] = useState(false)
  const [dataEdit, setDataEdit] = useState({})
  const [isDelete, setIsDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(-1)

  const handleCloseDelete = () => {
    setIsDelete(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "desc"
    setOrder(isAsc ? "desc" : "desc")
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    params.page = newPage + 1
    getUniversities(params)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    params.page = 1
    params.perPage = parseInt(event.target.value, 10)
    getUniversities(params)
  }

  const universityDelete = () => {
    deleteUniversity(deleteId)
    setPage(0)
    handleCloseDelete()
  }

  const handleEditUniversity = (id, name) => {
    setDataEdit({ id, name })
    setOpen(true)
  }

  const handleDeleteUniversity = (id) => {
    setDeleteId(id)
    setIsDelete(true)
  }

  return (
    <div className="tableuser">
      <h1 className="headline" style={{ color: "#999999" }}>
        Daftar Universitas
      </h1>
      <Paper>
        {!universitiesState.status ? (
          <div className="loading-table">
            <LoadingAnimation table />
          </div>
        ) : (
          <>
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
                  rowCount={universitiesState?.data?.total}
                  headCells={headCells}
                />
                <TableBody>
                  {stableSort(
                    universitiesState?.data?.data,
                    getComparator(order, orderBy)
                  ).map((row, index) => {
                    return (
                      <TableRow hover tabIndex={-1} key={index}>
                        <TableCell
                          component="th"
                          scope="row"
                          className="table-cell"
                        >
                          {" "}
                          {index + 1 + rowsPerPage * page}{" "}
                        </TableCell>
                        <TableCell className="table-cell">{row.name}</TableCell>
                        <TableCell className="table-cell">
                          <Button
                            color="secondary"
                            size="small"
                            className="edit-button"
                            variant="contained"
                            onClick={() =>
                              handleEditUniversity(row.id, row.name)
                            }
                          >
                            <Edit fontSize="small" />
                          </Button>
                          {/* <Button
                            color="secondary"
                            size="small"
                            className="delete-button"
                            variant="contained"
                            onClick={() => handleDeleteUniversity(row.id)}
                          >
                            <Delete fontSize="small" />
                          </Button> */}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={universitiesState?.data?.total}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
      <UniversitiesModal open={open} onClose={handleClose} data={dataEdit} />
      <ConfirmationModal
        open={isDelete}
        onClose={handleCloseDelete}
        title={"Hapus Universitas"}
        onSubmit={() => universityDelete()}
      />
      <AlertToast
        isOpen={openAlert}
        status="success"
        message="Universitas berhasil dihapus."
        onClose={() => setOpenAlert(false)}
      />
    </div>
  )
}

export default UniversitiesTable

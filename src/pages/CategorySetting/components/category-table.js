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
  Paper,
  Button,
} from "@material-ui/core"
import { Delete, Edit } from "@material-ui/icons"
import { AdminActivityContext } from "../../../context/AdminActivityContext"
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/table-design"
import { KategoriModal } from "./kategori-modal"
import { ConfirmationModal } from "./confirmation-modal"
import LoadingAnimation from "../../../components/loading-animation"

const headCells = [
  { id: "no", numeric: true, label: "No." },
  { id: "name", numeric: false, label: "Nama Kategori" },
  { id: "action", numeric: true, label: "Action" },
]

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
  const [deleteCategory, setDeleteCategory] = useState(false)
  const [deleteId, setDeleteId] = useState(-1)

  const handleCloseDelete = () => {
    setDeleteCategory(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const { categoryList, functions } = useContext(AdminActivityContext)
  const { getActivityCategory, deleteActivityCategory } = functions
  if (!categoryList.status) {
    getActivityCategory(params)
  }

  const handleEditCategory = (id, name) => {
    setDataEdit({ id, name })
    setOpen(true)
  }

  const handleDeleteCategory = (id) => {
    setDeleteId(id)
    setDeleteCategory(true)
  }

  const categoryDelete = () => {
    deleteActivityCategory(deleteId)
    setPage(0)
    handleCloseDelete()
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
      <h1 className="headline" style={{ color: "#999999" }}>
        Pengaturan Kategori Kegiatan
      </h1>
      <Paper>
        {!categoryList.status ? (
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
                        <TableCell
                          component="th"
                          scope="row"
                          className="table-cell"
                        >
                          {index + 1 + rowsPerPage * page}
                        </TableCell>
                        <TableCell className="table-cell">{row.name}</TableCell>
                        <TableCell className="table-cell">
                          <Button
                            color="secondary"
                            size="small"
                            className="edit-button"
                            variant="contained"
                            onClick={() => handleEditCategory(row.id, row.name)}
                          >
                            <Edit fontSize="small" />
                          </Button>
                          {/* <Button
                          color="secondary"
                          size="small"
                          className="delete-button"
                          variant="contained"
                          onClick={() => handleDeleteCategory(row.value)}
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
              count={categoryList?.data?.total}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
      <KategoriModal open={open} onClose={handleClose} data={dataEdit} />
      <ConfirmationModal
        open={deleteCategory}
        onClose={handleCloseDelete}
        title={"Hapus Kategori Kegiatan"}
        onSubmit={() => categoryDelete()}
      />
    </div>
  )
}

export default CategoryTable

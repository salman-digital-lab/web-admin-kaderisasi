import React, { useContext, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
} from "@material-ui/core"
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/table-design"
import { UniversitasContext } from "../../../context/AdminUniversitasContext"
import AlertToast from "../../../components/alert"
/* eslint-disable */
const UniversitiesTable = () => {
  const {
    universitiesState,
    rows,
    setRows,
    openAlert,
    setOpenAlert,
    functions,
  } = useContext(UniversitasContext)
  const { getUniversities, headCells, useStyles, Action } = functions
  useEffect(() => {
    if (universitiesState.tmp === null) {
      getUniversities()
    }
  }, [rows, setRows])

  const classes = useStyles()
  const [order, setOrder] = React.useState("asc")
  const [orderBy, setOrderBy] = React.useState("calories")
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div className="tableuser">
      <h1 className="headline" style={{ color: "#999999" }}>
        Daftar Universitas
      </h1>
      <Paper>
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
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="table-cell"
                      >
                        {" "}
                        {row.id + rowsPerPage * page}{" "}
                      </TableCell>
                      <TableCell className="table-cell">
                        {row.universitas}
                      </TableCell>
                      <TableCell className="table-cell">
                        <Action Id={row.id} />
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
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

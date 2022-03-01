import React, { useContext, useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
} from "@material-ui/core"
import { Link } from "react-router-dom"
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/table-design"
import LoadingAnimation from "../../../components/loading-animation"
import { AdminContext } from "../../../context/AdminContext"
import { AdminStatus } from "../../../components/statuses"

const headCells = [
  { id: "no", numeric: true, label: "No." },
  { id: "name", numeric: false, label: "Nama Jamaah" },
  { id: "email", numeric: false, label: "Email" },
  { id: "username", numeric: false, label: "Username" },
  { id: "status", numeric: false, label: "Status" },
  { id: "view", numeric: false, label: "Action" },
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

const AdminTable = () => {
  const classes = useStyles()
  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("created_at")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { listUsers, users, filterUser, setFilterUser, loading, functions } =
    useContext(AdminContext)
  const { getUsers } = functions

  useEffect(() => {
    params = {
      page: 1,
      perPage: 5,
    }
    getUsers(params)
  }, [])

  useEffect(() => {
    if (filterUser.filter) {
      params.page = 1
      setPage(0)
      params = { ...params, ...filterUser }
      if (params.search === "") {
        delete params.search
        delete params.filter
      }
      if (params.gender === "") {
        delete params.gender
        delete params.filter
      }
      if (Object.keys(params).length > 1) {
        getUsers(params)
      }
      setFilterUser({ ...filterUser, filter: false })
    }
  }, [filterUser, setFilterUser, getUsers])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "desc"
    setOrder(isAsc ? "desc" : "desc")
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    params.page = newPage + 1
    getUsers(params)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    params.page = 1
    params.perPage = parseInt(event.target.value, 10)
    getUsers(params)
  }

  return (
    <div className="tableuser">
      <Paper>
        {loading ? (
          <div className="loading-table">
            <LoadingAnimation table />
          </div>
        ) : (
          <>
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                size="medium"
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  headCells={headCells}
                />
                <TableBody>
                  {stableSort(listUsers, getComparator(order, orderBy)).map(
                    (row, index) => (
                      <TableRow hover tabIndex={-1} key={row.display_name}>
                        <TableCell
                          component="th"
                          scope="row"
                          className="table-cell"
                        >
                          {index + 1 + rowsPerPage * page}
                        </TableCell>
                        <TableCell className="table-cell">
                          <Link to={`/user/${row.id}`}>{row.display_name}</Link>
                        </TableCell>
                        <TableCell className="table-cell">
                          {row.email}
                        </TableCell>
                        <TableCell className="table-cell">
                          {row.username}
                        </TableCell>
                        <TableCell className="table-cell">
                          <AdminStatus status={row.active} />
                        </TableCell>
                        <TableCell className="table-cell">
                          <Link to={`/user/${row.id}`}>View</Link>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users?.data?.total ? users?.data?.total : "Loading"}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </div>
  )
}

export default AdminTable

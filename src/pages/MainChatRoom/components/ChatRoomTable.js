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
import moment from "moment"
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/TableDesign"
import LoadingAnimation from "../../../components/LoadingAnimation"
import { AdminChatRoomContext } from "../../../context/AdminChatRoomContext"
import { StudentCareStatus } from "../../../components/Statuses"

const headCells = [
  { id: "no", numeric: true, label: "No." },
  { id: "user", numeric: false, label: "User" },
  { id: "problem_owner", numeric: false, label: "Pemilik Masalah" },
  { id: "problem_category", numeric: false, label: "Kategori" },
  { id: "counselor", numeric: false, label: "Pendengar" },
  { id: "status", numeric: false, label: "Status" },
  { id: "technical_handling", numeric: false, label: "Penanganan" },
  { id: "dibuat", numeric: false, label: "Dibuat" },
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

const ChatRoomTable = () => {
  const classes = useStyles()
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("startDate")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  // const [status, setStatus] = useState(true)
  const {
    listStudentCare,
    studentCare,
    filterStudentCare,
    setFilterStudentCare,
    loading,
    functions,
  } = useContext(AdminChatRoomContext)
  const { getStudentCare } = functions
  let params = {
    page: 1,
    perPage: 5,
  }
  useEffect(() => {
    getStudentCare(params)
  }, [])

  useEffect(() => {
    if (filterStudentCare.filter) {
      params.page = 1
      setPage(0)
      params = { ...params, ...filterStudentCare }
      if (params.search === "") {
        delete params.search
        delete params.filter
      }
      if (params.gender === "") {
        delete params.gender
        delete params.filter
      }
      if (Object.keys(params).length > 1) {
        getStudentCare(params)
      }
      setFilterStudentCare({ ...filterStudentCare, filter: false })
    }
  }, [filterStudentCare, setFilterStudentCare, getStudentCare])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    params.page = newPage + 1
    getStudentCare(params)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    params.page = 1
    params.perPage = parseInt(event.target.value, 10)
    getStudentCare(params)
  }

  return (
    <div className="tableuser">
      <h1 className="headline" style={{ color: "#999999" }}>
        Ruang Curhat
      </h1>
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
                  {stableSort(
                    listStudentCare,
                    getComparator(order, orderBy)
                  ).map((row, index) => (
                    <TableRow hover tabIndex={-1} key={row.display_name}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="table-cell"
                      >
                        {index + 1 + rowsPerPage * page}
                      </TableCell>
                      <TableCell className="table-cell">
                        <Link to={`/member/${row.member_id}`}>
                          {row.problem_owner_name} ({row.gender})
                        </Link>
                      </TableCell>
                      <TableCell className="table-cell">
                        {row.problem_owner}
                      </TableCell>
                      <TableCell className="table-cell">
                        {row.problem_category}
                      </TableCell>
                      <TableCell className="table-cell">
                        {row.id_counselor}
                      </TableCell>
                      <TableCell className="table-cell">
                        {row.technical_handling}
                      </TableCell>
                      <TableCell className="table-cell">
                        <StudentCareStatus status={row.status_handling} />
                      </TableCell>
                      <TableCell className="table-cell">
                        {moment(row.created_at).format("D MMM YYYY HH:mm")}
                      </TableCell>
                      <TableCell className="table-cell">
                        <Link to={`/chat-room/${row.id}`}>View</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={
                studentCare?.data?.total ? studentCare?.data?.total : "Loading"
              }
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </div>
  )
}

export default ChatRoomTable

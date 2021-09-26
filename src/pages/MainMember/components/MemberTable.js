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
} from "../../../components/TableDesign"
import LoadingAnimation from "../../../components/LoadingAnimation"
import { AdminActivityContext } from "../../../context/AdminActivityContext"

const headCells = [
  { id: "no", numeric: true, label: "No." },
  { id: "name", numeric: false, label: "Nama Jamaah" },
  { id: "email", numeric: false, label: "Email" },
  { id: "phone", numeric: false, label: "Phone/WA" },
  { id: "univ", numeric: false, label: "Perguruan Tinggi/Univ" },
  { id: "jengjang", numeric: false, label: "Jenjang" },
  { id: "activity", numeric: false, label: "SSC, LMD & SPC" },
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

const MemberTable = () => {
  const classes = useStyles()
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("startDate")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [status, setStatus] = useState(true)
  const { listMembers, members, filterMember, setFilterMember, functions } =
    useContext(AdminActivityContext)
  const { getMembers } = functions
  let params = {
    page: 1,
    page_size: 5,
  }
  if (listMembers.length < 1 && status) {
    getMembers(params)
    setStatus(false)
  }

  useEffect(() => {
    if (filterMember.filter) {
      params.page = 1
      setPage(0)
      params = { ...params, ...filterMember }
      if (params.ssc === -1) {
        delete params.ssc
        delete params.filter
      }
      if (params.lmd === -1) {
        delete params.lmd
        delete params.filter
      }
      if (params.search_query === "") {
        delete params.search_query
        delete params.filter
      }
      if (params.gender === "") {
        delete params.gender
        delete params.filter
      }
      if (Object.keys(params).length > 1) {
        getMembers(params)
      }
      setFilterMember({ ...filterMember, filter: false })
    }
  }, [filterMember, setFilterMember, getMembers])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    params.page = newPage + 1
    getMembers(params)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    params.page = 1
    params.page_size = parseInt(event.target.value, 10)
    getMembers(params)
  }

  return (
    <div className="tableuser">
      <h1 className="headline" style={{ color: "#999999" }}>
        Member
      </h1>
      <Paper>
        {!members.status ? (
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
                  {stableSort(listMembers, getComparator(order, orderBy)).map(
                    (row, index) => (
                      <TableRow hover tabIndex={-1} key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          className="table-cell"
                        >
                          {index + 1 + rowsPerPage * page}
                        </TableCell>
                        <TableCell className="table-cell">
                          <Link to={`/member/${row.id}`}>{row.name}</Link>
                        </TableCell>
                        <TableCell className="table-cell">
                          {row.email}
                        </TableCell>
                        <TableCell className="table-cell">
                          {row.phone}
                        </TableCell>
                        <TableCell className="table-cell">
                          {row.university}
                        </TableCell>
                        <TableCell className="table-cell">
                          {row.role_name}
                        </TableCell>
                        <TableCell className="table-cell">
                          {row.ssc}
                          {row.lmd}
                        </TableCell>
                        <TableCell className="table-cell">
                          <Link to={`/member/${row.id}`}>View</Link>
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
              count={members?.data?.total ? members?.data?.total : "Loading"}
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

export default MemberTable

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
import { Female, Male } from "@mui/icons-material"
import {
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "../../../components/table-design"
import LoadingAnimation from "../../../components/loading-animation"
import { AdminAlumniContext } from "../../../context/AdminAlumniContext"

const headCells = [
  { id: "no", numeric: true, label: "No." },
  { id: "name", numeric: false, label: "Nama Lengkap dan Gelar" },
  { id: "email", numeric: false, label: "Email" },
  { id: "whatsapp_number", numeric: false, label: "Nomor Whatsapp" },
  { id: "bachelor_degree", numeric: false, label: "Riwayat Pendidikan S1" },
  { id: "occupation", numeric: false, label: "Aktivitas / Pekerjaan" },
  {
    id: "current_instance",
    numeric: false,
    label: "Nama Instansi Tempat Aktivitas / Bekerja",
  },
  // { id: "contributions", numeric: false, label: "Kontribusi" },
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
  page_size: 5,
}

const AlumniTable = () => {
  const classes = useStyles()
  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("created_at")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [status, setStatus] = useState(true)
  const { listAlumni, alumni, filterAlumni, setFilterAlumni, functions } =
    useContext(AdminAlumniContext)
  const { getAlumni } = functions

  console.log("alumni", listAlumni)

  useEffect(() => {
    params = {
      page: 1,
      page_size: 5,
    }
    if (listAlumni.length < 1 && status) {
      getAlumni(params)
      setStatus(false)
    }
  }, [])

  useEffect(() => {
    if (filterAlumni.filter) {
      params.page = 1
      setPage(0)
      params = { ...params, ...filterAlumni }
      if (params.search_query === "") {
        delete params.search_query
        delete params.filter
      }
      if (Object.keys(params).length > 1) {
        getAlumni(params)
      }
      setFilterAlumni({ ...filterAlumni, filter: false })
    }
  }, [filterAlumni, setFilterAlumni, getAlumni])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    params.page = newPage + 1
    getAlumni(params)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    params.page = 1
    params.page_size = parseInt(event.target.value, 10)
    getAlumni(params)
  }

  return (
    <div className="tableuser">
      <Paper>
        {!alumni.status ? (
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
                  {stableSort(listAlumni, getComparator(order, orderBy)).map(
                    (row, index) => (
                      <TableRow hover tabIndex={-1} key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          className="table-cell middle-cell"
                        >
                          {index + 1 + rowsPerPage * page}
                        </TableCell>
                        <TableCell className="table-cell">
                          <div className="text-ellipsis width-100">
                            <Link to={`/alumni/${row.id}`}>{row.name}</Link>
                          </div>
                        </TableCell>
                        <TableCell className="table-cell">
                          {row.email}
                        </TableCell>
                        <TableCell className="table-cell">
                          {row.whatsapp_number}
                        </TableCell>
                        <TableCell className="table-cell">
                          {row.bachelor_degree}
                        </TableCell>
                        <TableCell className="table-cell">
                          {row.occupation}
                        </TableCell>
                        <TableCell className="table-cell">
                          {row.current_instance}
                        </TableCell>
                        {/* {row.contributions.map((data) => (
                          <TableCell className="table-cell">
                            {data.join(", ")}
                          </TableCell>
                        ))} */}
                        <TableCell className="table-cell">
                          <Link to={`/alumni/${row.id}`}>View</Link>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={alumni?.data?.total ? alumni?.data?.total : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
      <div></div>
    </div>
  )
}

export default AlumniTable

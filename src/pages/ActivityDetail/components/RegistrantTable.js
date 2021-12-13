import React, { useContext, useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
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
import { Female, Male } from "@mui/icons-material"
import {
  EnhancedTableHead,
  EnhancedTableToolbar,
  stableSort,
  getComparator,
} from "../../../components/table-design"
import { RegistrantStatus } from "../../../components/statuses/RegistrantStatus"
import LoadingAnimation from "../../../components/loading-animation"
import { AdminActivityContext } from "../../../context/AdminActivityContext"

const headCells = [
  { id: "no", numeric: true, label: "No." },
  { id: "name", numeric: false, label: "Nama Lengkap" },
  { id: "jenjang", numeric: false, label: "Jenjang" },
  { id: "email", numeric: false, label: "Email & Whatsapp" },
  { id: "univ", numeric: false, label: "Perguruan Tinggi" },
  { id: "status", numeric: false, label: "Status Pendaftaran" },
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
    alignContent: "left",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}))

const PendaftarTable = () => {
  const classes = useStyles()
  const { id } = useParams()
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("startDate")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [status, setStatus] = useState(true)
  const {
    listParticipants,
    activityParticipants,
    filterParticipantsActivity,
    setFilterParticipantsActivity,
    functions,
  } = useContext(AdminActivityContext)
  const { getActivityParticipants } = functions
  let params = {
    page: page + 1,
    perPage: rowsPerPage,
  }
  if (listParticipants.length < 1 && status) {
    getActivityParticipants(id, params)
    setStatus(false)
  }

  useEffect(() => {
    if (filterParticipantsActivity.filter) {
      params.page = 1
      setPage(0)
      params = { ...params, ...filterParticipantsActivity }
      if (params.university_id === -1) {
        delete params.university_id
        delete params.filter
      }
      if (params.status === -1) {
        delete params.status
        delete params.filter
      }
      if (params.role_id === -1) {
        delete params.role_id
        delete params.filter
      }
      if (Object.keys(params).length > 1) {
        getActivityParticipants(id, params)
      }
      setFilterParticipantsActivity({
        ...filterParticipantsActivity,
        filter: false,
      })
    }
  }, [
    filterParticipantsActivity,
    setFilterParticipantsActivity,
    getActivityParticipants,
    id,
  ])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    params.page = newPage + 1
    getActivityParticipants(id, params)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    params.page = 1
    params.perPage = parseInt(event.target.value, 10)
    getActivityParticipants(id, params)
  }

  return (
    <div className="tableactivity">
      <h1 className="headline" style={{ color: "#999999" }}>
        Pendaftar Kegiatan
      </h1>
      <Paper>
        {!activityParticipants.status ? (
          <div className="loading-table">
            <LoadingAnimation table />
          </div>
        ) : (
          <>
            <EnhancedTableToolbar
              exportButton
              exportLink={`${process.env.REACT_APP_BASE_URL}/v1/activity/${id}/participant/export`}
              fileName="Pendaftar Kegiatan"
              data={listParticipants}
            />
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
                    listParticipants,
                    getComparator(order, orderBy)
                  ).map((row, index) => (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        className="table-cell middle-cell"
                      >
                        {index + 1 + rowsPerPage * page}
                      </TableCell>
                      <TableCell className="table-cell">
                        <div className="text-ellipsis width-100">
                          <Link to={`/member/${row.id}`}>{row.name}</Link>
                        </div>
                        <div>
                          {row.gender === "F" ? (
                            <span className="icon-text">
                              <Female fontSize="small" /> Wanita
                            </span>
                          ) : (
                            <span className="icon-text">
                              <Male fontSize="small" /> Pria{" "}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="table-cell">
                        {row.role_name}
                      </TableCell>
                      <TableCell className="table-cell">
                        {row.email} <br />
                        {row.phone}
                      </TableCell>
                      <TableCell className="table-cell">
                        {row.university_name} / {row.faculty} / {row.major}
                      </TableCell>
                      <TableCell className="table-cell">
                        <RegistrantStatus status={row.status.toLowerCase()} />
                      </TableCell>
                      <TableCell className="table-cell">
                        <Link to={`/member/${row.id}`}>View</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={activityParticipants?.data?.total}
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

export default PendaftarTable
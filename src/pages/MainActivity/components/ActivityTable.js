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
import { PublishStatus, RegisterStatus } from "../../../components/statuses"
import LoadingAnimation from "../../../components/loading-animation"
import { AdminActivityContext } from "../../../context/AdminActivityContext"

const headCells = [
  { id: "no", numeric: true, label: "No." },
  { id: "judul", numeric: false, label: "Judul Aktivitas/Kegiatan" },
  { id: "tgl_pendaftaran", numeric: false, label: "Tanggal Pendaftaran" },
  { id: "jenjang", numeric: false, label: "Min. Jenjang" },
  { id: "kategori", numeric: false, label: "Kategori" },
  { id: "register", numeric: false, label: "Register" },
  { id: "publish", numeric: false, label: "Publish" },
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

let params = {
  page: 1,
  perPage: 5,
}

const KegiatanTable = () => {
  const classes = useStyles()
  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("created_at")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [status, setStatus] = useState(true)
  const {
    listActivity,
    activity,
    filterActivity,
    setFilterActivity,
    functions,
  } = useContext(AdminActivityContext)
  const { getActivity } = functions

  useEffect(() => {
    params = {
      page: 1,
      perPage: 5,
    }
    if (listActivity.length < 1 && status) {
      getActivity(params)
      setStatus(false)
    }
  }, [])

  useEffect(() => {
    if (filterActivity.filter) {
      params.page = 1
      setPage(0)
      params = { ...params, ...filterActivity }
      if (params.category_id === -1) {
        delete params.category_id
        delete params.filter
      }
      if (params.search === "") {
        delete params.search
        delete params.filter
      }
      if (params.minimum_roles_id === -1) {
        delete params.minimum_roles_id
        delete params.filter
      }
      if (Object.keys(params).length > 1) {
        getActivity(params)
      }
      setFilterActivity({ ...filterActivity, filter: false })
    }
  }, [filterActivity, setFilterActivity, getActivity])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "desc"
    setOrder(isAsc ? "desc" : "desc")
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    params.page = newPage + 1
    getActivity(params)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    params.page = 1
    params.perPage = parseInt(event.target.value, 10)
    getActivity(params)
  }
  return (
    <div className="tableactivity">
      <Paper>
        {!activity.status ? (
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
                  {stableSort(listActivity, getComparator(order, orderBy)).map(
                    (row, index) => (
                      <TableRow hover tabIndex={-1} key={row.id}>
                        <TableCell
                          component="th"
                          scope="row"
                          className="table-cell middle-cell"
                        >
                          {index + 1 + rowsPerPage * page}
                        </TableCell>
                        <TableCell className="table-cell">
                          <div className="text-ellipsis width-250">
                            <Link to={`/activity/${row.id}`}>{row.judul}</Link>
                          </div>
                        </TableCell>
                        <TableCell className="table-cell">
                          Start : {row.startDate} <br />
                          End : {row.endDate}
                        </TableCell>
                        <TableCell className="table-cell">
                          {row.jenjang}
                        </TableCell>
                        <TableCell className="table-cell">
                          {row.kategori}
                        </TableCell>
                        <TableCell className="table-cell">
                          <RegisterStatus status={row.register} />
                        </TableCell>
                        <TableCell className="table-cell">
                          <PublishStatus status={row.publish} />
                        </TableCell>
                        <TableCell className="table-cell">
                          <Link to={`/activity/${row.id}`}>View</Link>
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
              count={activity?.data?.total ? activity?.data?.total : 0}
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

export default KegiatanTable

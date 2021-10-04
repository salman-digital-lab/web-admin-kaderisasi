import React from "react"
import {
  Button,
  Modal,
  Table,
  TableCell,
  TableRow,
  Checkbox,
} from "@material-ui/core"
import "../../assets/scss/AddActivity.scss"
import styled from "./styled"
/* eslint-disable */
const AdminModal = ({ open, onClose }) => {
  const classes = styled()
  return (
    <>
      <div className={classes.root}>
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
        >
          <div className={classes.paper}>
            <div className="form-flex">
              <Table className={classes.table}>
                <TableRow className={classes.row}>
                  <TableCell className={classes.cell}>
                    <h3>Kegiatan & Aktivitas</h3>
                  </TableCell>
                  <TableCell align="right" className={classes.cell}>
                    <Checkbox
                      defaultChecked
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.cell}>
                    <h3>Aktivis dan Jamaah</h3>
                  </TableCell>
                  <TableCell align="right" className={classes.cell}>
                    <Checkbox
                      defaultChecked
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.cell}>
                    <h3>Questionnaire</h3>
                  </TableCell>
                  <TableCell align="right" className={classes.cell}>
                    <Checkbox
                      defaultChecked
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.cell}>
                    <h3>Ruang Curhat</h3>
                  </TableCell>
                  <TableCell align="right" className={classes.cell}>
                    <Checkbox
                      defaultChecked
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.CloseAndSubmit}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </TableCell>
                  <TableCell align="right" className={classes.cell}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onClose}
                    >
                      Submit
                    </Button>
                  </TableCell>
                </TableRow>
              </Table>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}
export default AdminModal

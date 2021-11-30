import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import PropTypes from "prop-types"

const AlertToast = ({ isOpen, onClose, status, message }) => (
  <Snackbar
    open={isOpen}
    autoHideDuration={4000}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    onClose={onClose}
  >
    <MuiAlert
      elevation={6}
      variant="filled"
      severity={status}
      onClose={onClose}
    >
      {message}
    </MuiAlert>
  </Snackbar>
)

AlertToast.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AlertToast

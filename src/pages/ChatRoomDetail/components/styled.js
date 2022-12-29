import { makeStyles } from "@material-ui/core"

const styled = makeStyles((theme) => ({
  root: {
    // height: 400,
    flexGrow: 1,
    // minWidth: 300,
    transform: "translateZ(0)",
    // The position fixed scoping doesn't work in IE 11.
    // Disable this demo to preserve the others.
    "@media all and (-ms-high-contrast: none)": {
      display: "none",
    },
  },
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "30%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: "100%",
    border: "none",
  },
  cell: {
    borderBottom: "none",
    paddingBottom: 4,
    paddingLeft: 0,
    paddingRight: 0,
  },
  CloseAndSubmit: {
    borderBottom: "none",
    paddingLeft: 0,
    paddingRight: 0,
  },
  EditFormControl: {
    width: "100%",
  },
}))
export default styled

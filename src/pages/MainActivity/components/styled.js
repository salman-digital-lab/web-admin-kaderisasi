import { makeStyles } from "@material-ui/core/styles"

const styled = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    overflow: "scroll",
    height: "100%",
    display: "block",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    margin: "auto",
    width: 700,
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    padding: theme.spacing(2, 4, 3),
  },

  root: {
    width: "100%",
  },
}))
export default styled

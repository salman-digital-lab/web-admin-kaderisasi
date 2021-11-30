import { makeStyles } from "@material-ui/core/styles"

const drawerWidth = 240
const styled = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#25223c",
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end",
  },
  drawerList: {
    textDecoration: "none",
    color: "#e8e8e8",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  icon: {
    color: "#e8e8e8",
  },
}))
export default styled

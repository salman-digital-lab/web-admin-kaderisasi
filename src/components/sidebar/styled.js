import { makeStyles } from "@material-ui/core/styles"

const drawerWidth = 300
const styled = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#1F99CC",
    padding: "2em",
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  drawerList: {
    textDecoration: "none",
    color: "#e8e8e8",
  },
  listItem: {
    marginTop: "10px",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
  },
  listItemActive: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  nestedListItem: {
    paddingLeft: theme.spacing(4),
    marginTop: "10px",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
  },
  icon: {
    color: "#e8e8e8",
  },
}))
export default styled

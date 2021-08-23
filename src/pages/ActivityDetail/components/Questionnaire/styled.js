import { makeStyles } from "@material-ui/core/styles"
export const styled = makeStyles((Theme) => ({
  card: {
    padding: "1em",
    margin: "0 1.4em 1.4em 0",
    maxWidth: "300px",
    height: "max-content",
  },

  titleText: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    margin: "2.5em 0",
  },
  text: {
    marginBottom: "0.8em",
  },
  closeButtonWrapper: {
    position: "absolute",
    top: "-5px",
    right: "10px",
    backgroundColor: "#666",
    borderRadius: "50px",
    padding: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1",
    cursor: "pointer",
  },
  closeButton: {
    fontSize: "1.5em",
    color: "#fff",
  },
  NewQuestionCard: {
    backgroundColor: Theme.palette.success.light,
    padding: "2em",
    textAlign: "center",
    whiteSpace: "nowrap",
    borderRadius: "1em",
    boxShadow: "none",
    color: "#fff",
    margin: "0 1.4em 1.4em 0",
    position: "relative",
    cursor: "pointer",
    height: "22em",
  },
}))

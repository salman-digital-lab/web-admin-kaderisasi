import { makeStyles } from "@material-ui/core/styles"

const styled = makeStyles({
  card: {
    marginBottom: "2em",
  },
  cardContent: {
    paddingBottom: "1em",
    "&:last-child": {
      paddingBottom: "1em",
    },
  },
  titleCard: {
    minWidth: 275,
    padding: "0 1em",
  },

  textField: {
    marginBottom: "1.5em",
  },
  select: {
    width: "100%",
    height: "100%",
    border: "none",
    fontSize: "1em",
    "&:focus": {
      outline: "none",
    },
  },
})
export default styled

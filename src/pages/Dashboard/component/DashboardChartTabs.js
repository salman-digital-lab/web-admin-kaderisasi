import React from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 70,
      width: "100%",
      backgroundColor: "#1F99CC",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)

const StyledTab = withStyles((theme) => ({
  root: {
    minHeight: 30,
    lineHeight: 0,
    letterSpacing: 0,
    minWidth: 0,
    textTransform: "none",
    color: "#9F9F9F",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
  selected: {
    color: "#1F99CC",
  },
}))((props) => <Tab disableRipple {...props} />)

export default function CustomizedTabs({ value, onChange }) {
  return (
    <div>
      <StyledTabs value={value} onChange={onChange}>
        <StyledTab label="Aktivis" />
        <StyledTab label="Kampus" />
        <StyledTab label="Jumlah Bergabung" />
      </StyledTabs>
    </div>
  )
}

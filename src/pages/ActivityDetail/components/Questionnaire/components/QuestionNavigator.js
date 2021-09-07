import React from "react"
import {
  Hidden,
  List,
  ListItem,
  Divider,
  Typography,
  Box,
} from "@material-ui/core"
import BorderColorIcon from "@material-ui/icons/BorderColor"
import { AdminQuestionnaireContext } from "../../../../../context/AdminQuestionnaireContext"

const componentStyle = {
  wrapper: {
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#fff",
    boxShadow: "0 1px 2px rgba(94, 45, 216, 0.3)",
  },
  icon: { margin: "5px 1em 5px 0" },
}

export default function QuestionNavigator() {
  const { data, ref } = React.useContext(AdminQuestionnaireContext)
  const handleDirectNavigate = (id) => ref[id].focus()

  return (
    <Hidden smDown>
      <Box component="div" style={componentStyle.wrapper}>
        <List disablePadding>
          {data.form.map((value, index) => (
            <Box component="div" key={index}>
              <ListItem onClick={() => handleDirectNavigate(index)} button>
                <BorderColorIcon style={componentStyle.icon} />
                <Typography>{`Question ${index + 1}`}</Typography>
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
      </Box>
    </Hidden>
  )
}

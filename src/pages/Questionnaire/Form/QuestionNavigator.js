import React from "react"
import {
  Hidden,
  List,
  ListItem,
  Divider,
  Typography,
} from "@material-ui/core"
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { AdminQuestionnaireContext } from "../../../context/AdminQuestionnaireContext"


export const QuestionNavigator = () => {
  const { data, ref } = React.useContext(AdminQuestionnaireContext)
  const handleDirectNavigate = (id) => ref[id].focus()
  return (
    <>
      <Hidden smDown>
        <div
          style={{
            height: "100vh",
            overflow: "auto",
            backgroundColor: "#fff",
            boxShadow: '0 1px 2px rgba(94, 45, 216, 0.3)',
          }}
        >
          <List style={{ padding: "0" }}>
            {data.form.map((value, index) => (
              <div key={index}>
                <ListItem
                  onClick={() => handleDirectNavigate(index)}
                  button
                >
                  <BorderColorIcon style={{ margin: '5px 1em 5px 0' }} />
                  <Typography>
                    {`Question ${index + 1}`}
                  </Typography>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </div>
      </Hidden>
    </>
  )
}

import React from "react";
import {
  Typography,
  Hidden,
  List,
  ListItem,
} from "@material-ui/core";
import { AdminQuestionnaireContext } from "../../../context/AdminQuestionnaireContext";
export const QuestionNavigator = () => {
  const { data, ref } = React.useContext(AdminQuestionnaireContext);
  const handleDirectNavigate = (id) => ref[id].focus();
  return (
    <>
      <Hidden smDown>
        <div
          style={{
            height: "100vh",
            overflow: "auto",
            backgroundColor: "inherit",
            color: "#2498c9",
          }}
        >
          <List style={{ padding: "0" }}>
            {data.form.map((value, index) => (
              <div key={index}>
                <ListItem
                  onClick={() => handleDirectNavigate(index)}
                  style={{ border: "1px solid grey", marginBottom: "10px" }}
                  button
                >
                  <Typography variant="h6">Question {index + 1}</Typography>
                </ListItem>
              </div>
            ))}
          </List>
        </div>
      </Hidden>
    </>
  );
};

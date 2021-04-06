import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AdminQuestionnaireContext } from "../../../context/AdminQuestionnaireContext";
export const SaveAndBackButton = () => {
  let history = useHistory();
  const { functions } = React.useContext(AdminQuestionnaireContext);
  const { handleSaveQuestionnaire } = functions;
  const handleBackToMenu = () => history.push("/questionnaire");
  return (
    <>
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <Button
          onClick={handleBackToMenu}
          variant="contained"
          color="secondary"
          disableElevation
        >
          Back to Menu
        </Button>
        <Button
          onClick={handleSaveQuestionnaire}
          variant="contained"
          color="primary"
          disableElevation
        >
          Save Question
        </Button>
      </div>
    </>
  );
};

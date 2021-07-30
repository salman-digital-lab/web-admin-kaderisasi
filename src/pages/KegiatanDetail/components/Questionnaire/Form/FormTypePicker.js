import React from "react";
import { AdminQuestionnaireContext } from "../../../../../context/AdminQuestionnaireContext"
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Switch,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { styled } from "./styled";
import { ShortTextForm } from "./ShortTextForm";
import { ParagraphForm } from "./ParagraphForm";
import { RadioForm } from "./RadioForm";
import { CheckboxForm } from "./CheckboxForm";
import { SliderForm } from "./SliderForm";
export const FormTypePicker = (props) => {
  const classes = styled();
  const { data, functions } = React.useContext(AdminQuestionnaireContext);
  const {
    handleChangeVariantForm,
    handleDeleteForm,
    handleRequiredForm,
  } = functions;
  const { id, variant } = props;
  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} sm={4}>
              <Card variant="outlined">
                <CardContent className={classes.cardContent}>
                  <Typography>
                    <select
                      onChange={(event) => handleChangeVariantForm(id, event)}
                      value={Boolean(variant) ? variant : "short_text"}
                      className={classes.select}
                    >
                      <option value="short_text">Short Text</option>
                      <option value="paragraph_text">Paragraph</option>
                      <option value="radio_button">Radio</option>
                      <option value="checkbox">Checkbox</option>
                      <option value="slider">Slider</option>
                    </select>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {variant === "short_text" && <ShortTextForm id={id} />}
            {variant === "paragraph_text" && <ParagraphForm id={id} />}
            {variant === "radio_button" && <RadioForm id={id} />}
            {variant === "checkbox" && <CheckboxForm id={id} />}
            {variant === "slider" && <SliderForm id={id} />}
          </Grid>
          <Divider />
          <br />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                padding: "0 1em",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton onClick={() => handleDeleteForm(id)}>
                <DeleteIcon style={{ color: "#d65672" }} />
              </IconButton>
            </div>
            <div
              style={{
                padding: "0 1em",
                display: "flex",
                alignItems: "center",
                borderLeft: "1px solid #e6e6e6",
              }}
            >
              <Typography>Required</Typography>
              <Switch
                checked={data.form[id].required}
                onClick={() => handleRequiredForm(id)}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

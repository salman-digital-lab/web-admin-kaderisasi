import React from "react"
import Autocomplete from "@material-ui/lab/Autocomplete"
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Switch,
  IconButton,
  Box,
  TextField,
} from "@material-ui/core"
import PropTypes from "prop-types"
import DeleteIcon from "@material-ui/icons/Delete"
import {
  TextForm,
  NumberForm,
  RadioForm,
  CheckBoxForm,
  ScaleForm,
  DropdownForm,
} from "./form"
import { AdminQuestionnaireContext } from "../../../../../context/AdminQuestionnaireContext"

const formSelectorStyle = {
  card: {
    marginBottom: "2em",
  },
  cardContent: {
    paddingBottom: "1em",
    "&:lastChild": {
      paddingBottom: "1em",
    },
  },
}

const formVariant = [
  { id: 1, key: "text", label: "Text" },
  { id: 2, key: "number", label: "Number" },
  { id: 3, key: "radio", label: "Radio" },
  { id: 4, key: "option", label: "CheckBox" },
  { id: 5, key: "scale", label: "Scale" },
  { id: 6, key: "dropdown", label: "Dropdown" },
]

export default function FormSelector({ id, type = "text" }) {
  const { functions } = React.useContext(AdminQuestionnaireContext)
  const {
    SET_QUESTIONNAIRE_FORM_TYPE,
    REMOVE_QUESTIONNAIRE_FORM,
    TOGGLE_QUESTIONNAIRE_FORM_REQUIRED,
    GET_QUESTIONNAIRE_FORM_REQUIRED,
  } = functions

  return (
    <Card style={formSelectorStyle.card} variant="outlined">
      <CardContent style={formSelectorStyle.cardContent}>
        <Grid container spacing={3} direction="row-reverse">
          <Grid item xs={12} sm={4}>
            <Autocomplete
              disableClearable
              options={formVariant}
              getOptionLabel={(option) => option.label}
              getOptionSelected={(option, selected) =>
                option.key === selected.key
              }
              onChange={(event, selected) => {
                SET_QUESTIONNAIRE_FORM_TYPE(id, selected.key)
              }}
              value={formVariant.find((value) => type === value.key)}
              renderInput={(params) => (
                // eslint-disable-next-line
                <TextField {...params} label="Type" variant="outlined" />
              )}
            />
          </Grid>
          {type === "text" && <TextForm id={id} />}
          {type === "number" && <NumberForm id={id} />}
          {type === "radio" && <RadioForm id={id} />}
          {type === "option" && <CheckBoxForm id={id} />}
          {type === "scale" && <ScaleForm id={id} />}
          {type === "dropdown" && <DropdownForm id={id} />}
        </Grid>
        <Divider />
        <br />
        <Box
          component="div"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <IconButton onClick={() => REMOVE_QUESTIONNAIRE_FORM(id)}>
            <DeleteIcon style={{ color: "#d65672" }} />
          </IconButton>
          <Divider
            style={{ margin: "0.5em" }}
            variant="fullWidth"
            orientation="vertical"
            flexItem
          />
          <Typography>Required</Typography>
          <Switch
            checked={GET_QUESTIONNAIRE_FORM_REQUIRED(id)}
            onClick={() => TOGGLE_QUESTIONNAIRE_FORM_REQUIRED(id)}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

FormSelector.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
}

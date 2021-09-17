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
  ShortTextForm,
  ParagraphForm,
  RadioForm,
  CheckBoxForm,
  SliderForm,
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
  { id: 1, key: "short_text", label: "Short Text" },
  { id: 2, key: "paragraph_text", label: "Paragraph" },
  { id: 3, key: "radio_button", label: "Radio" },
  { id: 4, key: "checkbox", label: "CheckBox" },
  { id: 5, key: "slider", label: "Slider" },
]

export default function FormSelector({ id, variant = "short_text" }) {
  const { data, functions } = React.useContext(AdminQuestionnaireContext)
  const { handleChangeVariantForm, handleDeleteForm, handleRequiredForm } =
    functions

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
                handleChangeVariantForm(id, selected.key)
              }}
              value={formVariant.find((value) => variant === value.key)}
              renderInput={(params) => (
                // eslint-disable-next-line
                <TextField {...params} label="Combo box" variant="outlined" />
              )}
            />
          </Grid>
          {variant === "short_text" && <ShortTextForm id={id} />}
          {variant === "paragraph_text" && <ParagraphForm id={id} />}
          {variant === "radio_button" && <RadioForm id={id} />}
          {variant === "checkbox" && <CheckBoxForm id={id} />}
          {variant === "slider" && <SliderForm id={id} />}
        </Grid>
        <Divider />
        <br />
        <Box
          component="div"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <IconButton onClick={() => handleDeleteForm(id)}>
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
            checked={data?.form[id]?.required && data.form[id].required}
            onClick={() => handleRequiredForm(id)}
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
  variant: PropTypes.string.isRequired,
}

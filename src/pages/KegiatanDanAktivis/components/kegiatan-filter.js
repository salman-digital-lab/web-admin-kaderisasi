import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  FormControlLabel,
  TextField,
  Box,
  FormControl,
  InputLabel,
  FormLabel,
  RadioGroup,
  Button,
  Select,
  MenuItem,
  Input,
} from "@material-ui/core";
import StyledRadio from "../../../components/RadioButton";
import { KegiatanModal } from "./kegiatan-modal";
import { AdminActivityContext } from "../../../context/AdminActivityContext";
import "../../../assets/scss/AddActivity.scss";
import { MenuProps, getStyles } from "../../../components/Select";
import { useTheme } from "@material-ui/core/styles";

const KegiatanFilter = () => {
  const theme = useTheme();
  const { filterActivity, setFilterActivity, categoryList, functions } =
    useContext(AdminActivityContext);
  const { getActivityCategory } = functions;
  useEffect(() => {
    if (categoryList.length < 1) {
      getActivityCategory();
    }
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setFilterActivity({
        ...filterActivity,
        search: event.target.value,
        filter: true,
      });
    }
  };

  const handleCategoryChange = (s) => {
    setFilterActivity({ ...filterActivity, category_id: s, filter: true });
  };

  const filterByJenjang = (s) => {
    setFilterActivity({
      ...filterActivity,
      minimum_roles_id: Number(s),
      filter: true,
    });
  };

  return (
    <>
      <Card>
        <CardContent className="filter-content">
          <Box pl={5} pr={5}>
            <Button
              variant="contained"
              color="primary"
              className="btn-tambah-kegiatan"
              onClick={handleOpen}
            >
              TAMBAH KEGIATAN
            </Button>
          </Box>
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardContent className="filter-content">
          <Box pl={5} pr={5}>
            <TextField
              id="filled-basic"
              size="small"
              label="Cari Kegiatan"
              variant="outlined"
              className="filter-input"
              onKeyDown={handleKeyDown}
            />
            <FormControl component="fieldset" className="radio-button jenkel">
              <FormLabel component="legend">Min. Jenjang</FormLabel>
              <RadioGroup
                value={filterActivity.minimum_roles_id}
                aria-label="activity"
                name="customized-radios"
              >
                <FormControlLabel
                  value={-1}
                  control={<StyledRadio />}
                  onChange={(e) => filterByJenjang(e.target.value)}
                  label="Semua"
                />
                <FormControlLabel
                  value={4}
                  control={<StyledRadio />}
                  onChange={(e) => filterByJenjang(e.target.value)}
                  label="Jamaah"
                />
                <FormControlLabel
                  value={5}
                  control={<StyledRadio />}
                  onChange={(e) => filterByJenjang(e.target.value)}
                  label="Aktivis"
                />
                <FormControlLabel
                  value={6}
                  control={<StyledRadio />}
                  onChange={(e) => filterByJenjang(e.target.value)}
                  label="Kader"
                />
                <FormControlLabel
                  value={7}
                  control={<StyledRadio />}
                  onChange={(e) => filterByJenjang(e.target.value)}
                  label="Kader Lanjut"
                />
              </RadioGroup>
            </FormControl>
            <FormControl className="select-dropdown">
              <InputLabel id="demo-mutiple-name-label">Kategori</InputLabel>
              {categoryList.length > 0 && (
                <Select
                  value={filterActivity.category_id}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {categoryList.map((name, idx) => (
                    <MenuItem
                      key={idx}
                      value={name.value}
                      label={name.label}
                      style={getStyles(name, categoryList, theme)}
                    >
                      {name.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </Box>
        </CardContent>
      </Card>
      <KegiatanModal open={open} onClose={handleClose} />
    </>
  );
};

export default KegiatanFilter;

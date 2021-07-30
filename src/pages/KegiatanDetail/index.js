import React, { useState } from "react";
import PendaftarFilter from "./components/pendaftar-filter";
import PendaftarTable from "./components/pendaftar-table";
import FormKegiatan from "./components/form-kegiatan";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import TabPanel from "../../components/TabPanel";

import "../../assets/scss/Kegiatan.scss";
import "../../assets/scss/RichText.scss";
import "../../assets/scss/AddActivity.scss";
import { AdminActivityProvider } from "../../context/AdminActivityContext";
import { Questionnaire } from "../Questionnaire/";

const KegiatanDetail = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  };
  return (
    <AdminActivityProvider>
      <div className="kegiatan-list">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="DETAIL KEGIATAN" {...a11yProps(0)} />
            <Tab label="PENDAFTAR" {...a11yProps(1)} />
            <Tab label="QUESTIONNAIRE" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <FormKegiatan />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className="flex-container">
            <div className="flex-left">
              <PendaftarTable />
            </div>
            <div className="flex-right">
              <PendaftarFilter />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Questionnaire />
        </TabPanel>
      </div>
    </AdminActivityProvider>
  );
};
export default KegiatanDetail;

import React, { useState } from "react"
import { AppBar, Tabs, Tab } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import "../../assets/scss/Kegiatan.scss"
import "../../assets/scss/RichText.scss"
import "../../assets/scss/AddActivity.scss"
import TabPanel from "../../components/TabPanel"
import PendaftarFilter from "./components/RegistrantFilter"
import PendaftarTable from "./components/RegistrantTable"
import FormKegiatan from "./components/ActivityForm"
import AdminActivityProvider from "../../context/AdminActivityContext"
import Questionnaire from "../Questionnaire"

const KegiatanDetail = () => {
  const theme = useTheme()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const tabProps = (index) => ({
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  })
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
            <Tab
              label="DETAIL KEGIATAN"
              id={tabProps(0).id}
              aria-controls={tabProps(0)["aria-controls"]}
            />
            <Tab
              label="PENDAFTAR"
              id={tabProps(1).id}
              aria-controls={tabProps(1)["aria-controls"]}
            />
            <Tab
              label="QUESTIONNAIRE"
              id={tabProps(2).id}
              aria-controls={tabProps(2)["aria-controls"]}
            />
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
  )
}
export default KegiatanDetail

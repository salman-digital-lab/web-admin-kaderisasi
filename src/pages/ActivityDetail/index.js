import React, { useState } from "react"
import { AppBar, Tabs, Tab } from "@material-ui/core"
import { QuestionAnswer, HowToReg, EventNote } from "@material-ui/icons"
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import "../../assets/scss/Kegiatan.scss"
import "../../assets/scss/RichText.scss"
import "../../assets/scss/AddActivity.scss"
import TabPanel from "../../components/tab-panel"
import PendaftarFilter from "./components/RegistrantFilter"
import PendaftarTable from "./components/RegistrantTable"
import FormKegiatan from "./components/ActivityForm"
import AdminActivityProvider from "../../context/AdminActivityContext"
import Questionnaire from "./components/Questionnaire/index"

const KegiatanDetail = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
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
        <AppBar position="static" color="white">
          {isMobile ? (
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab
                id={tabProps(0).id}
                aria-controls={tabProps(0)["aria-controls"]}
                icon={<EventNote />}
              />
              <Tab
                id={tabProps(1).id}
                aria-controls={tabProps(1)["aria-controls"]}
                icon={<HowToReg />}
              />
              <Tab
                id={tabProps(2).id}
                aria-controls={tabProps(2)["aria-controls"]}
                icon={<QuestionAnswer />}
              />
            </Tabs>
          ) : (
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab
                label="Detail Kegiatan"
                id={tabProps(0).id}
                aria-controls={tabProps(0)["aria-controls"]}
              />
              <Tab
                label="Pendaftar"
                id={tabProps(1).id}
                aria-controls={tabProps(1)["aria-controls"]}
              />
              <Tab
                label="Kuesioner"
                id={tabProps(2).id}
                aria-controls={tabProps(2)["aria-controls"]}
              />
            </Tabs>
          )}
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <FormKegiatan />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className="container">
            <div className="flex-item">
              <PendaftarFilter />
            </div>
            <div className="flex-item">
              <PendaftarTable />
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

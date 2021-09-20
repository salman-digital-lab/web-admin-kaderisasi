import React from "react"
import HomeIcon from "@material-ui/icons/Home"
import EventAvailableIcon from "@material-ui/icons/EventAvailable"
import GroupIcon from "@material-ui/icons/Group"
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer"
import SchoolIcon from "@material-ui/icons/School"
import SettingsIcon from "@material-ui/icons/Settings"
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck"

const data = [
  {
    id: 1,
    name: "Dashboard",
    icon: <HomeIcon />,
    url: "/",
    modul: "dashboard",
  },
  {
    id: 2,
    name: "Kegiatan & Aktivitas",
    icon: <EventAvailableIcon />,
    children: [
      { id: 2.1, name: "Text 1", url: "/activity" },
      { id: 2.2, name: "Text 2", url: "/activity" },
      { id: 2.3, name: "Text 3", url: "/activity" },
    ],
    modul: "activity",
  },
  {
    id: 3,
    name: "Aktivis & Jamaah",
    icon: <GroupIcon />,
    url: "/member",
    modul: "members",
  },
  {
    id: 4,
    name: "Questionnaire",
    icon: <LibraryAddCheckIcon />,
    url: "/questionnaire",
    modul: "questionnaire",
  },
  {
    id: 5,
    name: "Perguruan Tinggi",
    icon: <SchoolIcon />,
    url: "/PerguruanTinggi",
    modul: "university",
  },
  {
    id: 6,
    name: "Ruang Curhat",
    icon: <QuestionAnswerIcon />,
    url: "/RuangCurhat",
    modul: "student-care",
  },
  {
    id: 7,
    name: "Setting",
    icon: <SettingsIcon />,
    modul: "users",
    children: [
      {
        id: 8.1,
        name: "Admin",
        icon: <GroupIcon />,
        url: "/user",
      },
      { id: 8.2, name: "List Kategori Kegiatan", url: "/category-setting" },
      { id: 8.3, name: "Text 3", url: "/Setting" },
    ],
  },
]
export default data

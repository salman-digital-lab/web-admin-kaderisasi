import React from "react"
import HomeIcon from "@material-ui/icons/Home"
import EventAvailableIcon from "@material-ui/icons/EventAvailable"
import GroupIcon from "@material-ui/icons/Group"
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer"
import SchoolIcon from "@material-ui/icons/School"
import SettingsIcon from "@material-ui/icons/Settings"

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
      {
        id: 2.1,
        name: "Text 1",
        url: "/activity",
        modul: "activity",
        parent: "activity",
      },
      {
        id: 2.2,
        name: "Text 2",
        url: "/activity-2",
        modul: "activity",
        parent: "activity",
      },
      {
        id: 2.3,
        name: "Text 3",
        url: "/activity-3",
        modul: "activity",
        parent: "activity",
      },
    ],
  },
  {
    id: 3,
    name: "Aktivis & Jamaah",
    icon: <GroupIcon />,
    url: "/member",
    modul: "members",
  },
  {
    id: 5,
    name: "Perguruan Tinggi",
    icon: <SchoolIcon />,
    url: "/universities",
    modul: "university",
  },
  {
    id: 6,
    name: "Ruang Curhat",
    icon: <QuestionAnswerIcon />,
    url: "/chat-room",
    modul: "student-care",
  },
  {
    id: 7,
    name: "Setting",
    icon: <SettingsIcon />,
    children: [
      {
        id: 8.1,
        name: "Admin",
        icon: <GroupIcon />,
        url: "/user",
        modul: "users",
        parent: "setting",
      },
      {
        id: 8.2,
        name: "List Kategori Kegiatan",
        url: "/category-setting",
        modul: "activity",
        parent: "setting",
      },
      {
        id: 8.3,
        name: "Text 3",
        url: "/setting",
        modul: "setting",
        parent: "setting",
      },
    ],
  },
]
export default data
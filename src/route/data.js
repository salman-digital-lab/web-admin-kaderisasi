import KegiatanDanAktivis from "../pages/MainActivity"
import KegiatanDetail from "../pages/ActivityDetail"
import Dashboard from "../pages/Dashboard"
import MemberSalman from "../pages/MainMember"
import MemberSalmanDetail from "../pages/MemberDetail"
import Universities from "../pages/MainUniversities"
import ChatRoom from "../pages/MainChatRoom"
import Setting from "../pages/Setting"
import CategorySetting from "../pages/CategorySetting"
import MainAdmin from "../pages/MainAdmin"
import AdminCard from "../pages/AdminCard"
import AdminSalmanDetail from "../pages/AdminDetail"
import Formuniversitas from "../pages/MainUniversities/components/universities-form"
import Profile from "../pages/Profile/index"
import ChatRoomDetail from "../pages/ChatRoomDetail"

const data = [
  {
    url: "/",
    modul: "dashboard",
    component: Dashboard,
  },
  {
    url: "/activity",
    modul: "activity",
    component: KegiatanDanAktivis,
  },
  {
    url: "/activity/:id",
    modul: "activity",
    component: KegiatanDetail,
  },
  {
    url: "/category-setting",
    modul: "activity",
    component: CategorySetting,
  },
  {
    url: "/member",
    modul: "members",
    component: MemberSalman,
  },
  {
    url: "/member/:id",
    modul: "members",
    component: MemberSalmanDetail,
  },
  {
    url: "/university",
    modul: "university",
    component: Universities,
  },
  {
    url: "/university/university-form",
    modul: "university",
    component: Formuniversitas,
  },
  {
    url: "/university/university-form/:id",
    modul: "university",
    component: Formuniversitas,
  },
  {
    url: "/chat-room",
    modul: "student-care",
    component: ChatRoom,
  },
  {
    url: "/chat-room/:id",
    modul: "student-care",
    component: ChatRoomDetail,
  },
  {
    url: "/settings",
    modul: "users",
    component: Setting,
  },
  {
    url: "/user",
    modul: "users",
    component: MainAdmin,
  },
  {
    url: "/user/:id",
    modul: "users",
    component: AdminSalmanDetail,
  },
  {
    url: "/register-admin",
    modul: "users",
    component: AdminCard,
  },
  {
    url: "/edit-admin/:id",
    modul: "users",
    component: AdminCard,
  },
  {
    url: "/profile",
    modul: "users",
    component: Profile,
  },
]
export default data

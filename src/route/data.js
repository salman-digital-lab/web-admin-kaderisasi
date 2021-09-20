import KegiatanDanAktivis from "../pages/MainActivity"
import KegiatanDetail from "../pages/ActivityDetail"
import Dashboard from "../pages/Dashboard"
import MemberSalman from "../pages/MainMember"
import MemberSalmanDetail from "../pages/MemberDetail"
import PerguruanTinggi from "../pages/PerguruanTinggi"
import RuangCurhat from "../pages/RuangCurhat"
import Setting from "../pages/Setting"
import CategorySetting from "../pages/CategorySetting"
import MainAdmin from "../pages/MainAdmin"
import RegisterAdmin from "../pages/RegisterAdmin"
import AdminSalmanDetail from "../pages/AdminDetail"
import Questionnaire from "../pages/Questionnaire"
import QuestionnaireForm from "../pages/Questionnaire/Form"
import Formuniversitas from "../pages/PerguruanTinggi/components/form-universitas"

const data = [
  {
    url: "/",
    modul: "dashboard",
    component: Dashboard,
  },
  {
    url: "/questionnaire",
    modul: "activity",
    component: Questionnaire,
  },
  {
    url: "/detail-questionnaire/:id",
    modul: "activity",
    component: QuestionnaireForm,
  },
  {
    url: "/new-questionnaire",
    modul: "activity",
    component: QuestionnaireForm,
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
    url: "/PerguruanTinggi",
    modul: "university",
    component: PerguruanTinggi,
  },
  {
    url: "/PerguruanTinggi/form-universitas",
    modul: "university",
    component: Formuniversitas,
  },
  {
    url: "/PerguruanTinggi/form-universitas/:id",
    modul: "university",
    component: Formuniversitas,
  },
  {
    url: "/RuangCurhat",
    modul: "student-care",
    component: RuangCurhat,
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
    component: RegisterAdmin,
  },
  {
    url: "/category-setting",
    modul: "users",
    component: CategorySetting,
  },
]
export default data

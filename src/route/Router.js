import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Cookies from "js-cookie"
import Login from "../pages/Login"
import NavigationAdmin from "../components/NavigationAdmin"
import KegiatanDanAktivis from "../pages/MainActivity"
import KegiatanDetail from "../pages/ActivityDetail"
import Dashboard from "../pages/Dashboard"
import MemberSalman from "../pages/MainMember"
import MemberSalmanDetail from "../pages/MemberDetail"
import PerguruanTinggi from "../pages/PerguruanTinggi"
import RuangCurhat from "../pages/RuangCurhat"
import Setting from "../pages/Setting"
import CategorySetting from "../pages/CategorySetting"
import NotFound from "../pages/Error/NotFound"
import AdminProvider from "../context/AdminContext"
import MainAdmin from "../pages/MainAdmin"
import RegisterAdmin from "../pages/RegisterAdmin"
import ListDetailAdmin from "../pages/DetailAdmin"
import Formuniversitas from "../pages/PerguruanTinggi/components/form-universitas"
/* eslint-disable */
const Router = () => {
  const LoginRoute = ({ ...props }) => {
    if (Cookies.get("token") !== undefined) {
      return <Redirect to="/" />
    }
    return <Route {...props} />
  }

  const Routes = ({ ...props }) => {
    if (Cookies.get("token") === undefined) {
      return <Redirect to="/login" />
    }
    return <Route {...props} />
  }

  return (
    <BrowserRouter>
      <Switch>
        <LoginRoute exact path="/login" component={Login} />
        <AdminProvider>
          <NavigationAdmin>
            <Routes exact path="/" component={Dashboard} />
            <Routes exact path="/kegiatan" component={KegiatanDanAktivis} />
            <Routes
              exact
              path="/activity-detail/:id"
              component={KegiatanDetail}
            />
            <Routes exact path="/member" component={MemberSalman} />
            <Routes
              exact
              path="/member-detail/:id"
              component={MemberSalmanDetail}
            />
            <Routes exact path="/PerguruanTinggi" component={PerguruanTinggi} />
            <Routes
              exact
              path="/PerguruanTinggi/form-universitas"
              component={Formuniversitas}
            />
            <Routes
              exact
              path="/PerguruanTinggi/form-universitas/:id"
              component={Formuniversitas}
            />
            <Routes exact path="/RuangCurhat" component={RuangCurhat} />
            <Routes exact path="/Setting" component={Setting} />
            <Routes
              exact
              path="/activity-setting"
              component={CategorySetting}
            />
            <Routes exact path="/ListAkunAdmin" component={MainAdmin} />
            <Routes
              exact
              path="/ListAkunAdmin/:name"
              component={ListDetailAdmin}
            />
            <Routes exact path="/RegisterAkunAdmin" component={RegisterAdmin} />
          </NavigationAdmin>
        </AdminProvider>
        <Routes component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
export default Router

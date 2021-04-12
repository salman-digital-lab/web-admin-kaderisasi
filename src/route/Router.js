import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Login } from '../pages/Login'
import { AdminNavigation } from '../components/AdminNavigation'
import KegiatanDanAktivis from '../pages/KegiatanDanAktivis/'
import Dashboard  from '../pages/Dashboard/'
import { DataAdministrasiRegional } from '../pages/DataAdministrasiRegional/'
import KaderSalman from '../pages/KaderSalman/'
import KaderSalmanDetail from '../pages/KaderSalmanDetail/'
import { PerguruanTinggi } from '../pages/PerguruanTinggi/'
import { PublicContentManagement } from '../pages/PublicContentManagement/'
import { RuangCurhat } from '../pages/RuangCurhat/'
import { Setting } from '../pages/Setting/'
import { NotFound } from '../pages/Error/NotFound/'
import { AdminProvider } from '../context/AdminContext'
import ListAkunAdmin from "../pages/ListAkunAdmin"
import RegisterAkunAdmin from "../pages/RegisterAkunAdmin"
import ListDetailAdmin from "../pages/ListDetailAdmin"
import { Questionnaire } from "../pages/Questionnaire"
import { QuestionnaireForm } from "../pages/Questionnaire/Form"

export const Router = () => {

  const LoginRoute = ({ ...props }) => {
    if (document.cookie !== "") {
      return <Redirect to="/" />
    } else {
      return <Route {...props} />
    }
  }

  const Routes = ({ ...props }) => {
    if (document.cookie === "") {
      return <Redirect to="/login" />
    } else {
      return <Route {...props} />
    }
  }

  return (
    <BrowserRouter>
      <Switch>
        <LoginRoute exact path="/login" component={Login} />
        <AdminProvider>
          <AdminNavigation>
            <Routes exact path='/' component={Dashboard} />
            <Routes exact path='/Dashboard' component={Dashboard} />
            <Routes exact path='/questionnaire' component={Questionnaire} />
            <Routes exact path='/new-questionnaire' component={QuestionnaireForm} />
            <Routes exact path='/KegiatanDanAktivis' component={KegiatanDanAktivis} />
            <Routes exact path='/aktivis' component={KaderSalman} />
            <Routes exact path='/detail-aktivis/:name' component={KaderSalmanDetail} />
            <Routes exact path='/PerguruanTinggi' component={PerguruanTinggi} />
            <Routes exact path='/RuangCurhat' component={RuangCurhat} />
            <Routes exact path='/DataAdministrasiRegional' component={DataAdministrasiRegional} />
            <Routes exact path='/PublicContentManagement' component={PublicContentManagement} />
              <Routes exact path='/Setting' component={Setting} />
              <Routes exact path='/ListAkunAdmin' component={ListAkunAdmin} />
              <Routes exact path='/ListAkunAdmin/:name' component={ListDetailAdmin} />
              <Routes exact path='/RegisterAkunAdmin' component={RegisterAkunAdmin} />
          </AdminNavigation>
        </AdminProvider>
        <Routes component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}
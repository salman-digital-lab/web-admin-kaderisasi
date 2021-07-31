import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { AdminNavigation } from "../components/AdminNavigation";
import KegiatanDanAktivis from "../pages/KegiatanDanAktivis/";
import KegiatanDetail from "../pages/KegiatanDetail/";
import Dashboard from "../pages/Dashboard/";
import { DataAdministrasiRegional } from "../pages/DataAdministrasiRegional/";
import KaderSalman from "../pages/KaderSalman/";
import KaderSalmanDetail from "../pages/KaderSalmanDetail/";
import PerguruanTinggi from "../pages/PerguruanTinggi/";
import { PublicContentManagement } from "../pages/PublicContentManagement/";
import { RuangCurhat } from "../pages/RuangCurhat/";
import { Setting } from "../pages/Setting/";
import CategorySetting from "../pages/CategorySetting";
import { NotFound } from "../pages/Error/NotFound/";
import { AdminProvider } from "../context/AdminContext";
import ListAkunAdmin from "../pages/ListAkunAdmin";
import RegisterAkunAdmin from "../pages/RegisterAkunAdmin";
import ListDetailAdmin from "../pages/ListDetailAdmin";
import { Questionnaire } from "../pages/Questionnaire/";
import { QuestionnaireForm } from "../pages/Questionnaire/Form/";
import Formuniversitas from "../pages/PerguruanTinggi/components/form-universitas";
import Cookies from "js-cookie";

export const Router = () => {
  const LoginRoute = ({ ...props }) => {
    if (Cookies.get("token") !== undefined) {
      return <Redirect to="/" />;
    } else {
      return <Route {...props} />;
    }
  };

  const Routes = ({ ...props }) => {
    if (Cookies.get("token") == undefined) {
      return <Redirect to="/login" />;
    } else {
      return <Route {...props} />;
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <LoginRoute exact path="/login" component={Login} />
        <AdminProvider>
          <AdminNavigation>
            <Routes exact path="/" component={Dashboard} />
            <Routes exact path="/questionnaire" component={Questionnaire} />
            <Routes
              exact
              path="/detail-questionnaire/:id"
              component={QuestionnaireForm}
            />
            <Routes
              exact
              path="/new-questionnaire"
              component={QuestionnaireForm}
            />
            <Routes exact path="/kegiatan" component={KegiatanDanAktivis} />
            <Routes
              exact
              path="/detail-kegiatan/:id"
              component={KegiatanDetail}
            />
            <Routes exact path="/aktivis" component={KaderSalman} />
            <Routes
              exact
              path="/detail-aktivis/:id"
              component={KaderSalmanDetail}
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
            <Routes
              exact
              path="/DataAdministrasiRegional"
              component={DataAdministrasiRegional}
            />
            <Routes
              exact
              path="/PublicContentManagement"
              component={PublicContentManagement}
            />
            <Routes exact path="/Setting" component={Setting} />
            <Routes
              exact
              path="/activity-setting"
              component={CategorySetting}
            />
            <Routes exact path="/ListAkunAdmin" component={ListAkunAdmin} />
            <Routes
              exact
              path="/ListAkunAdmin/:name"
              component={ListDetailAdmin}
            />
            <Routes
              exact
              path="/RegisterAkunAdmin"
              component={RegisterAkunAdmin}
            />
          </AdminNavigation>
        </AdminProvider>
        <Routes component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

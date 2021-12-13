import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "../pages/Login";
import AdminNavigation from "../components/AdminNavigation";
import AdminProvider from "../context/AdminContext";
import NotFound from "../pages/Error/NotFound";
import data from "./data";

/* eslint-disable */
const Router = () => {
  const token = Cookies.get("token");
  let user;
  const [allowedList, setAllowedList] = useState([]);

  useEffect(() => {
    if (token && Cookies.get("user")) {
      user = JSON.parse(Cookies.get("user"));
    }
    if (allowedList.length < 1) {
      filterByModul(user ? user.privileges : null);
    }
  }, [allowedList, token]);

  const LoginRoute = ({ ...props }) => {
    if (token !== undefined) {
      return <Redirect to="/" />;
    } else {
      return <Route {...props} />;
    }
  };

  const Routes = ({ ...props }) => {
    if (token === undefined) {
      return <Redirect to="/login" />;
    }
    return <Route {...props} />;
  };

  const filterByModul = (privileges) => {
    let allowed = ["dashboard"];
    if (privileges) {
      const priv = privileges.map(({ name }) => name);
      allowed = [...allowed, ...priv];
      setAllowedList(data.filter((x) => allowed.includes(x.modul)));
    } else {
      setAllowedList(data.filter((x) => allowed.includes(x.modul)));
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <LoginRoute exact path="/login" component={Login} />
        <AdminProvider>
          <AdminNavigation>
            {allowedList?.map((x) => {
              const RouteInner = x.component;
              return (
                <Routes
                  exact
                  key={x.url}
                  path={x.url}
                  render={() => <RouteInner />}
                />
              );
            })}
          </AdminNavigation>
        </AdminProvider>
        <Routes render={() => <NotFound />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
